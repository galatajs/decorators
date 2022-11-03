import { HttpMethods } from "@galatajs/core";
import { Middleware } from "@galatajs/http";

export type ReflectMiddleware = {
  path: string;
  middlewares: Middleware[];
  methods: HttpMethods[];
  isAll?: boolean;
  routerScope?: boolean;
};
