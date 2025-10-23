import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: AvailableResolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;  //string for ISO format date
};