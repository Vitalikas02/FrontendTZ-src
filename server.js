import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    const contentType = response.headers['content-type'];

    let title = 'Заголовок не найден';
    if (contentType.includes('application/json')) {
      const data = response.data;
      title = data.title || title;
    } else if (contentType.includes('text/html')) {
      const html = response.data;
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      title = titleMatch ? titleMatch[1] : title;
    }

    console.log('Title:', title);
    res.json({ title });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).send('Ошибка при получении данных');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
