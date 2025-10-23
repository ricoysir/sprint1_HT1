import { FieldError } from "../../videos/types/validationError";
import { APIErrorResult } from "./error.utils";

export const CreateAPIError = (errors: FieldError[] | null): APIErrorResult => {
    return {
        errorsMessages: errors
    };
}