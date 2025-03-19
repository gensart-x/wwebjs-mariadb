import WWebRemoteStore from "WWebRemoteStore";
import MariaDBStoreParameter from "MariaDBStoreParameter";
import { Sequelize } from "sequelize";

class MariaDBStore implements WWebRemoteStore {

    /**
     * Sequelize engine
     * @see https://sequelize.org/docs/v6/
     */
    private sequelize: Sequelize;

    private tableName: string;

    /**
     * MariaDBStore constructor
     * @param {MariaDBStoreParameter} params - The configuration for your MariaDB database.
     * @throws {Error} If the configuration is invalid
     */
    constructor(params: MariaDBStoreParameter) {
        this.tableName = (!params.tableName) ? 'wweb_sessions' : params.tableName;
        params.port = (!params.port) ? 3306 : params.port;

        this.sequelize = new Sequelize({
            dialect: 'mariadb',
            host: params.host,
            database: params.database,
            username: params.username,
            password: params.password,
            port: params.port,
        });
    }

    /**
     * Checks if a session exists in the database
     * @param {object} sessionObject - The session object to check for
     */
    sessionExists(sessionObject: object) {
        console.log(this.sequelize.models[this.tableName])
    }

    /**
     * Saves a session to the database
     * @param {object} sessionObject - The session object to save
     */
    save(sessionObject: object) { }
    /**
     * Extracts a session from the database
     * @param {object} sessionObject - The session object to extract
     */
    extract(sessionObject: object) { }
    /**
     * Deletes a session from the database
     * @param {object} sessionObject - The session object to delete
     */
    delete(sessionObject: object) { }

    /**
    * Creates a table in your MariaDB database which is used to store sessions.
    * 
    * **Warning**: This will delete any existing table with the same name in the database
    */
    createSessionStoreTable(): void {
        this.sequelize.define(this.tableName, {
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

        this.sequelize.sync({
            force: true,
            logging: false
        })
        console.log(`Creating table ${this.tableName} done.`)
    }
}

export default MariaDBStore;
