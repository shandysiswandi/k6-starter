import { scenarioLogin, options as optionLogin } from "./login.js";
import { scenarioRegister, options as optionRegister } from "./register.js";

// Option configuration: https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/
export const options = {
    scenarios: {
        ...optionLogin.scenarios,
        ...optionRegister.scenarios,
    }
};

export {
    scenarioLogin,
    scenarioRegister,
};