import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoute from "./routes/notes"

const app = express();

app.use(express.json());

app.use("/api/notes", notesRoute);

app.use((req, res, next) => {
    next(Error("Endpoint Not Found 404"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage  = "An unknown error occured";
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({error: errorMessage});
});

export default app;