const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000;

// Настройка CORS для разрешения запросов с фронтенда
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка Multer для обработки form-data
const upload = multer();

// Обработка POST-запроса с формы
app.post("/send-form", upload.none(), (req, res) => {
  const { "first-name": firstName, "second-name": lastName, phone, Email, comment, consent } = req.body;

  // Проверка обязательных полей
  if (!firstName || !lastName || !phone || !Email || !consent) {
    return res.status(400).json({ success: false, message: "Заполните все обязательные поля." });
  }

  // Логирование данных (для отладки)
  console.log("Получены данные:", req.body);

  // Здесь можно добавить логику сохранения в БД или отправки email

  res.status(200).json({ success: true, message: "Форма успешно отправлена!" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
