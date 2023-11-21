import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, headers, body } = request;
    const userAgent = headers['user-agent'] || '';

    this.logger.log(
      `Incoming ${method} request to ${originalUrl} from ${ip}. Body: ${JSON.stringify(
        body,
      )}`,
    );

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `Response to ${method} request to ${originalUrl} from ${ip}: status code ${statusCode}, content length ${contentLength}, user agent ${userAgent}`,
      );
    });

    next();
  }
}
