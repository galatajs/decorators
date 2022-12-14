import { HttpMethods } from "@galatajs/core";
import { Middleware } from "@galatajs/http";
import { HttpReflectEnum } from "../http.enum";
import { ReflectMiddleware } from "../http.types";

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
  if (!Reflect.hasMetadata(HttpReflectEnum.MIDDLEWARES, params.target)) {
    Reflect.defineMetadata(HttpReflectEnum.MIDDLEWARES, [], params.target);
  }
  if (params.middlewares.length > 0) {
    const middlewares = Reflect.getMetadata(
      HttpReflectEnum.MIDDLEWARES,
      params.target
    ) as Array<ReflectMiddleware>;
    middlewares.push({
      path: params.path,
      middlewares: params.middlewares,
      methods: params.methods,
      isAll: params.isAll ?? false,
      routerScope: params.routerScope,
    });
    Reflect.defineMetadata(
      HttpReflectEnum.MIDDLEWARES,
      middlewares,
      params.target
    );
  }
};
