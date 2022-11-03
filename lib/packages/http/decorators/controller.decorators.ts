import "reflect-metadata";
import { Middleware } from "@galatajs/http";
import { registerMiddlewareToReflect } from "./middleware.decorators";
import { HttpReflectEnum } from "../http.enum";

export const Controller = (
  prefix: string,
  middlewares: Middleware[] = []
): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(HttpReflectEnum.PREFIX, prefix, target);
    if (!Reflect.hasMetadata(HttpReflectEnum.MIDDLEWARES, target)) {
      Reflect.defineMetadata(HttpReflectEnum.MIDDLEWARES, [], target);
    }
    registerMiddlewareToReflect({
      methods: [],
      middlewares: middlewares,
      path: "",
      target: target,
      isAll: true,
      routerScope: true,
    });
  };
};
