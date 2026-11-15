🚗 Car Rent App
Сучасний веб-додаток для оренди автомобілів із підтримкою користувацьких сценаріїв та розширеною панеллю адміністратора. Проєкт реалізовано за допомогою сучасного стек-технологій фронтенду.

🛠 Технологічний стек
Фреймворк: Next.js (App Router)

Мова: TypeScript

Стейт та кешування запитів: TanStack React Query

Стилізація: CSS Modules

Робота з API: Axios

✨ Основний функціонал

👤 Для звичайних користувачів:

- Каталог автомобілів та локацій:

  Перегляд доступного транспорту з пагінацією та фільтрацією.

- Керування бронюваннями:

  Створення бронювання з вибором дат і автоматичним живим розрахунком загальної вартості на основі добового тарифу.

  Редагування дат існуючого бронювання (через модальне вікно з перерахунком суми).

  Скасування бронювання (доступно для статусів «Очікує підтвердження» та «Підтверджено»).

- Авторизація: Особистий кабінет із переглядом власних замовлень на сторінці /bookings/my.

🛠 Для адміністраторів (/admin):
Панель керування (Dashboard): Повний контроль над списком бронювань, автомобілів та локацій.

Адміністрування замовлень:

- Редагування будь-яких деталей бронювання (включно зі зміною статусів: pending, confirmed, active, completed, cancelled).

- Розділені ролі та спеціалізовані компоненти (BookingItemAdmin / BookingItem) для безпечної та ізольованої логіки.

📂 Архітектура та структура проєкту
app/ — сторінки та маршрути Next.js (App Router), включно з групуванням маршрутів для користувачів та адмін-панелі.

components/ — повторно використовувані компоненти інтерфейсу (форми створення та редагування бронювань, картки елементів, списки).

services/ — модулі для взаємодії з бекендом (запити через Axios для автомобілів, локацій та бронювань).

types/ — TypeScript інтерфейси та типи (статуси бронювань, параметри запитів).

🚀 Швидкий старт (Локальне запуск)
Клонуйте репозиторій:

Bash
git clone <посилання-на-репозиторій>
cd cars-rent
Встановіть залежності:

Bash
npm install

# або

yarn install

# або

pnpm install
Створіть файл конфігурації середовища (.env.local) у корені проєкту та вкажіть базовий шлях до вашого API:

Фрагмент кода
NEXT*PUBLIC_API_URL=ваш* URL_бекенду
Запустіть проєкт у режимі розробки:

Bash
npm run dev

# або

yarn dev

# або

pnpm dev
Відкрийте у браузері http://localhost:3000, щоб побачити додаток.

=================================================================

🚗 Car Rent App

A modern car rental web application featuring user-centric scenarios and an advanced administrator panel. The project is implemented using modern frontend technologies.

🛠 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

State Management & Query Caching: TanStack React Query

Styling: CSS Modules

API Integration: Axios

✨ Main Features

👤 For Regular Users:

Car & Location Catalog:

View available transport with pagination and filtering.

Booking Management:

Create a reservation with date selection and an automatic live calculation of the total cost based on the daily rate.

Edit the dates of an existing booking (via a modal window with real-time price recalculation).

Cancel a reservation (available for «Pending» and «Confirmed» statuses).

Authorization: Personal account with a view of personal orders on the /bookings/my page.

🛠 For Administrators (/admin):

Dashboard: Full control over the list of bookings, cars, and locations.

Order Administration:

Edit any booking details (including status changes: pending, confirmed, active, completed, cancelled).

Separated roles and specialized components (BookingItemAdmin / BookingItem) for secure and isolated logic.

📂 Project Architecture & Structure

app/ — Next.js pages and routes (App Router), including route grouping for users and the admin panel.

components/ — Reusable UI components (booking creation and editing forms, item cards, lists).

services/ — Modules for backend interaction (Axios requests for cars, locations, and bookings).

types/ — TypeScript interfaces and types (booking statuses, query parameters).

🚀 Quick Start (Local Development)

Clone the repository:

Bash
git clone <repository-link>
cd cars-rent
Install dependencies:

Bash
npm install

# or

yarn install

# or

pnpm install
Create an environment configuration file (.env.local) in the root of the project and specify the base path to your API:

Фрагмент кода
NEXT_PUBLIC_API_URL=your_backend_url
Run the project in development mode:

Bash
npm run dev

# or

yarn dev

# or

pnpm dev
Open http://localhost:3000 in your browser to view the application.
