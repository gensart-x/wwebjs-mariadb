type MariaDBStoreParameter = {
    /**
     * Host of your database server. Either it is a domain, or an IP.
     */
    host: string,

    /**
     * Name of your database.
     */
    database: string,

    /**
     * Username of your database server. Usually set as `root` in local development.
     */
    username: string,

    /**
     * Password of your database server.
     */
    password: string,

    /**
     * Port number of your database server. Default set as `3306`.
     */
    port: number,

    /**
     * Table name of the session store table, on your database server.
     */
    tableName: string,

    /**
     * If `true`, the table creation will be created even if its already exist.
     */
    syncTable: boolean
}

export default MariaDBStoreParameter;