import express, { Express } from "express";
import { VIDEOS_PATH, TESTING_PATH } from "./core/paths/paths";
import { videosRouter } from "./videos/routers/videos.router";
import { testingRouter } from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.status(200).send("First practical hometask, hellyeah!");
    });

    app.use(VIDEOS_PATH, videosRouter);
    app.use(TESTING_PATH, testingRouter);

    return app;
};

