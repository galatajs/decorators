import "reflect-metadata";
import { HttpMethods } from "@galatajs/core";
import { ReflectRoute } from "../reflect-route";

const registerRouteToReflect = (
  methods: HttpMethods[],
  path: string,
  target: object,
  propertyKey: string | symbol,
  isAll: boolean = false
): void => {
  if (!Reflect.hasMetadata("http:routes", target.constructor)) {
    Reflect.defineMetadata("http:routes", [], target.constructor);
  }
  const routes = Reflect.getMetadata(
    "http:routes",
    target.constructor
  ) as Array<ReflectRoute>;

  routes.push({
    path: path,
    httpMethods: methods,
    isAll: isAll,
    methodName: propertyKey.toString(),
  });
  Reflect.defineMetadata("http:routes", routes, target.constructor);
};

export const Post = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.POST], path, target, propertyKey);
  };
};

export const Get = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.GET], path, target, propertyKey);
  };
};

export const Delete = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.DELETE], path, target, propertyKey);
  };
};

export const Put = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.PUT], path, target, propertyKey);
  };
};

export const Patch = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.PATCH], path, target, propertyKey);
  };
};

export const Head = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.HEAD], path, target, propertyKey);
  };
};

export const Options = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([HttpMethods.OPTIONS], path, target, propertyKey);
  };
};

export const All = (path: string): MethodDecorator => {
  return (target: object, propertyKey: string | symbol): void => {
    registerRouteToReflect([], path, target, propertyKey, true);
  };
};
