import { CorePlugin, Module } from "@galatajs/app";
import { CreateDecoratorApp } from "../app/decorator.application";
import { installHttp } from "../packages/http/installer";

export const createDecoratorApp: CreateDecoratorApp = (): CorePlugin => {
  return {
    name: "decorator",
    version: "0.1.1",
    loadLast: true,
    forceWait: true,
    async install(_, __, modules: Map<string, Module>) {
      for (const module of modules.values()) {
        for (const provider of Object.values(module.providers)) {
          await Promise.all([installHttp(provider)]);
        }
      }
    },
  };
};
