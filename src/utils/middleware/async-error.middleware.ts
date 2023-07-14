import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AsyncErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Wrap the route handler in a Promise to catch asynchronous errors
    Promise.resolve()
      .then(() => next())
      .catch((error) => next(error));
  }
}
