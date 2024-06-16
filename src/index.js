import { createServer } from 'node:http';
import express from 'express';
import { join } from 'node:path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'main.jsx'))
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// import express from 'express';
// import { join, dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { createServer } from 'node:http';
// import { Server } from 'socket.io';
// import { transformFileSync } from '@babel/core';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.get('/', (req, res) => {
//     const jsxFile = join(__dirname, 'main.jsx');
//     const { code } = transformFileSync(jsxFile, {
//         presets: ['@babel/preset-react']
//     });
//     res.type('js').send(code);
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });