import { HttpStatus } from "@nestjs/common";

export const CommonSchema = {
    responses: {
        [HttpStatus.INTERNAL_SERVER_ERROR]: {
          status: 500,
          description: 'Something went wrong',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 500,
                  },
                  message: {
                    type: 'string',
                    example: 'Unexpected behavior, Please try again after some time',
                  },
                },
              },
            },
          },
        },
        [HttpStatus.SERVICE_UNAVAILABLE]: {
          status: 503,
          description: 'API Service is under maintenance',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 503,
                  },
                  message: {
                    type: 'string',
                    example: 'API is under maintenance, Please try again after some time',
                  },
                },
              },
            },
          },
        },
    }
}