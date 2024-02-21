import { HttpStatus } from "@nestjs/common";

export const AdminTag = "Admin API's";

export const AddItemSchema = {
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
                example: "Grocery Item added sucessfuly."
              },
            },
          },
        },
      },
    },
    [HttpStatus.CONFLICT]: {
      status: 409,
      description: 'Conflict',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 409,
              },
              message: {
                type: 'string',
                example: "Grocery Item Apple already exists in the grocery store."
              },
            },
          },
        },
      },
    }
  }
}

export const GetItemsSchema = {
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
                      "name": "Applesss",
                      "category": "fruits",
                      "price": 200
                    }
                  ]
                },
              },
            },
          },
        },
      }
    }
}

export const DeleteItemSchema = {
  parameter: [
    {
      name: 'itemName',
      in: 'path',
      required: true,
      description: 'Grocery Item Name',
      schema: {
        type: 'string',
      },
    }
  ],
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
                example: "Grocery Item Apple is deleted successfuly."
              },
            },
          },
        },
      },
    },
    [HttpStatus.NOT_FOUND]: {
      status: 404,
      description: 'Data Not Found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 404,
              },
              message: {
                type: 'string',
                example: "The Grocery Item Apple you are trying to delete does not exist in the grocery store."
              },
            },
          },
        },
      },
    }
  }
}

export const UpdateItemSchema = {
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
                example: "Grocery Item Apple is updated successfuly."
              },
            },
          },
        },
      },
    },
    [HttpStatus.NOT_FOUND]: {
      status: 404,
      description: 'Data Not Found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 404,
              },
              message: {
                type: 'string',
                example: "The Grocery Item Apple you are trying to update does not exist in the grocery store."
              },
            },
          },
        },
      },
    }
  }
}