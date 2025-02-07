import grpc from 'k6/net/grpc';
import { check, fail, sleep } from 'k6';
import { Config } from "../config.js";

const client = new grpc.Client();
client.load([Config.protobufPath], 'hello.proto');

export const options = {
    scenarios: {
        scenarioSayHello: {
            exec: "scenarioSayHello",
            executor: "constant-vus",
            duration: "5s",
            vus: 2,
            tags: { use_case: "say_hello" },
        },
    },
};

export default () => {
    scenarioSayHello();
}

export const scenarioSayHello = () => {
    client.connect(Config.baseUrlGrpcApi, {
        plaintext: true,
    });

    const reqMsg = { name: 'K6' };
    const res = client.invoke('api.protobuf.Greeter/SayHello', reqMsg);

    const checkOutput = check(res, {
        "status is OK": (r) => r.status === grpc.StatusOK,
        "message must valid string": (r) => typeof r.message.message === 'string',
    });

    if (!checkOutput) fail('unexpected response from scenarioSayHello');

    client.close();
    sleep(1);
};