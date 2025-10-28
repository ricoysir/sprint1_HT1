import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { CreateAPIError } from "../../../core/utils/error-factories.utils";
import { HttpStatus } from "../../../core/types/http-statuses";
import { updateVideoInputDTOValidation } from "../../validation/updateVideoInputDTOValidation";
import { UpdateVideoInputModel } from "../../dto/update_video.input-dto";

export function updateVideoByIdHandler(
    req: Request<{ id: string }>,
    res: Response,
) {
    const videoId = parseInt(req.params.id);
    
    const video = inMemoryDB.videos.find(v => v.id === videoId);
    if (!video) {
        return res.status(HttpStatus.NotFound).send();
    }

    const errors = updateVideoInputDTOValidation(req.body);
    if (errors.length > 0) {
        return res.status(HttpStatus.BadRequest).send(CreateAPIError(errors));
    }

    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = req.body.availableResolutions;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;

    return res.status(HttpStatus.NoContent).send();
}