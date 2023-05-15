import axios from 'axios';


export const sendMessage = async (message, recipient) => {
  const idInstance = '1101820351';
  const apiTokenInstance = 'b6dbb79c7b9c49b48aeabb7a2444113a885e2e7de07d4d88a9';

  const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  
  const data = {
    chatId: `${recipient.trim()}@c.us`,
    message: message,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log('Data:', data); // Добавлено для проверки данных
  console.log('Config:', config); // Добавлено для проверки конфигурации

  try {
    const response = await axios.post(url, data, config);
    console.log(response);
    return message; // Вернуть отправленное сообщение
  } catch (error) {
    console.log('Error response:', error.response.data);// Обработка ошибок
  }
};