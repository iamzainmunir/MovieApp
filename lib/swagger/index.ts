const userRegistrationNLogin = require("./users"),
filmApis = require("./film"),
commentApis = require("./comment")

let apis = {
    ...userRegistrationNLogin,
    ...filmApis,
    ...commentApis
};

let configurations = {
    swagger: "2.0",
    info: {
        title: "ExpressJS Backend Assignment",
        description: "",
        version: "1.0",
    },
    produces: ["application/json"],
    basePath: "/api",
    securityDefinitions: {
        "auth-token": {
            type: "apiKey",
            in: "header",
            name: "x-access-token",
        },
    },
    security: [
        {
            "auth-token": []
        },
    ],
    schemes: ["http", "https"],
    paths: apis,
};
module.exports = configurations;
