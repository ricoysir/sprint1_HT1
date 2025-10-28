import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { HttpStatus } from "../../../core/types/http-statuses";
import { CreateAPIError } from "../../../core/utils/error-factories.utils";

export function getVideoByIdHandler(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const video = inMemoryDB.videos.find((v) => v.id === id);
    
    if(!video)
    {
        res
        .status(HttpStatus.NotFound)
        .send(
            CreateAPIError([{field: 'id', message: 'Video not found'}])
        );
        return;
    }
    res.send(video);
}