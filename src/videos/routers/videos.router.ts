import { Router } from 'express';
import { getAllVideosHandler } from './handlers/get-videos-all.handler';
import { getVideoByIdHandler } from './handlers/get-video-by-id.handler';
import { createNewVideoHandler } from './handlers/create-video.handler';
import { deleteVideoByIdHandler } from './handlers/delete-video.handler';
import { updateVideoByIdHandler } from './handlers/update-video-by-id.handler';


export const videosRouter = Router({});

videosRouter
    .get('', getAllVideosHandler)

    .get('/:id', getVideoByIdHandler)

    .post('', createNewVideoHandler)

    .put('/:id', updateVideoByIdHandler)

    .delete('/:id', deleteVideoByIdHandler)
