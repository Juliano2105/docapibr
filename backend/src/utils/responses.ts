import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  source: string,
  meta: any = {}
) => {
  res.status(200).json({
    success: true,
    source,
    data,
    meta: {
      ...meta,
      queried_at: new Date().toISOString(),
    },
  });
};

export const sendError = (
  res: Response,
  code: string,
  message: string,
  httpStatus: number = 400,
  meta: any = {}
) => {
  res.status(httpStatus).json({
    success: false,
    error: {
      code,
      message,
      http_status: httpStatus,
    },
    meta: {
      ...meta,
      queried_at: new Date().toISOString(),
    },
  });
};
