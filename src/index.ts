import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketio from 'socket.io';
import http from 'http';
import { switchboard } from './routes/switchboard';
import { RequestBody, ServiceResponse } from './config/interfaces';

// initiate express & socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cookie: false,
});

// middle wares for express
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({ origin: true }));

try {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`)
  );

  // socket io interface
  io.on('connection', (socket) => {
    socket.on(
      'main',
      async (
        { type, input }: RequestBody,
        response: (res: ServiceResponse) => void
      ) => {
        const { success, message, output, events } = await switchboard({
          input,
          type,
        });
        response({ success, message, output });
        for await (const { id, message, output } of events) {
          socket.emit(id, { message, output });
        }
      }
    );
  });

  // http initial route
  app.get('/', (req, res) =>
    res.send(
      `<!doctype html>
      <html lang=en>
      <head>
      <meta charset=utf-8>
      <title style="font-family:sans-serif;">API</title>
      </head>
      <body>
      <h3 style="font-family:sans-serif;text-align:center;">I'm an API 🤖, no humans allowed!</h3>
      </body>
    </html>`
    )
  );
} catch (e) {
  console.log(e);
}
