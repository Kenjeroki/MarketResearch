# MarketResearch

**MarketResearch** — вебсайт для публікації та перегляду маркетингових досліджень. Проєкт складається з фронтенд‑частини на React та бекенд‑API на Fastify з базою даних MongoDB. Користувачі можуть створювати профілі, залишати коментарі, додавати дослідження в обране та генерувати PDF‑звіти.

## Технології

### Backend
- **Fastify**
- **@fastify/cors**
- **@fastify/formbody**
- **@fastify/mongodb**, **mongodb**
- **dotenv**
- **jsonwebtoken**
- **bcryptjs**

### Frontend
- **React** + **TypeScript**
- **TailwindCSS**
- **Vite**
- Контекст API для керування станом
- **React Hook Form** та **Zod**

## Структура репозиторію
```
server/      бекенд Fastify (маршрути, контролери, підключення MongoDB)
src/         вихідний код React‑клієнта
  components/   UI та сторінкові компоненти
  contexts/     контексти (автентифікація, мова)
  hooks/        користувацькі хуки
public/      статичні файли
```

## Встановлення та запуск

1. **Встановіть Node.js**
2. **Клонуйте репозиторій** :
   ```bash
   git clone <repo-url>
   cd MarketReserch
   ```
3. **Встановіть залежності** :
   ```bash
   npm install
   cd server && npm install
   ```
4. **Створіть файл `.env` у папці `server/`** :
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=prodexplorer
   JWT_SECRET=your-secret
   ```
   MongoDB має бути запущена локально або через MongoDB Atlas.
5. **Запустіть бекенд**:
   ```bash
   npm start
   ```
6. У новому терміналі **запустіть фронтенд** з кореневої директорії:
   ```bash
   npm run dev
   ```

## Основний функціонал
- Повноцінна авторизація та реєстрація
- Рольова модель (user, student, analyst, admin)
- Додавання та перегляд досліджень
- Збереження обраного
- Коментарі до досліджень
- Профіль користувача
- Генерація PDF‑звіту

## Приклад використання
Запуск сервера стартує API за портом, вказаним у `.env` (типово `3000`), а Vite піднімає клієнт за `localhost:5173`. Після успішного підключення до MongoDB у консолі зʼявиться повідомлення `MongoDB підключено: Так`.nod
