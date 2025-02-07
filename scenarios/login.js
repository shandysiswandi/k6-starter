import { check } from "k6";
import http from "k6/http";
import { Config } from "../config.js";

export const options = {
    scenarios: {
        scenarioLogin: {
            exec: "scenarioLogin",
            executor: "constant-vus",
            duration: "10s",
            vus: 10,
            tags: { use_case: "login" },
        },
    },
};

export default function () {
    scenarioLogin();
}

export function scenarioLogin() {
    let res = http.get(`${Config.baseURLapi}/public/crocodiles/1/`);
    check(res, { "status was 200": (r) => r.status == 200 });
};