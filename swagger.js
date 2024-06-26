const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Indiaa Backend Application',
        description: 'Description of my API',
    },
    host: 'my-indiaa.onrender.com',
    schemes: ['https'],
    // host: 'localhost:8080',
    // schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); 
});
