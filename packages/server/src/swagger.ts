import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../package.json';

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DigitalBoard API',
            version,
        },
    },
    apis: ['./**/*Router.ts'],
});

export default swaggerSpec;
