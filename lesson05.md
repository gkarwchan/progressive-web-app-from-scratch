```bash
npm i koa koa-router
npm i -D @types/koa @types/koa-router
```

```js
// src/server/app.ts
import Koa from 'koa';

class App {
  public app: Koa;

  constructor() {
    this.app = new Koa();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.app.use(async ctx => {
      ctx.body = 'Hello World'
    })  
  }
}

export default new App().app;

```

```js
// src/server/app.ts
import App from './app';

const port = process.env.PORT || 3000;

App.listen(port);
```

```json
// config/tsconfig-server.json
{
  "compilerOptions": {
    "module": "CommonJS",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "Node",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "*": [
        "node_modules/*"
      ]
    }
  },
  "include": [
    "./**/*"
  ]
}
```

```bash
./node_modules/.bin/ts-node --project config/tsconfig-server.json src/server
```

```js
import Router as 'koa-router';
```