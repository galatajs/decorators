import { CorePlugin } from "@galatajs/app";

export interface DecoratorApp extends CorePlugin {}
export type CreateDecoratorApp = () => DecoratorApp;
