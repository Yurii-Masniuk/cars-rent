# Frontend Spec

## 1. Мета документа

Цей документ описує технічне завдання для frontend-застосунку DriveGo на
Next.js. Застосунок має включати публічний landing page, користувацьку частину
для пошуку та бронювання автомобілів, сторінку власних бронювань користувача, а
також адміністративну панель для керування локаціями, автомобілями,
користувачами та перегляду dashboard-статистики.

Документ має використовуватись frontend-розробником як основа для проєктування
роутів, сторінок, компонентів, API-клієнта, форм, доступів і станів інтерфейсу.

## 2. Технологічна основа

- Framework: Next.js.
- Рекомендований підхід: App Router.
- Основна мова: TypeScript.
- API base URL: брати з env-змінної, наприклад `NEXT_PUBLIC_API_URL`.
- Авторизація: через API `/auth/login`, `/auth/me`, `/auth/logout`,
  `/auth/refresh`.
- Production API Gateway CORS відкритий для всіх origins через `*` без
  credentials. Для такого режиму frontend має передавати access token через
  `Authorization: Bearer <token>`.
- Бекенд також встановлює `accessToken` та `refreshToken` як httpOnly cookies
  після логіну. Якщо frontend має працювати саме через cookies та
  `credentials: 'include'`, у CORS не можна використовувати `*`; потрібно
  вказати конкретний frontend origin.
- Для захищених сторінок потрібно перевіряти поточного користувача через
  `GET /auth/me`.

## 3. Ролі та доступи

### Гість

Гість може:

- переглядати landing page;
- переглядати каталог автомобілів;
- шукати та фільтрувати автомобілі;
- переглядати деталі автомобіля;
- перейти на сторінку входу;
- виконати логін;

Гість не може:

- створювати бронювання;
- переглядати власні бронювання;
- відкривати адміністративну панель;
- створювати, редагувати або видаляти локації;
- створювати, редагувати або видаляти автомобілі;
- переглядати список користувачів;
- редагувати користувачів.

### Звичайний користувач

Звичайний користувач може:

- авторизуватись;
- переглядати каталог автомобілів;
- шукати автомобілі за параметрами та доступними датами;
- переглядати деталі автомобіля;
- створювати бронювання;
- переглядати власні бронювання;
- скасовувати власні бронювання у дозволених статусах.

Звичайний користувач не може:

- відкривати `/admin` та всі вкладені admin-сторінки;
- виконувати admin-запити.

Якщо користувач з роллю `user` відкриває admin-сторінку, frontend має показати
`403 Forbidden` або перенаправити на дозволену сторінку.

### Адміністратор

Адміністратор може:

- відкривати адміністративну панель;
- переглядати dashboard;
- переглядати, створювати, редагувати та видаляти локації;
- переглядати, створювати, редагувати та видаляти автомобілі;
- переглядати список користувачів;
- переглядати деталі користувача;
- редагувати користувача, наприклад ім'я, телефон, роль, статус блокування.

## 4. Загальна структура застосунку

### Публічні маршрути

| Route           | Назва сторінки              | Доступ |
| --------------- | --------------------------- | ------ |
| `/`             | Landing page                | Всі    |
| `/cars`         | Каталог і пошук автомобілів | Всі    |
| `/cars/[carId]` | Деталі автомобіля           | Всі    |
| `/login`        | Вхід в акаунт               | Гість  |

### Користувацькі маршрути

| Route          | Назва сторінки | Доступ |
| -------------- | -------------- | ------ |
| `/bookings/my` | Мої бронювання | User   |

### Адміністративні маршрути

| Route                                | Назва сторінки                 | Доступ |
| ------------------------------------ | ------------------------------ | ------ |
| `/admin`                             | Redirect на `/admin/dashboard` | Admin  |
| `/admin/dashboard`                   | Dashboard                      | Admin  |
| `/admin/locations`                   | Список локацій                 | Admin  |
| `/admin/locations/new`               | Створення локації              | Admin  |
| `/admin/locations/[locationId]`      | Деталі локації                 | Admin  |
| `/admin/locations/[locationId]/edit` | Редагування локації            | Admin  |
| `/admin/cars`                        | Список автомобілів             | Admin  |
| `/admin/cars/new`                    | Створення автомобіля           | Admin  |
| `/admin/cars/[carId]`                | Деталі автомобіля              | Admin  |
| `/admin/cars/[carId]/edit`           | Редагування автомобіля         | Admin  |
| `/admin/users`                       | Список користувачів            | Admin  |
| `/admin/users/[userId]`              | Деталі користувача             | Admin  |
| `/admin/users/[userId]/edit`         | Редагування користувача        | Admin  |

## 4.1 Landing page

### Route

`/`

### Призначення

Головна публічна сторінка DriveGo має працювати як landing page для сервісу
оренди автомобілів. Вона має швидко пояснювати цінність сервісу, вести
користувача до пошуку автомобіля та давати зрозумілий шлях до авторизації.

### Функціонал

- hero-блок з назвою сервісу DriveGo, короткою пропозицією та основною дією
  `Знайти авто`;
- форма швидкого пошуку автомобіля: локація, дата початку, дата завершення;
- перехід з форми пошуку на `/cars` із query-параметрами;
- секція переваг сервісу: швидке бронювання, прозора ціна, вибір локацій;
- секція популярних або рекомендованих автомобілів, якщо є дані з API;
- блок доступних локацій;
- CTA для входу або переходу до каталогу;
- адаптивна навігація з посиланнями на каталог, вхід і власні бронювання для
  авторизованого користувача.

### API

Для рекомендованих автомобілів:

```http
GET /cars?status=active&perPage=6&sortField=createdAt&sortOrder=desc
```

Для локацій:

```http
GET /locations?isActive=true&perPage=100
```

## 4.2 Користувацький каталог і пошук автомобілів

### Route

`/cars`

### Призначення

Сторінка каталогу є основною користувацькою сторінкою для пошуку автомобіля.
Вона має дозволяти гостю або авторизованому користувачу знайти доступний
автомобіль за містом/локацією, датами, ціною та характеристиками.

### Функціонал

- список автомобілів у вигляді карток або щільного grid/list layout;
- пошук за брендом і моделлю;
- фільтр за локацією;
- фільтри за датами `startDate` та `endDate` для перевірки доступності;
- фільтр за ціною `minPrice` та `maxPrice`;
- фільтри за категорією, типом пального, коробкою передач, кількістю місць;
- сортування за ціною, роком, датою створення або пробігом;
- пагінація або incremental loading;
- empty state, якщо за фільтрами немає автомобілів;
- збереження активних фільтрів у query-параметрах URL;
- клік по картці автомобіля відкриває `/cars/[carId]`.

### API

```http
GET /cars?page=1&perPage=12&locationId=&brand=&model=&category=&fuelType=&transmission=&minPrice=&maxPrice=&startDate=&endDate=&sortField=pricePerDay&sortOrder=asc
```

Очікувана відповідь така сама, як для admin-списку автомобілів:

```json
{
  "page": 1,
  "perPage": 12,
  "totalItems": 0,
  "totalPages": 0,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "cars": []
}
```

## 4.3 Деталі автомобіля та створення бронювання

### Route

`/cars/[carId]`

### Призначення

Сторінка показує повну інформацію про автомобіль і дає авторизованому
користувачу можливість створити бронювання.

### Функціонал

- галерея фото автомобіля;
- основні характеристики: бренд, модель, рік, категорія, колір, тип пального,
  коробка передач, кількість місць, пробіг;
- ціна за день;
- інформація про локацію отримання автомобіля;
- форма вибору дат бронювання;
- розрахунок орієнтовної вартості за кількістю днів;
- кнопка `Забронювати`;
- якщо користувач не авторизований, кнопка бронювання веде на `/login`;
- після успішного бронювання показати success notification і запропонувати
  перейти на `/bookings/my`.

### API

```http
GET /cars/:carId
GET /locations/:locationId
POST /bookings
```

Тіло запиту створення бронювання:

```json
{
  "carId": "64f000000000000000000000",
  "startDate": "2026-10-01T00:00:00.000Z",
  "endDate": "2026-10-05T00:00:00.000Z"
}
```

## 4.4 Мої бронювання

### Route

`/bookings/my`

### Призначення

Окрема захищена сторінка, де авторизований користувач переглядає історію та
поточний стан власних бронювань.

### Функціонал

- список власних бронювань користувача;
- фільтр за статусом: `pending`, `confirmed`, `active`, `completed`,
  `cancelled`;
- пагінація;
- показ автомобіля, дат оренди, статусу та загальної ціни;
- кнопка скасування для бронювань у статусах `pending` або `confirmed`;
- confirmation dialog перед скасуванням;
- empty state для користувача без бронювань;
- після скасування оновити список або статус бронювання на сторінці.

### API

```http
GET /bookings/my?page=1&perPage=10&status=confirmed
PATCH /bookings/:bookingId/cancel
```

Очікувана відповідь:

```json
{
  "page": 1,
  "perPage": 10,
  "totalItems": 0,
  "totalPages": 0,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "bookings": []
}
```

## 5. Layout адміністративної панелі

Адміністративна панель має мати спільний layout для всіх сторінок `/admin/*`.

### Sidebar

Зліва має бути постійний sidebar з навігацією:

- Dashboard: `/admin/dashboard`
- Локації: `/admin/locations`
- Автомобілі: `/admin/cars`
- Користувачі: `/admin/users`

Вимоги:

- активний пункт навігації має бути візуально виділений;
- sidebar має залишатися доступним на всіх admin-сторінках;
- на мобільних екранах sidebar можна сховати у drawer/menu;
- внизу або зверху має бути кнопка виходу з акаунта.

### Header

У верхній частині основної області бажано показувати:

- назву поточної сторінки;
- ім'я або email адміністратора;
- кнопку logout.

### Logout

При натисканні logout:

1. виконати `POST /auth/logout`;
2. очистити локальний auth state;
3. перенаправити на `/login`.

## 6. Авторизація

### `/login`

Функціонал:

- форма з полями `email`, `password`;
- кнопка входу;
- показ помилки при неправильних даних;
- після успішного входу виконати `GET /auth/me`;
- якщо роль користувача `admin`, перенаправити на `/admin/dashboard`;
- якщо роль `user`, не пускати в admin-панель.

API:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

Очікувана відповідь:

```json
{
  "accessToken": "string"
}
```

Після логіну:

```http
GET /auth/me
```

Очікувана відповідь:

```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "role": "user | admin",
    "isBlocked": false,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

## 7. Dashboard

### Route

`/admin/dashboard`

### Призначення

Головна сторінка адміністратора після входу в акаунт.

### Функціонал

Показати основні метрики:

- загальна кількість автомобілів;
- кількість активних автомобілів;
- загальна кількість користувачів;
- кількість активних бронювань;
- дохід за поточний місяць;
- кількість днів оренди за поточний місяць.
- графік доходу за днями поточного місяця;
- статистику автопарку за статусами, категоріями, типами пального та коробкою
  передач.

### API

```http
GET /admin/dashboard
```

Доступ: тільки admin.

Очікувана відповідь:

```json
{
  "totalCars": 0,
  "activeCars": 0,
  "totalUsers": 0,
  "activeBookings": 0,
  "monthRevenue": 0,
  "monthRentalDays": 0
}
```

Для графіка доходу:

```http
GET /admin/dashboard/revenue
```

Очікувана відповідь:

```json
{
  "periodStart": "2026-09-01T00:00:00.000Z",
  "periodEnd": "2026-10-01T00:00:00.000Z",
  "revenueByDay": [
    {
      "date": "2026-09-28",
      "revenue": 250,
      "bookingsCount": 3
    }
  ]
}
```

Для статистики автопарку:

```http
GET /admin/dashboard/fleet
```

Очікувана відповідь:

```json
{
  "byStatus": [{ "status": "active", "count": 12 }],
  "byCategory": [{ "category": "sedan", "count": 5 }],
  "byFuelType": [{ "fuelType": "petrol", "count": 8 }],
  "byTransmission": [{ "transmission": "automatic", "count": 10 }]
}
```

### UI

Рекомендовано показати метрики у вигляді компактних інформаційних блоків. Також
можна додати швидкі дії:

- створити автомобіль;
- створити локацію;
- перейти до користувачів.
- переглянути графік доходу;
- переглянути розподіл автопарку.

## 8. Локації

### 8.1 Список локацій

Route: `/admin/locations`

Функціонал:

- показати таблицю або список локацій;
- підтримати пагінацію;
- підтримати фільтр за назвою;
- підтримати фільтр за містом;
- підтримати фільтр за активністю;
- кнопка `Створити локацію`;
- клік по локації відкриває `/admin/locations/[locationId]`.

API:

```http
GET /locations?page=1&perPage=10&name=&city=&isActive=true
```

Очікувана відповідь:

```json
{
  "page": 1,
  "perPage": 10,
  "totalItems": 0,
  "totalPages": 0,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "locations": []
}
```

Поля локації:

```json
{
  "_id": "string",
  "name": "string",
  "city": "string",
  "address": "string",
  "phone": "string",
  "openingTime": "09:00",
  "closingTime": "18:00",
  "isActive": true,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### 8.2 Деталі локації

Route: `/admin/locations/[locationId]`

Функціонал:

- показати всю інформацію про конкретну локацію;
- кнопка `Редагувати` веде на `/admin/locations/[locationId]/edit`;
- кнопка `Видалити` видаляє локацію після confirmation dialog;
- після видалення перенаправити на `/admin/locations`.

API:

```http
GET /locations/:locationId
DELETE /locations/:locationId
```

### 8.3 Створення локації

Route: `/admin/locations/new`

Форма:

- `name`: обов'язково;
- `city`: обов'язково;
- `address`: обов'язково;
- `phone`: обов'язково;
- `openingTime`: обов'язково;
- `closingTime`: обов'язково;
- `isActive`: boolean, за замовчуванням `true`.

API:

```http
POST /locations
Content-Type: application/json

{
  "name": "DriveGo Center",
  "city": "Kyiv",
  "address": "Khreshchatyk 1",
  "phone": "+380000000000",
  "openingTime": "09:00",
  "closingTime": "18:00",
  "isActive": true
}
```

Після успішного створення:

- показати success notification;
- перенаправити на `/admin/locations/[createdLocationId]`.

### 8.4 Редагування локації

Route: `/admin/locations/[locationId]/edit`

Функціонал:

- завантажити поточні дані локації через `GET /locations/:locationId`;
- заповнити форму;
- дозволити редагувати всі поля;
- після збереження відправити `PATCH /locations/:locationId`;
- після успішного оновлення перенаправити на сторінку деталей.

API:

```http
PATCH /locations/:locationId
Content-Type: application/json

{
  "name": "DriveGo Center Updated",
  "city": "Kyiv",
  "address": "New address",
  "phone": "+380000000001",
  "openingTime": "08:00",
  "closingTime": "20:00",
  "isActive": true
}
```

## 9. Автомобілі

### 9.1 Список автомобілів

Route: `/admin/cars`

Функціонал:

- показати таблицю або список автомобілів;
- підтримати пагінацію;
- підтримати сортування;
- підтримати фільтри;
- кнопка `Створити автомобіль`;
- клік по автомобілю відкриває `/admin/cars/[carId]`.

Фільтри:

- `locationId`;
- `brand`;
- `model`;
- `year`;
- `color`;
- `transmission`;
- `fuelType`;
- `category`;
- `status`;
- `minPrice`;
- `maxPrice`;
- `startDate`;
- `endDate`.

Сортування:

- `createdAt`;
- `updatedAt`;
- `brand`;
- `model`;
- `year`;
- `pricePerDay`;
- `mileage`;
- `seats`.

API:

```http
GET /cars?page=1&perPage=10&sortField=createdAt&sortOrder=desc
```

Очікувана відповідь:

```json
{
  "page": 1,
  "perPage": 10,
  "totalItems": 0,
  "totalPages": 0,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "cars": []
}
```

Поля автомобіля:

```json
{
  "_id": "string",
  "locationId": "string",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "color": "white",
  "transmission": "automatic",
  "fuelType": "petrol",
  "category": "sedan",
  "seats": 5,
  "pricePerDay": 50,
  "mileage": 10000,
  "images": ["https://example.com/car.jpg"],
  "status": "active",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### 9.2 Деталі автомобіля

Route: `/admin/cars/[carId]`

Функціонал:

- показати повну інформацію про автомобіль;
- показати фото автомобіля, якщо `images` не порожній;
- показати пов'язану локацію за `locationId`;
- кнопка `Редагувати` веде на `/admin/cars/[carId]/edit`;
- кнопка `Видалити` видаляє автомобіль після confirmation dialog;
- після видалення перенаправити на `/admin/cars`.

API:

```http
GET /cars/:carId
DELETE /cars/:carId
```

Для назви локації додатково:

```http
GET /locations/:locationId
```

### 9.3 Створення автомобіля

Route: `/admin/cars/new`

Перед показом форми потрібно завантажити список активних локацій:

```http
GET /locations?isActive=true&perPage=100
```

Форма:

- `locationId`: обов'язково, select зі списку локацій;
- `brand`: обов'язково;
- `model`: обов'язково;
- `year`: обов'язково, число від 1886 до наступного року;
- `color`: обов'язково;
- `transmission`: `automatic` або `manual`;
- `fuelType`: `petrol`, `diesel`, `hybrid`, `electric`;
- `category`: `economy`, `compact`, `sedan`, `suv`, `luxury`;
- `seats`: число від 1 до 12;
- `pricePerDay`: число від 0;
- `mileage`: число від 0, за замовчуванням 0;
- `images`: масив URL-зображень;
- `status`: `active`, `maintenance`, `inactive`, за замовчуванням `active`.

API:

```http
POST /cars
Content-Type: application/json

{
  "locationId": "64f000000000000000000000",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "color": "white",
  "transmission": "automatic",
  "fuelType": "petrol",
  "category": "sedan",
  "seats": 5,
  "pricePerDay": 50,
  "mileage": 10000,
  "images": ["https://example.com/car.jpg"],
  "status": "active"
}
```

Після успішного створення:

- показати success notification;
- перенаправити на `/admin/cars/[createdCarId]`.

### 9.4 Редагування автомобіля

Route: `/admin/cars/[carId]/edit`

Функціонал:

- завантажити автомобіль через `GET /cars/:carId`;
- завантажити список активних локацій для select;
- заповнити форму поточними даними;
- після збереження відправити `PATCH /cars/:carId`;
- після успішного оновлення перенаправити на сторінку деталей.

API:

```http
PATCH /cars/:carId
Content-Type: application/json

{
  "brand": "Toyota",
  "model": "Corolla",
  "status": "maintenance"
}
```

## 10. Користувачі

Backend має admin endpoints для перегляду списку користувачів, перегляду одного
користувача та редагування дозволених полів. Пароль ніколи не має повертатися на
frontend.

### 10.1 Список користувачів

Route: `/admin/users`

Функціонал:

- показати список користувачів;
- підтримати пагінацію;
- підтримати пошук за іменем або email;
- підтримати фільтр за роллю;
- підтримати фільтр за статусом блокування;
- клік по користувачу відкриває `/admin/users/[userId]`.

API:

```http
GET /users?page=1&perPage=10&search=&role=user&isBlocked=false
```

Доступ: тільки admin.

Очікувана відповідь:

```json
{
  "page": 1,
  "perPage": 10,
  "totalItems": 0,
  "totalPages": 0,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "users": []
}
```

Поля користувача:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "role": "user",
  "isBlocked": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

Пароль ніколи не має повертатися на frontend.

### 10.2 Деталі користувача

Route: `/admin/users/[userId]`

Функціонал:

- показати дані користувача;
- показати статус користувача;
- показати роль користувача;
- кнопка `Редагувати` веде на `/admin/users/[userId]/edit`;
- опціонально показати бронювання користувача, якщо backend надасть таку
  можливість.

API:

```http
GET /users/:userId
```

### 10.3 Редагування користувача

Route: `/admin/users/[userId]/edit`

Функціонал:

- завантажити користувача через `GET /users/:userId`;
- дозволити редагувати `name`, `phone`, `role`, `isBlocked`;
- email бажано залишити readonly або редагувати тільки якщо це окремо дозволено
  бізнес-логікою;
- після збереження відправити `PATCH /users/:userId`;
- після успішного оновлення перенаправити на сторінку деталей.

API:

```http
PATCH /users/:userId
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+380000000000",
  "role": "user",
  "isBlocked": false
}
```

## 11. Бронювання як додатковий admin-модуль

Бекенд уже має admin endpoints для бронювань. У sidebar їх можна додати пізніше
окремою вкладкою `Бронювання`.

Можливі маршрути:

| Route                         | Назва сторінки    | Доступ |
| ----------------------------- | ----------------- | ------ |
| `/admin/bookings`             | Список бронювань  | Admin  |
| `/admin/bookings/[bookingId]` | Деталі бронювання | Admin  |

API:

```http
GET /bookings
GET /bookings/:bookingId
PATCH /bookings/:bookingId/status
```

Статуси:

- `pending`;
- `confirmed`;
- `active`;
- `completed`;
- `cancelled`.

## 12. Загальні UI-стани

Кожна сторінка, яка працює з API, має підтримувати:

- loading state;
- empty state;
- error state;
- forbidden state;
- not found state;
- confirmation dialog для видалення;
- success notification після створення, редагування або видалення;
- disabled submit button під час відправки форми;
- показ backend validation errors біля відповідних полів, якщо можливо.

## 13. Загальні правила форм

- Валідація на frontend має повторювати backend-валідацію.
- Обов'язкові поля мають бути явно позначені.
- Після помилки форма не має втрачати вже введені дані.
- Для select-полів використовувати тільки дозволені enum-значення.
- Для URL-зображень автомобіля перевіряти валідність URL.
- Для числових полів не дозволяти від'ємні значення, якщо backend цього не
  приймає.

## 14. API-клієнт

Рекомендовано створити окремий API-шар:

- `authApi`;
- `dashboardApi`;
- `locationsApi`;
- `carsApi`;
- `usersApi`;
- `bookingsApi`, якщо буде додано admin-розділ бронювань.

Усі запити мають:

- використовувати `NEXT_PUBLIC_API_URL`;
- для production wildcard CORS передавати access token через
  `Authorization: Bearer <token>`;
- використовувати `credentials: 'include'` тільки якщо backend CORS налаштовано
  на конкретний frontend origin, а не на `*`;
- обробляти `401` через спробу refresh або redirect на `/login`;
- обробляти `403` як відсутність доступу;
- повертати типізовані дані.

## 15. Захист admin routes

Для всіх `/admin/*` сторінок потрібно:

1. отримати поточного користувача через `GET /auth/me`;
2. якщо користувач не авторизований, перенаправити на `/login`;
3. якщо користувач авторизований, але `role !== 'admin'`, показати `403` або
   перенаправити з admin-панелі;
4. якщо користувач `admin`, показати сторінку.

## 16. Рекомендована структура папок Next.js

```text
app/
  login/
    page.tsx
  admin/
    layout.tsx
    page.tsx
    dashboard/
      page.tsx
    locations/
      page.tsx
      new/
        page.tsx
      [locationId]/
        page.tsx
        edit/
          page.tsx
    cars/
      page.tsx
      new/
        page.tsx
      [carId]/
        page.tsx
        edit/
          page.tsx
    users/
      page.tsx
      [userId]/
        page.tsx
        edit/
          page.tsx
components/
  admin/
    AdminSidebar.tsx
    AdminHeader.tsx
  forms/
    LocationForm.tsx
    CarForm.tsx
    UserForm.tsx
  tables/
    LocationsTable.tsx
    CarsTable.tsx
    UsersTable.tsx
lib/
  api/
    auth.ts
    dashboard.ts
    locations.ts
    cars.ts
    users.ts
  types/
    auth.ts
    location.ts
    car.ts
    user.ts
```

## 17. Мінімальний результат першої версії

У першій версії frontend потрібно реалізувати:

- login;
- захист admin routes;
- admin layout з sidebar;
- dashboard;
- список, деталі, створення, редагування, видалення локацій;
- список, деталі, створення, редагування, видалення автомобілів;
- список, деталі, редагування користувачів.

## 18. Backend endpoints, яких бракує для повної admin-панелі

Для повної відповідності цьому ТЗ можна додати опціональний endpoint бронювань
конкретного користувача:

```http
GET /users/:userId/bookings
```

Він має бути доступний тільки після `authenticate` та `authorizeAdmin`. До його
появи frontend може отримувати бронювання користувача через
`GET /bookings?userId=:userId`.
