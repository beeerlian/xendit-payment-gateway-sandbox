import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { appRouter } from "./app.route";

/**
 * Class that provide a whole application
 * Object
 * @type
 * @example
 * const app: App = new App();
 * app.startServer();
 */
export class App {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set("host", process.env.HOST || "localhost");
    this._server.set("port", process.env.PORT || 8080);
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(morgan("combined"));
    this._server.use(appRouter);
  }

  /**
    @startServer function to start the server
  **/
  public startServer(): void {
    const host: string = this._server.get("host");
    const port: number = this._server.get("port");
    this._server.listen(port, host, () => {
      console.log(`Server started at http://${host}:${port}`);
    });
  }

  /**
    Settings up Internationalization
  **/
  // private setupInternationalization() {
  //   this._server.use(internationalization.init);
  // }

  public getServer() {
    return this._server;
  }
}
