import "reflect-metadata";
import { Middleware } from "@galatajs/http";
import { registerMiddlewareToReflect } from "./middleware.decorators";

export const Controller = (
  prefix: string,
  middlewares: Middleware[] = []
): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata("http:prefix", prefix, target);
    if (!Reflect.hasMetadata("http:routes", target)) {
      Reflect.defineMetadata("http:routes", [], target);
    }
    registerMiddlewareToReflect({
      methods: [],
      middlewares: middlewares,
      path: "*",
      target: target,
      isAll: true,
      routerScope: true,
    });
  };
};
