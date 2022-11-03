import { HttpMethods } from "@galatajs/core";

export type ReflectRoute = {
  path: string;
  httpMethods: HttpMethods[];
  methodName: string;
  isAll: boolean;
};
