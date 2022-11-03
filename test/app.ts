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
class TestController {
  @Get("all", [myMiddleware, myMiddleware])
  getAll(req: Request, res: Response) {
    return res.success("getAll");
  }
}

const mainModule = createModule("main", {
  providers: [TestController],
});

const app = createApp(mainModule);
app.register(createHttpServer());
app.register(createDecoratorApp());

app.start().then(() => {
  console.log("app started");
});
