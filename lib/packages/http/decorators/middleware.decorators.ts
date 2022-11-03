import { HttpMethods } from "@galatajs/core";
import { Middleware } from "@galatajs/http";
import { ReflectMiddleware } from "../reflect-middleware";

type RegisterMiddlewareParams = {
  target: any;
  path: string;
  middlewares: Middleware[];
  methods: HttpMethods[];
  isAll?: boolean;
  routerScope?: boolean;
};

export const registerMiddlewareToReflect = (
  params: RegisterMiddlewareParams
): void => {
  if (!Reflect.hasMetadata("http:middlewares", params.target)) {
    Reflect.defineMetadata("http:middlewares", [], params.target);
  }
  if (params.middlewares.length > 0) {
    const middlewares = Reflect.getMetadata(
      "http:middlewares",
      params.target
    ) as Array<ReflectMiddleware>;
    middlewares.push({
      path: params.path,
      middlewares: params.middlewares,
      methods: params.methods,
      isAll: params.isAll ?? false,
      routerScope: params.routerScope,
    });
    Reflect.defineMetadata("http:middlewares", middlewares, params.target);
  }
};
