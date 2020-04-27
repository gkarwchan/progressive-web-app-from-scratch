import Koa from 'koa';
import Router from 'koa-router';

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
