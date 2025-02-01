import { AppError } from './AppError'

export class ServerError extends AppError {
  constructor(message: string) {
    super(message, 500)
  }
}
