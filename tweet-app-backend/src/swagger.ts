import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: "1.0.0",
        title: "Tweet-App Project CRUD",
        description: "Tweet-App Application API",
    },
    host: "localhost:6868",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ]
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./dist/server.js']

Promise.resolve(swaggerAutogen(outputFile, endpointsFiles, doc)).then(async () => {
    await import('./server.js');
})