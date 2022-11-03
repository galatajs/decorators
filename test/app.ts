import { Controller, createDecoratorApp, Get } from "../lib";
import { createApp, createModule } from "@galatajs/app";
import {
  createHttpServer,
  NextFunction,
  Request,
  Response,
} from "@galatajs/http";

const myMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("myMiddleware");
  next();
};

const myRouterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("myRouterMiddleware");
  next();
};

@Controller("test", [myRouterMiddleware])
class Provider {
  @Get("all", [myMiddleware, myMiddleware])
  getAll() {
    console.log("getAll");
  }
}

const mainModule = createModule("main", {
  providers: [Provider],
});

const app = createApp(mainModule);
app.register(createHttpServer());
app.register(createDecoratorApp());

app.start().then(() => {
  console.log("app started");
});
