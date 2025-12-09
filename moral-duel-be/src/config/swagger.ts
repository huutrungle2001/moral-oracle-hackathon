import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Moral Oracle API',
      version: '1.0.0',
      description: 'API documentation for Moral Oracle Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            wallet_address: { type: 'string' },
            name: { type: 'string' },
            total_points: { type: 'integer' },
          },
        },
        Case: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            context: { type: 'string' },
            status: { type: 'string', enum: ['pending_moderation', 'active', 'closed'] },
            reward_pool: { type: 'number' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
