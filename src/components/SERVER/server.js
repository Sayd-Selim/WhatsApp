import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import { log } from 'console';

// Настройка CORS

const app = express();
const server = createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Socket.IO с настройками CORS
const io = new Server(server, {
  cors: corsOptions
});

app.get('/api/users/getUserId', (req, res) => {
  const userId = req.userId;
  
  res.status(200).json({ userId });
  console.log("req", req);
});

app.post('/api/messages', (req, res) => {
  const messageData = req.body;
  const userId = messageData.userId;
  const messageText = messageData.messageText;

  res.status(200).send('Message saved');
});

// Middleware для разбора JSON входящих запросов
app.use(express.json());

app.post('/webhook', (req, res) => {
  const data = req.body;
  // Обработка входящего сообщения здесь
  console.log('Received data:', data);

  const messageType = data.body.messageData.typeMessage;
  const sender = data.body.senderData.sender;
  const messageText = data.body.messageData.textMessageData.textMessage;

  if (messageType === 'textMessage') {
      console.log(`Received a message from ${sender}: ${messageText}`);

      io.emit('message', { sender, messageText });
  } else {
      console.log(`Received a non-text message from ${sender}`);

  }

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});