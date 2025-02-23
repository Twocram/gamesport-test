# Описание проекта

## Основа

Для разработки интерфейса использовались следующие технологии:
- Vue 3 + Composition API
- TypeScript
- i18n
- Tailwindcss
- Pinia

## Тестирование

Для Unit тестирования используется [Vitest](https://vitest.dev/)

## Сервер

Для иммитации работы сервера используется [json-server](https://www.npmjs.com/package/json-server)


## Запуск проекта

Перед запуском проекта необходимо установить зависимости:

```shell
# npm
npm install

# pnpm
pnpm install

#yarn
yarn install
```


Запуск json-server:

```shell
#npm
npm run dev:server

#pnpm
pnpm dev:server

#yarn
yarn dev:server
```

Запуск dev-сервера:
```shell
#npm
npm run dev

#pnpm
pnpm dev

#yarn
yarn dev
```

## Тестирование
Запуск unit тестов:

```shell
#npm
npm run test:unit

#pnpm
pnpm test:unit

#yarn
yarn test:unit
```