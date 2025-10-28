import express from 'express';
import request from 'supertest';
import { VIDEOS_PATH } from '../src/core/paths/paths';
import { AvailableResolutions } from '../src/core/resolutions/availableResolutions';
import { HttpStatus } from '../src/core/types/http-statuses';
import { setupApp } from '../src/setup-app';
import { CreateVideoInputModel } from '../src/videos/dto/create_video.input-dto';

describe('Video API', () => {
    const app = express();
    setupApp(app);

    const testVideoData: CreateVideoInputModel = {
        title: 'Test Video',
        author: 'Test Author',
        availableResolutions: [AvailableResolutions.P144, AvailableResolutions.P1080]
    };

    beforeEach(async () => {
        await request(app)
            .delete('/api/testing/all-data')
            .expect(HttpStatus.NoContent);
    });


    describe('POST /videos', () => {
        it('should return 400 when creating video with invalid title', async () => {
            const invalidVideoData1 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: '   ',
                    author: '    ',
                    availableResolutions: 'P312341'
                })
                .expect(HttpStatus.BadRequest);
            expect(invalidVideoData1.body.errorsMessages).toHaveLength(3);

            const invalidVideoData2 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: '',
                    author: '',
                    availableResolutions: 'error'
                })
                .expect(HttpStatus.BadRequest);
            expect(invalidVideoData2.body.errorsMessages).toHaveLength(3);

            const invalidVideoData3 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: '3o4132188032801830128381203812038012830128301283081203812038120830341414124124141224141241412421283021812301238102',  //too long
                })
                .expect(HttpStatus.BadRequest);
            expect(invalidVideoData3.body.errorsMessages).toHaveLength(1);

            const videosListResponse = await request(app)
                .get(VIDEOS_PATH);
            expect(videosListResponse.body).toHaveLength(0);
        });
    });
})
