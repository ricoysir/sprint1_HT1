import { AvailableResolutions } from "../../core/resolutions/availableResolutions";

export type Video = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string; // ISO format for Date
  publicationDate: string; // ISO format for Date
  availableResolutions: AvailableResolutions[];
}