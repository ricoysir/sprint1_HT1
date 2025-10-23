import { Video } from "../types/video";
import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export const createVideo = (data: {
  title: string;
  author: string;
  availableResolutions: AvailableResolutions[];
}): Video => {
  const now = new Date().toISOString();

  return {
    id: Date.now(),
    title: data.title,
    author: data.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: now,
    publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    availableResolutions: data.availableResolutions
  };
};