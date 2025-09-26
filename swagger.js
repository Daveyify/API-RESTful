import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];
const doc = {
    info: {
        title: 'Product API',   
        description: 'An API RESTful for managing products using Node.js, Express, and MongoDB.'
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
