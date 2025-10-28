import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { HttpStatus } from "../../../core/types/http-statuses";

export function getAllVideosHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(inMemoryDB.videos);
}