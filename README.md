Вычислитель отличий
Tests and linter status:
### Hexlet tests and linter status:
[![Actions Status](https://github.com/BudenchukM/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/BudenchukM/fullstack-javascript-project-46/actions)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=BudenchukM_fullstack-javascript-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=BudenchukM_fullstack-javascript-project-46)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BudenchukM_fullstack-javascript-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BudenchukM_fullstack-javascript-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=BudenchukM_fullstack-javascript-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=BudenchukM_fullstack-javascript-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BudenchukM_fullstack-javascript-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=BudenchukM_fullstack-javascript-project-46)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=BudenchukM_fullstack-javascript-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=BudenchukM_fullstack-javascript-project-46)

Описание
_______________________________________________
«Вычислитель отличий» — программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты
________________________________________________
• Поддержка разных входных форматов: yaml, yml, json
• Генерация отчета в виде plain, stylish и json

Установка
1. Клонирование репозитория
$ git clone https://github.com/BudenchukM/fullstack-javascript-project-46.git
2. Переход в директорию проекта
$ cd fullstack-javascript-project-46
3. Установка необходимых модулей
$ npm ci или $ make install
4. Установка пакета в систему
$ npm link

Использование
• Получение справочной информации.
$ gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference. 

Options:
-V, --version        output the version number
-f, --format [type]  format output (default: "stylish")
-h, --help           display help for command

• Определение разницы между двумя структурами данных (по-умолчанию формат вывода stylish)
# формат stylish
$ gendiff --format stylish filepath1 filepath2

# тоже формат stylish
$ gendiff filepath1 filepath2

# формат plain
gendiff --format plain filepath1 filepath2

# формат json
gendiff --format json filepath1 filepath2

Примеры

Сравнение плоских файлов (JSON)

https://asciinema.org/a/IbJzLqRrtBWvtsNuCZnHHfl8P


Сравнение плоских файлов (yaml)

https://asciinema.org/a/65OziYILxNhn44TgqIfTLDVPW

Рекурсивное сравнение


https://asciinema.org/a/qWfsPzYRbg0xCWyhvBT7U8wg4

Плоский формат

https://asciinema.org/a/uQUoeVC3vyeutBN7xygG6PQXM

Вывод в json

https://asciinema.org/a/if11OL2npQ227myuOgSEQZpFD



