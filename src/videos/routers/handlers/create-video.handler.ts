import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { CreateAPIError } from "../../../core/utils/error-factories.utils";
import { inMemoryDB } from "../../../db/in-memory.db";
import { createVideo } from "../../services/video-factories.services";
import { createVideoInputDTOValidation } from "../../validation/videoInputDtoValidation";

export function createNewVideoHandler(
    req: Request,
    res: Response,
) {
    const errors = createVideoInputDTOValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(CreateAPIError(errors));
        return;
    }

    const newVideo = createVideo({
        title: req.body.title,
        author: req.body.author,    
        availableResolutions: req.body.availableResolutions
    });

    inMemoryDB.videos.push(newVideo);
    res.status(HttpStatus.Created).json(newVideo);
}