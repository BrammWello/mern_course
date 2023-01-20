import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoute from "./routes/notes";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoute);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint Not Found 404"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage  = "An unknown error occured";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});

export default app;