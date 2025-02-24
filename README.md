# Описание проекта

## Основа

Для разработки интерфейса использовались следующие технологии:
- Vue 3 + Composition API
- TypeScript
- i18n
- Tailwindcss
- Pinia

В качестве архитектуры проекта было решено использовать ту, которую предлагает сам Vue. Но были внесены некоторые модификации:

- Некоторые компоненты находятся в self-named директориях, чтобы сразу писать тесты для них

- В директории tests должны находиться тесты для unit тестирования utils, composables и т.д.

## Форматирование

Для линтинга используется eslint с конфигом от [antfu](https://github.com/antfu/eslint-config)

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

## Форматирование

Запуск линтинга:

```shell
#npm
npm run lint

#pnpm
pnpm lint

#yarn
yarn lint
```

Фикс линтинга:

```shell
#npm
npm run lint:fix

#pnpm
pnpm lint:fix

#yarn
yarn lint:fix
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
