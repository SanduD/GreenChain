// swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GreenChain API',
      version: '1.0.0',
      description: 'API documentation for GreenChain application',
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL-ul serverului tău
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '60d0fe4f5311236168a109ca',
            },
            name: {
              type: 'string',
              description: 'Name of the user',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              description: 'Email of the user',
              example: 'user@example.com',
            },
            photo: {
              type: 'string',
              description: 'Photo URL of the user',
              example: 'http://example.com/photo.jpg',
            },
            walletAddress: {
              type: 'string',
              description: 'Wallet address of the user',
              example: '0x123456789abcdef',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the user',
              example: '2021-06-22T15:29:17.000Z',
            },
            fcmRegistrationToken: {
              type: 'string',
              description: 'FCM registration token',
              example: 'some_token',
            },
          },
        },
        ScanDetail: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Scan Detail ID',
              example: '60d0fe4f5311236168a109cb',
            },
            userId: {
              type: 'string',
              description: 'User ID',
              example: '60d0fe4f5311236168a109ca',
            },
            scanType: {
              type: 'string',
              description: 'Type of scan',
              enum: ['PET', 'Ticket', 'Bill'],
              example: 'PET',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of items scanned',
              example: 1,
            },
            rewardGRC: {
              type: 'number',
              description: 'Reward in GRC',
              example: 10,
            },
            savedAtDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the scan was saved',
              example: '2021-06-22T15:29:17.000Z',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

export { swaggerSpec, swaggerUi }
