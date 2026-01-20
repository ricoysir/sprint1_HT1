import { UpdateVideoInputModel } from "../dto/update_video.input-dto";
import { FieldError } from "../types/validationError";
import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export const updateVideoInputDTOValidation = (data: UpdateVideoInputModel): FieldError[] => {
    const errors: FieldError[] = [];

    if (!data.title ||
        data.title.trim().length === 0 ||
        data.title.length > 40
    ) {
        errors.push({ field: 'title', message: 'Title must be between 1 and 40 characters' });
    }

    if (!data.author ||
        data.author.trim().length === 0 ||
        data.author.length > 20
    ) {
        errors.push({ field: 'author', message: 'Author must be between 1 and 20 characters' });
    }

    if (!Array.isArray(data.availableResolutions) ||
        data.availableResolutions.length === 0
    ) {
        errors.push({ field: 'availableResolutions', message: 'At least one resolution must be provided' });
    } else {
        const validResolutions = Object.values(AvailableResolutions);
        const invalidResolutions = data.availableResolutions.filter(r => !validResolutions.includes(r));
        if (invalidResolutions.length > 0) {
            errors.push({
                field: 'availableResolutions',
                message: `Invalid resolutions: ${invalidResolutions.join(', ')}`
            });
        }
    }

    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ field: 'canBeDownloaded', message: 'canBeDownloaded must be a boolean' });
    }

    if (data.minAgeRestriction !== null && (data.minAgeRestriction < 1
        || data.minAgeRestriction > 18
    )) {
        errors.push({ field: 'minAgeRestriction', message: 'minAgeRestriction must be between 1 and 18 or null' });
    }

    if (!data.publicationDate) {
        errors.push({ field: 'publicationDate', message: 'publicationDate is required' });
    } 

    else if (typeof data.publicationDate !== 'string') {
        errors.push({ field: 'publicationDate', message: 'publicationDate must be a string' });
    }

    else if (data.publicationDate.trim().length === 0) {
        errors.push({ field: 'publicationDate', message: 'publicationDate must not be empty' });
    }

    else {
        const date = new Date(data.publicationDate);
    
        if (isNaN(date.getTime())) {
            errors.push({ field: 'publicationDate', message: 'publicationDate must be a valid ISO date string' });
        }
        else if (!data.publicationDate.includes('T') || !data.publicationDate.endsWith('Z')) {
        }
    }

    return errors;
};