import "reflect-metadata";
import { ReflectRoute } from "./reflect-route";
import { createRouter } from "@galatajs/http";

type RouterHttpMethods = "get" | "post" | "put" | "delete" | "all";

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
  console.log("middlewares", middlewares);
  const [_prefix, version] = prefix.split("/v");
  const router = createRouter({
    prefix: _prefix,
    version: version,
  });
  for (const route of routes) {
    const { methodName, httpMethods, path, isAll } = route;
    if (isAll) {
      router.all(path, provider[methodName]);
    } else {
      for (const method of httpMethods) {
        router[method.toLocaleLowerCase() as RouterHttpMethods](
          path,
          provider[methodName]
        );
      }
    }
  }
};
