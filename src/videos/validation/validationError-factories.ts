import { FieldError } from "../types/validationError";

export const createFieldError = (field: string, message: string): FieldError => {
  return {
    field,
    message
  };
}
