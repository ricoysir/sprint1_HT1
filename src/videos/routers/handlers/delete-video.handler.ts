import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { HttpStatus } from "../../../core/types/http-statuses";
import { CreateAPIError } from "../../../core/utils/error-factories.utils";

export function deleteVideoByIdHandler(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const videoIndex = inMemoryDB.videos.findIndex((v) => v.id === id);

    if (videoIndex === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                CreateAPIError([{ field: 'id', message: 'Video not found' }])
            );
        return;
    }
    inMemoryDB.videos.splice(videoIndex, 1);
    res.sendStatus(HttpStatus.NoContent);
}