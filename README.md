# K6 Performance Testing Guide

## Prerequisites
Before running K6, you need to install it on your machine. Follow the installation steps for your operating system below.

### MacOS
Install K6 using Homebrew:

```bash
brew install k6
```

### Debian/Ubuntu
Follow these steps to install K6 on Debian-based systems:

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Windows
There are multiple ways to install K6 on Windows:
- Using Chocolatey:
    ```bash
    choco install k6
    ```
- Using Windows Package Manager (winget):
    ```bash
    winget install k6 --source winget
    ```

### Optional Tools
- [gRPC Mock Server](https://fauxrpc.com/)

## Creating a Test Scenario File
To create a test scenario file in JavaScript, follow these steps:

1. Create a new file, e.g., `test.js` inside folder scenarios:
    ```bash
    touch scenarios/test.js
    ```

2. Open the file in a text editor and add the following sample K6 script:
    ```js
    import { check } from "k6";
    import http from "k6/http";
    import { Config } from "../config.js";

    export const options = {
        scenarios: {
            scenarioTest: {
                exec: "scenarioTest",
                executor: "constant-vus",
                duration: "10s",
                vus: 10,
                tags: { use_case: "test" },
            },
        },
    };

    export default function () {
        scenarioTest();
    }

    export function scenarioTest() {
        let res = http.get(`${Config.baseURLapi}/public/crocodiles/1/`);
        check(res, { "status was 200": (r) => r.status == 200 });
    };
    ```

3. Open the file `scenarios/index.js` and add the following code:
    ```js
    import { scenarioLogin, options as optionLogin } from "./login.js";
    import { scenarioRegister, options as optionRegister } from "./register.js";
    import { scenarioTest, options as optionTest } from "./test.js"; // new code

    export const options = {
        scenarios: {
            ...optionLogin.scenarios,
            ...optionRegister.scenarios,
            ...optionTest.scenarios, // new code
        }
    };

    export {
        scenarioLogin,
        scenarioRegister,
        scenarioTest, // new code
    };
    ```

4. Save the file and run it using:
    ```bash
    make run scenario=test
    # or
    k6 run scenarios/test.js
    ```

5. See the official documentation for more details on creating scenarios: [K6 Scenarios Documentation](https://grafana.com/docs/k6/latest/using-k6/scenarios/)

## Running K6 Tests
Use the following commands to execute different test scenarios with K6.

- Run all test scenarios:
    ```bash
    make run
    ```
- Run all scenarios with a specific environment (`stg` in this case; default is `dev`):
    ```bash
    make run env=stg
    ```
- Run all scenarios with the UI dashboard enabled:
    ```bash
    make run dashboard=true
    ```
- Run a specific scenario (e.g., `login`) without the UI dashboard:
    ```bash
    make run scenario=login
    ```
- Run a specific scenario (e.g., `login`) with the UI dashboard:
    ```bash
    make run scenario=login dashboard=true
    ```