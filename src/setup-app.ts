import express, { Express } from "express";

export const setupApp = (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.status(200).send("First practical hometask, hellyeah!");
    });
    return app;
};