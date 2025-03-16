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

// Хранилище данных (имитация базы данных)
let storedFormData = {};

// Обработка POST-запроса с формы обратной связи
app.post("/send-form", upload.none(), (req, res) => {
  const { "first-name": firstName, "second-name": lastName, phone, Email, comment, consent } = req.body;

  if (!firstName || !lastName || !phone || !Email || !consent) {
    return res.status(400).json({ success: false, message: "Заполните все обязательные поля." });
  }

  console.log("Получены данные с формы обратной связи:", req.body);
  res.status(200).json({ success: true, message: "Форма успешно отправлена!" });
});

// Обработка POST-запроса с многошаговой формы
app.post("/api/submit", (req, res) => {
  const { name, phone, email, zip, terms } = req.body;

  if (!name || !phone || !email || !zip || !terms) {
    return res.status(400).json({ success: false, message: "Заполните все обязательные поля." });
  }

  storedFormData = req.body;
  console.log("Получены данные с многошаговой формы:", storedFormData);

  res.status(200).json({ success: true, message: "Данные успешно отправлены!" });
});

// Эндпоинт для просмотра сохранённых данных
app.get("/api/data", (req, res) => {
  res.json(storedFormData);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
