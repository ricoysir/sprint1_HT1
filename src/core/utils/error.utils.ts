import { FieldError } from "../../videos/types/validationError";

export type APIErrorResult = {
    errorsMessages: FieldError[] | null;
};

