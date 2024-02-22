import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
  
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        let message = exception.getResponse()['message'];
        const error = exception.getResponse()['error'];
        
        if(Array.isArray(message) && message.length >= 1) message = message[0];

        response.status(status).json({
            statusCode: status,
            error: error,
            message: message
        });
    }
}