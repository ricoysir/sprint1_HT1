import { Video } from "../videos/types/video";
import { AvailableResolutions } from "../core/resolutions/availableResolutions";

export const inMemoryDB: { videos: Video[] } = {
  videos: [
    {
      id: 1,
      title: "JavaScript Basics",
      author: "John Developer",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      createdAt: "2023-10-01T10:00:00.000Z",
      publicationDate: "2023-10-02T10:00:00.000Z",
      availableResolutions: [AvailableResolutions.P720, AvailableResolutions.P1080]
    },
    {
      id: 2,
      title: "TypeScript Advanced",
      author: "Sarah Coder",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: "2023-10-15T14:30:00.000Z",
      publicationDate: "2023-10-16T14:30:00.000Z",
      availableResolutions: [AvailableResolutions.P480, AvailableResolutions.P720, AvailableResolutions.P1440]
    },
    {
      id: 3,
      title: "React Fundamentals",
      author: "Mike Frontend",
      canBeDownloaded: true,
      minAgeRestriction: 16,
      createdAt: "2023-11-01T09:15:00.000Z",
      publicationDate: "2023-11-01T09:15:00.000Z",
      availableResolutions: [AvailableResolutions.P360, AvailableResolutions.P1080]
    }
  ]
};