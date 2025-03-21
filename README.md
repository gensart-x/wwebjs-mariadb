# 🚀 MariaDB Remote Store for whatsapp-web.js

A remote store plugin for whatsapp-web.js that uses MariaDB as its database. Sequelize and MariaDB packages included inside.

## Installation

> [!IMPORTANT]
> You ultimately need the [whatsapp-web.js](https://wwebjs.dev) library to be installed too since this package is a plugin for it.

Do this with your NPM: 
```bash
npm install wwebjs-mariadb
```

And then, below is the SQL script to create the table that will be used by the plugin. We recommend that you use `MariaDBStore.syncTable` option to create the table, programmatically.

```sql
DROP TABLE IF EXISTS `wweb_sessions`;
CREATE TABLE `wweb_sessions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_name` varchar(255) NOT NULL,
  `data` mediumblob NULL DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
);
```

## Usage Example

```js
import { Client } from "whatsapp-web.js";
import { MariaDBStore } from "wwebjs-mariadb";

const store = new MariaDBStore({
    host: "localhost",
    username: "user",
    password: "password",
    database: "database",
    port: 3306,
});

const client = new Client({
    authStrategy: new RemoteAuth({
        clientId: "client-id",
        store: store,
        backupSyncIntervalMs: 30000,
    }),
});
```

## Options

Here are all the options you can pass to the MariaDB store constructor.

| Option      | Description                         | Default         |
| ----------- | ----------------------------------- | --------------- |
| `host`      | MariaDB host                        | ❌ No default   |
| `username`  | MariaDB username                    | ❌ No default   |
| `password`  | MariaDB password                    | ❌ No default   |
| `database`  | MariaDB database                    | ❌ No default   |
| `port`      | MariaDB port                        | `3306`          |
| `tableName` | MariaDB table name                  | `wweb_sessions` |
| `syncTable` | Create the table schema to database | `false`         |

## Contributing

I want you to know that contributions are welcome. Please open up an issue or pull request to discuss what you would like to add or change.


<a href="https://teer.id/gensart">
    <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/BuyMeACoffee/buymeacoffee3.svg">
</a>
