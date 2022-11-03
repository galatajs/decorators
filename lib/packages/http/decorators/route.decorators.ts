import "reflect-metadata";
import { HttpMethods } from "@galatajs/core";
import { ReflectRoute } from "../reflect-route";
import { Middleware } from "@galatajs/http";
import { registerMiddlewareToReflect } from "./middleware.decorators";

type RegisterParams = {
  path: string;
  middlewares?: Middleware[];
  methods: HttpMethods[];
  target: object;
  propertyKey: string | symbol;
  isAll?: boolean;
};

const registerRouteToReflect = (params: RegisterParams): void => {
  if (!Reflect.hasMetadata("http:routes", params.target.constructor)) {
    Reflect.defineMetadata("http:routes", [], params.target.constructor);
  }
  const routes = Reflect.getMetadata(
    "http:routes",
    params.target.constructor
  ) as Array<ReflectRoute>;

  routes.push({
    path: params.path,
    httpMethods: params.methods,
    isAll: params.isAll ?? false,
    methodName: params.propertyKey.toString(),
  });
  Reflect.defineMetadata("http:routes", routes, params.target.constructor);
  registerMiddlewareToReflect({
    methods: params.methods,
    middlewares: params.middlewares ?? [],
    path: params.path,
    target: params.target.constructor,
    isAll: params.isAll,
  });
};

export const Post = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.POST],
      target,
      propertyKey,
    });
  };
};

export const Get = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.GET],
      target,
      propertyKey,
    });
  };
};

export const Delete = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.DELETE],
      target,
      propertyKey,
    });
  };
};

export const Put = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.PUT],
      target,
      propertyKey,
    });
  };
};

export const Patch = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.PATCH],
      target,
      propertyKey,
    });
  };
};

export const Head = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.HEAD],
      target,
      propertyKey,
    });
  };
};

export const Options = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [HttpMethods.OPTIONS],
      target,
      propertyKey,
    });
  };
};

export const All = (
  path: string,
  middlewares: Middleware[] = []
): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect({
      path,
      middlewares,
      methods: [],
      target,
      propertyKey,
      isAll: true,
    });
  };
};
