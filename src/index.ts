import { createServer } from './server';
import { config } from 'dotenv';
config();

const PORT: string = process.env.PORT;

createServer()
  .then((server) => {
    server.listen(PORT);
    console.log();
    console.log(`✅ Server run: http://localhost:${PORT}`);
    console.log(`📕 Api documentation: http://localhost:8020/api-docs/`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
