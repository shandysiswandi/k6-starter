import { scenarioLogin, options as optionLogin } from "./login.js";
import { scenarioSayHello, options as optionSayHello } from "./sayHello.js";

// Option configuration: https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/
export const options = {
    scenarios: {
        ...optionLogin.scenarios,
        ...optionSayHello.scenarios,
    }
};

export {
    scenarioLogin,
    scenarioSayHello,
};