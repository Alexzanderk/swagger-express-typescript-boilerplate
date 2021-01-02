import path from 'path';
import express, { Response, Request, NextFunction } from 'express';
import * as exegesis from 'exegesis-express';
import exegesisSwaggerUIPlugin from 'exegesis-plugin-swagger-ui-express';
import * as http from 'http';

export async function createServer(): Promise<http.Server> {
  const app = express();

  // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
  const options: exegesis.ExegesisOptions = {
    controllers: path.resolve(__dirname, './controllers'),
    controllersPattern: '**/*.@(ts|js)',
    ignoreServers: true,
    allowMissingControllers: false,
    allErrors: true,
    plugins: [
      exegesisSwaggerUIPlugin({
        app: app,
        path: '/api-docs',
        swaggerUIOptions: {
          explorer: true,
        },
      }),
      //loggerPlugin
    ],
  };

  // This creates an exegesis middleware, which can be used with express,
  // connect, or even just by itself.
  const exegesisMiddleware = await exegesis.middleware(path.resolve(__dirname, '..', 'api', 'openapi.yaml'), options);

  app.disable('x-powered-by');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // If you have any body parsers, this should go before them.
  app.use(exegesisMiddleware);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: `Not found` });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  const server = http.createServer(app);
  return server;
}
