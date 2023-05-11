import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/winston.logger';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    let body = null;
    if (req.body.password) {
      body = { ...req.body, password: '*********' };
    } else {
      body = req.body;
    }
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const resp = {
        url: `${method} ${originalUrl} ${ip} ${userAgent}`,
        request: {
          body,
          token: req.headers.authorization,
        },
        response: {
          status: statusCode,
          responseContentLength: contentLength,
        },
      };
      logger.info(resp);
    });
    next();
  }
}
