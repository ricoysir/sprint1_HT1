import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export type CreateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: AvailableResolutions[];
};