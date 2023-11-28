import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const serverError = (
  error: Error,
  res: Response,
  message: string,
): any => {
  if (error instanceof HttpException) {
    return res.status(error.getStatus()).json({ error: error.getResponse() });
  } else {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
  }
};
