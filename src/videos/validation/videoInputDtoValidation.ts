import { CreateVideoInputModel } from "../dto/create_video.input-dto";
import { FieldError } from "../types/validationError";
import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export const createVideoInputDTOValidation = (data: CreateVideoInputModel): FieldError[] => {
    const errors: FieldError[] = [];

    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length === 0 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Title must be between 1 and 40 characters' });
    }

    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length === 0 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Author must be between 1 and 20 characters' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be an array'
        });
    } else if (data.availableResolutions.length === 0) {
        errors.push({
            field: 'availableResolutions',
            message: 'At least one resolution required'
        });
    } else {
        const invalidResolutions = data.availableResolutions.filter(
            r => !Object.values(AvailableResolutions).includes(r)
        );
        if (invalidResolutions.length > 0) {
            errors.push({
                field: 'availableResolutions',
                message: `Invalid resolutions: ${invalidResolutions.join(', ')}`
            });
        }
    }

    return errors;
};