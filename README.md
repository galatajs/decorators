!! Not Ready for Prime Time, Experimental !!

<p align="center">
<br>
<img src="https://avatars.githubusercontent.com/u/108695351?s=200&v=4" width="128" height="128">
</p>
<h3 align="center">@galatajs/decorators</h3>
<p align="center">
  Decorator package of <code>galatajs</code> framework. 
</p>

### Installation

```bash
npm install @galatajs/decorators
```

### Usage

Enable decorators in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Main file

```typescript
import { createApp, App } from "@galatajs/app";
import { createDecoratorApp } from "@galatajs/decorators";
import { mainModule } from "./src/main.module";

const app: App = createApp(mainModule);
app.register(createDecoratorApp());

app.start();
```

In Controller

```typescript
import { Controller, Get } from "@galatajs/decorators";
import { Request, Response } from "@galatajs/http";

@Controller("some")
export class SomeController {
  @Get("test")
  test(req: Request, res: Response) {
    return res.success("test");
  }
}
```

In Module

```typescript
import { createModule, Module } from "@galatajs/app";
import { SomeController } from "./some.controller";

const module: Module = createModule({
  providers: [SomeController],
});
```
