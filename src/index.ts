import dotenv from "dotenv";
import { App } from "./app";

dotenv.config();

const app: App = new App();
app.startServer();
