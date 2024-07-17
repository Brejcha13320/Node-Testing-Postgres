import { Response } from "express";
import boom from "@hapi/boom";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

export class HandleError {
  static error(error: unknown, res: Response) {
    // console.log(`${error}`);

    if (boom.isBoom(error)) {
      return res
        .status(error.output.statusCode)
        .json({ error: error.output.payload });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      // Manejar errores conocidos de Prisma
      return res.status(500).json({
        statusCode: 500,
        error: error.message,
        message: error.message,
      });
    } else if (error instanceof PrismaClientUnknownRequestError) {
      // Manejar errores desconocidos de Prisma
      return res.status(500).json({
        statusCode: 500,
        error: error.message,
        message: error.message,
      });
    }

    return res.status(500).json({
      statusCode: 500,
      error: "Internal Servicer error",
      message: error,
    });
  }
}
