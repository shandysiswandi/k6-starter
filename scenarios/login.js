import { check, fail } from "k6";
import http from "k6/http";
import { Config } from "../config.js";

export const options = {
    scenarios: {
        scenarioLogin: {
            exec: "scenarioLogin",
            executor: "constant-vus",
            duration: "5s",
            vus: 2,
            tags: { use_case: "login" },
        },
    },
};

export default () => {
    scenarioLogin();
}

export const scenarioLogin = () => {
    const reqBody = {
        username: 'mor_2314',
        password: '83r5^_'
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = http.post(
        `${Config.baseUrlHttpApi}/auth/login`,
        JSON.stringify(reqBody),
        { headers: headers },
    );

    const checkOutput = check(res, {
        "status was 200": (r) => r.status == 200,
        "token must valid string": (r) => typeof r.json().token === 'string',
    });

    if (!checkOutput) fail('unexpected response from scenarioLogin');
};