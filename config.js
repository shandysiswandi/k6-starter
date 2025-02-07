const ConfigEnv = {
    dev: {
        baseUrlHttpApi: "https://fakestoreapi.com",
        baseUrlGrpcApi: "localhost:6660",
        protobufPath: `${__ENV.PWD}/protobufs`
    },
    stg: {
        baseUrlHttpApi: "https://fakestoreapi.com",
        baseUrlGrpcApi: "localhost:6660",
        protobufPath: `${__ENV.PWD}/protobufs`
    },
};

export const Config = ConfigEnv[`${__ENV.K6_ENV}`] || ConfigEnv.dev;