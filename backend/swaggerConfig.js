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
        url: 'http://localhost:5000', // Your server URL
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'photo', 'fcmRegistrationToken'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user',
            },
            name: {
              type: 'string',
              description: 'Name of the user',
            },
            email: {
              type: 'string',
              description: 'Email of the user',
            },
            photo: {
              type: 'string',
              description: 'Photo URL of the user',
            },
            walletAddress: {
              type: 'string',
              description: 'Wallet address of the user',
              nullable: true,
            },
            activeDays: {
              type: 'array',
              items: {
                type: 'string',
                format: 'date',
              },
              description: 'Array of active days',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the user was created',
            },
            fcmRegistrationToken: {
              type: 'string',
              description: 'FCM registration token for notifications',
            },
          },
        },
        Bottle: {
          type: 'object',
          required: ['userId', 'quantity', 'rewardGRC'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the bottle',
            },
            userId: {
              type: 'string',
              description: 'User ID associated with the bottle',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of bottles',
            },
            rewardGRC: {
              type: 'number',
              description: 'Reward in GRC',
            },
            savedAtDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the bottle was saved',
            },
          },
        },
        Bill: {
          type: 'object',
          required: ['userId', 'type', 'quantity', 'rewardGRC'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the bill',
            },
            userId: {
              type: 'string',
              description: 'User ID associated with the bill',
            },
            type: {
              type: 'string',
              description: 'Type of the bill (e.g., Engie_gas, EON_gas)',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of the bill',
            },
            rewardGRC: {
              type: 'number',
              description: 'Reward in GRC',
            },
            barcode: {
              type: 'string',
              description: 'Barcode of the bill',
              nullable: true,
            },
            savedAtDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the bill was saved',
            },
          },
        },
        Ticket: {
          type: 'object',
          required: ['userId', 'rewardGRC', 'ticketCode'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the ticket',
            },
            userId: {
              type: 'string',
              description: 'User ID associated with the ticket',
            },
            rewardGRC: {
              type: 'number',
              description: 'Reward in GRC',
            },
            ticketCode: {
              type: 'string',
              description: 'Ticket code',
            },
            savedAtDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the ticket was saved',
            },
          },
        },
        Notification: {
          type: 'object',
          required: ['userId', 'message'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the notification',
            },
            userId: {
              type: 'string',
              description: 'User ID associated with the notification',
            },
            message: {
              type: 'string',
              description: 'Notification message',
            },
            read: {
              type: 'boolean',
              description: 'Notification read status',
              default: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the notification was created',
            },
          },
        },
        Barcode: {
          type: 'object',
          required: ['barcode'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the barcode',
            },
            barcode: {
              type: 'string',
              description: 'Barcode value',
              required: true,
            },
            scannedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the barcode was scanned',
              default: new Date().toISOString(),
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
