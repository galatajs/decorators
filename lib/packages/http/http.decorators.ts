import { HttpMethods } from "@galatajs/core";
import { ReflectRoute } from "./reflect-route";

export const Controller = (prefix: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata("http:prefix", prefix, target);
    if (!Reflect.hasMetadata("http:routes", target)) {
      Reflect.defineMetadata("http:routes", [], target);
    }
  };
};