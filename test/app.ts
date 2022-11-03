import { Controller, createDecoratorApp, Get } from "../lib";
import { createApp, createModule } from "@galatajs/app";
import { createHttpServer } from "@galatajs/http";

@Controller("test")
class Provider {
  @Get("all")
  getAll() {
    console.log("getAll");
  }
}

const mainModule = createModule("main", {
  providers: [Provider],
});

const app = createApp(mainModule);
app.register(createHttpServer());
app.register(createDecoratorApp());

app.start().then(() => {
  console.log("app started");
});
