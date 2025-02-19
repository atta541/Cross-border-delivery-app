import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      connection: {
        remoteAddress: string;
      };
      socket: {
        remoteAddress: string;
      };
    }
  }
}
