import { check } from "k6";
import http from "k6/http";
import { Config } from "../config.js";

export const options = {
    scenarios: {
        scenarioRegister: {
            exec: "scenarioRegister",
            executor: "constant-vus",
            duration: "10s",
            vus: 10,
            tags: { use_case: "register" },
        },
    },
};

export default function () {
    scenarioRegister();
}

export function scenarioRegister() {
    let res = http.get(`${Config.baseURLapi}/public/crocodiles/1/`);
    check(res, { "status was 200": (r) => r.status == 200 });
};