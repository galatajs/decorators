import {
  All,
  Controller,
  createDecoratorApp,
  Delete,
  Get,
  Post,
  Put,
} from "../lib";
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
  res.badRequest("myMiddleware");
};

const myRouterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.badRequest("myRouterMiddleware");
};

@Controller("test", [myRouterMiddleware])
class TestController {
  @Get("all")
  getAll(req: Request, res: Response) {
    return res.success("getAll");
  }
}

@Controller("tes2")
class TestControllerTwo {
  @Get("all")
  getAll(req: Request, res: Response) {
    return res.success("getAll");
  }

  @Get("all2", [myMiddleware])
  getAll2(req: Request, res: Response) {
    return res.success("getAll2");
  }

  @Put("put")
  put(req: Request, res: Response) {
    return res.success("put");
  }

  @Post("post")
  post(req: Request, res: Response) {
    return res.success("post");
  }

  @Delete("delete")
  delete(req: Request, res: Response) {
    return res.success("delete");
  }

  @All("all-methods")
  all(req: Request, res: Response) {
    return res.success("all");
  }
}

const mainModule = createModule("main", {
  providers: [TestController, TestControllerTwo],
});

const app = createApp(mainModule);
const server = createHttpServer();
app.register(server);
app.register(createDecoratorApp());

export { app, server };
