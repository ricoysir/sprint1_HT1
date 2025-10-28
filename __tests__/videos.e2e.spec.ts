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
        availableResolutions: [AvailableResolutions.P144]
    };

    beforeEach(async () => {
        await request(app)
            .delete('/api/testing/all-data')
            .expect(HttpStatus.NoContent);
    });

    //#region get tests
    it('should return videos when they exist', async () => {
        const createResponse = await request(app)
            .post(VIDEOS_PATH)
            .send(testVideoData)
            .expect(201);

        const response = await request(app)
            .get(VIDEOS_PATH)
            .expect(200);

        expect(response.body).toEqual([createResponse.body]);
    });


    describe('GET /videos/:id', () => {
        it('should return video by id', async () => {
            const createResponse = await request(app)
                .post(VIDEOS_PATH)
                .send(testVideoData)
                .expect(201);

            const videoId = createResponse.body.id;

            const response = await request(app)
                .get(`${VIDEOS_PATH}/${videoId}`)
                .expect(200);

            expect(response.body).toEqual(createResponse.body);
        });

        it('should return 404 if video does not exist', async () => {
            await request(app)
                .get(VIDEOS_PATH + '/999')
                .expect(404);
        });
    });
    //#endregion
    //#region post tests
    describe('POST /videos', () => {
        it('should return 400 when creating video with invalid title', async () => {
            //Test 1: Empty and invalid fields
            const invalidVideoData1 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: '   ',
                    author: '    ',
                    availableResolutions: ['INVALID_RESOLUTION']
                })
                .expect(HttpStatus.BadRequest);

            expect(invalidVideoData1.body.errorsMessages).toBeDefined();
            expect(Array.isArray(invalidVideoData1.body.errorsMessages)).toBe(true);
            expect(invalidVideoData1.body.errorsMessages).toHaveLength(3);

            //Test 2: empty strings
            const invalidVideoData2 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: '',
                    author: '',
                    availableResolutions: []
                })
                .expect(HttpStatus.BadRequest);

            expect(invalidVideoData2.body.errorsMessages).toBeDefined();
            expect(Array.isArray(invalidVideoData2.body.errorsMessages)).toBe(true);
            expect(invalidVideoData2.body.errorsMessages).toHaveLength(3);

            //Test 3: too long title
            const invalidVideoData3 = await request(app)
                .post(VIDEOS_PATH)
                .send({
                    ...testVideoData,
                    title: 'A'.repeat(41),
                })
                .expect(HttpStatus.BadRequest);

            expect(invalidVideoData3.body.errorsMessages).toBeDefined();
            expect(Array.isArray(invalidVideoData3.body.errorsMessages)).toBe(true);
            expect(invalidVideoData3.body.errorsMessages).toHaveLength(1);

            const videosListResponse = await request(app)
                .get(VIDEOS_PATH)
                .expect(HttpStatus.Ok);

            expect(videosListResponse.body).toHaveLength(0);
        });
    });
    //#endregion
    //#region put tests
    describe('PUT /videos/:id', () => {
        it('should update video by id', async () => {
            const createResponse = await request(app)
                .post(VIDEOS_PATH)
                .send(testVideoData)
                .expect(201);

            const videoId = createResponse.body.id;

            const updateData = {
                title: 'Updated Video',
                author: 'Updated Author',
                availableResolutions: ['P144', 'P720'],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: new Date().toISOString()
            };

            await request(app)
                .put(VIDEOS_PATH + `/${videoId}`)
                .send(updateData)
                .expect(204);

            // Проверяем, что видео обновилось
            const response = await request(app)
                .get(VIDEOS_PATH + `/${videoId}`)
                .expect(200);

            expect(response.body).toMatchObject({
                id: videoId,
                title: updateData.title,
                author: updateData.author,
                availableResolutions: updateData.availableResolutions,
                minAgeRestriction: updateData.minAgeRestriction,
                publicationDate: updateData.publicationDate
            });
        });

        it('should return 404 if video does not exist', async () => {
            const updateData = {
                title: 'Updated Video',
                author: 'Updated Author',
                availableResolutions: ['P144'],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: new Date().toISOString()
            };

            await request(app)
                .put(VIDEOS_PATH + '/999')
                .send(updateData)
                .expect(404);
        });

        it('should return 400 if update data is invalid', async () => {
            const createResponse = await request(app)
                .post(VIDEOS_PATH)
                .send(testVideoData)
                .expect(201);

            const videoId = createResponse.body.id;

            const invalidUpdateData = {
                title: '', // невалидное название
                author: 'Updated Author',
                availableResolutions: ['P144'],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: new Date().toISOString()
            };

            await request(app)
                .put(VIDEOS_PATH + `/${videoId}`)
                .send(invalidUpdateData)
                .expect(400);
        });
    });
    //#endregion put tests
    //#region delete tests
    describe('DELETE /videos/:id', () => {
        it('should delete video by id', async () => {
            const createResponse = await request(app)
                .post(VIDEOS_PATH)
                .send(testVideoData)
                .expect(201);

            const videoId = createResponse.body.id;

            await request(app)
                .delete(VIDEOS_PATH + `/${videoId}`)
                .expect(204);

            await request(app)
                .get(VIDEOS_PATH + `/${videoId}`)
                .expect(404);
        });

        it('should return 404 if video does not exist', async () => {
            await request(app)
                .delete(VIDEOS_PATH + '/999')
                .expect(404);
        });
    });
    //#endregion
});