import "reflect-metadata";
import { ReflectRoute } from "./reflect-route";
import { createRouter, Middleware } from "@galatajs/http";
import { ReflectMiddleware } from "./reflect-middleware";

type RouterHttpMethods = "get" | "post" | "put" | "delete" | "all";

const getMiddlewaresInReflectMiddlewares = (
  m: ReflectMiddleware[]
): Middleware[] => {
  return m.map((r) => r.middlewares).flat();
};

export const installHttp = async (provider: any): Promise<void> => {
  const prefix = Reflect.getMetadata("http:prefix", provider.constructor);
  const routes: Array<ReflectRoute> = Reflect.getMetadata(
    "http:routes",
    provider.constructor
  );
  const middlewares = Reflect.getMetadata(
    "http:middlewares",
    provider.constructor
  );
  const routerMiddlewares = middlewares.filter(
    (m: ReflectMiddleware) => m.routerScope
  );
  const routeMiddlewares = middlewares.filter(
    (m: ReflectMiddleware) => !m.routerScope
  );
  const [_prefix, version] = prefix.split("/v");
  const router = createRouter({
    prefix: _prefix,
    version: version,
    middlewares: getMiddlewaresInReflectMiddlewares(routerMiddlewares),
  });
  for (const route of routes) {
    const { methodName, httpMethods, path, isAll } = route;
    const routeMiddleware = routeMiddlewares.filter(
      (m: ReflectMiddleware) =>
        m.path === path && m.methods.includes(httpMethods[0])
    );
    if (isAll) {
      router.all(
        path,
        getMiddlewaresInReflectMiddlewares(routeMiddleware),
        provider[methodName]
      );
    } else {
      for (const method of httpMethods) {
        router[method.toLocaleLowerCase() as RouterHttpMethods](
          path,
          getMiddlewaresInReflectMiddlewares(routeMiddleware),
          provider[methodName]
        );
      }
    }
  }
};
