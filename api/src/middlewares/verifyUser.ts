import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { errorHandler } from '../utils/error'

// Define a custom type for the request object to include the `user` property
interface CustomRequest extends Request {
  user?: string | JwtPayload
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(res)
  const token = req.cookies.token

  if (!token) return next(errorHandler(401, 'Unauthorized!'))

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: Error | null, decoded: string | JwtPayload | undefined) => {
      if (err) return next(errorHandler(403, 'Forbidden'))

      req.user = decoded
      next()
    }
  )
}
