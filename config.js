const ConfigEnv = {
    dev: {
        baseURLapi: "https://test-api.k6.io",
    },
    stg: {
        baseURLapi: "https://test-api.k6.io",
    },
};

export const Config = ConfigEnv[`${__ENV.K6_ENV}`] || ConfigEnv.dev;