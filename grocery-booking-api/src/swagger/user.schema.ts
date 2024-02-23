import { HttpStatus } from "@nestjs/common";

export const UserTag = "User API's";

export const FetchItemsSchema = {
  responses: {
    [HttpStatus.OK]: {
      status: 200,
      description: 'Everything is working fine',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 200,
              },
              response: {
                type: 'array',
                example: [
                    {
                      "id": 39,
                      "name": "Apple",
                      "category": "fruits",
                      "price": 200
                    },
                    {
                      "id": 41,
                      "name": "Orange",
                      "category": "fruits",
                      "price": 200
                    }
                  ],
              },
            },
          },
        },
      },
    }
  }
}

export const OrderItemsSchema = {
    responses: {
      [HttpStatus.OK]: {
        status: 200,
        description: 'Everything is working fine',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'number',
                  example: 200,
                },
                message: {
                  type: 'string',
                  example: "Grocery Items Ordered sucessfuly."
                },
              },
            },
          },
        },
      }
    }
}

export const FetchOrderSchema = {
    responses: {
      [HttpStatus.OK]: {
        status: 200,
        description: 'Everything is working fine',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'number',
                  example: 200,
                },
                response: {
                  type: 'array',
                  example: [
                      {
                        "id": 1,
                        "name": "Apple",
                        "quantity": 20,
                        "price": 2,
                        "totalPrice": 40
                      },
                      {
                        "id": 2,
                        "name": "Orange",
                        "quantity": 10,
                        "price": 2,
                        "totalPrice": 20
                      }
                    ],
                },
              },
            },
          },
        },
      }
    }
  }