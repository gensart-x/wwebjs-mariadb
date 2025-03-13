import WWebRemoteStore from "WWebRemoteStore";
import MariaDBStoreParameter from "MariaDBStoreParams";
import { Sequelize } from "sequelize";

/**
 * ### Just another mariadb remote store for whatsapp-web.js made with ❤ for you.
 */
class MariaDBStore implements WWebRemoteStore {

    /**
     * Sequelize engine
     */
    private sequelize: Sequelize;

    private tableName: string;

    static createSessionStoreTable = (
        /**
         * Instance of MariaDBStore after you initialized it.
         */
        mariadbStore: MariaDBStore,

        /**
         * The table name for your session store. Default to 'wweb_sessions'
         */
        tableName: string = 'wweb_sessions'
    ) => {
        mariadbStore.sequelize.define(tableName, {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            session_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            data: {
                type: Sequelize.BLOB({
                    length: 'medium'
                }),
            },
        }, {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        })

        mariadbStore.sequelize.sync({
            force: true
        })
    }

    constructor(params: MariaDBStoreParameter) {
        if (!params.host || !params.username || !params.password || !params.port)
            throw new Error('Please enter your MariaDB database credentials properly');

        this.sequelize = new Sequelize({
            dialect: 'mariadb',
            host: params.host,
            username: params.username,
            password: params.password,
            port: params.port
        });

        this.tableName = (!params.tableName) ? 'wweb_sessions' : params.tableName
    }

    sessionExists = (sessionObject: object) => {
        console.log(this.sequelize.models[this.tableName])
    }
    save = (sessionObject: object) => { }
    extract = (sessionObject: object) => { }
    delete = (sessionObject: object) => { }
}

export default MariaDBStore;