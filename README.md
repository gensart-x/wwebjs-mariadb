
> Still on development

# whatsapp-web.js - mariadb store

A store plugin for whatsapp-web.js that uses MariaDB as its database.

## Installation

`npm install whatsapp-web-mariadb-store`

## Usage

```js
const mariadbStore = require("wwebjs-mariadb");

const store = new mariadbStore({
    host: "localhost",
    user: "user",
    password: "password",
    database: "database",
});

const client = new Client(store);
```

## Contributing

Contributions are welcome. Please open up an issue or pull request to discuss what you would like to add or change.
