import WWebRemoteStore from "./WWebRemoteStore.js";
import MariaDBStoreParameter from "./MariaDBStoreParameter.js";
import { SessionObject } from "./SessionObject.js";
import { Sequelize, DataTypes } from "sequelize";
import fs from 'fs';

export class MariaDBStore implements WWebRemoteStore {

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

        try {
            this.sequelize = new Sequelize({
                dialect: 'mariadb',
                host: params.host,
                database: params.database,
                username: params.username,
                password: params.password,
                port: params.port,
            });

            this.sequelize.authenticate({
                logging: false,
            });
        } catch (error) {
            throw new Error(`Failed to initialize Sequelize: ${error}`);
        }
    }

    /**
     * Checks if a session exists in the database
     * @param {object} sessionObject - The session object to check for
     */
    async sessionExists(sessionObject: SessionObject) {
        console.log('from sessionExists');
        console.log(sessionObject);
        const foundSession = await this.sequelize.models[this.tableName].findAndCountAll({
            logging: false,
            where: {
                session_name: sessionObject.session
            }
        })

        return foundSession.count > 0;
    }

    /**
     * Saves a session to the database
     * @param {object} sessionObject - The session object to save
     */
    async save(sessionObject: SessionObject) {
        console.log('from save');
        console.log(sessionObject);

        const fileBuffer = fs.readFileSync(sessionObject.session + '.zip')

        const [session, created] = await this.sequelize.models[this.tableName].findOrCreate({
            logging: false,
            where: {
                session_name: sessionObject.session
            },
            defaults: {
                session_name: sessionObject.session,
                data: fileBuffer
            }
        });

        if (created == false) {
            const affectedRows = await this.sequelize.models[this.tableName].update({
                session_name: sessionObject.session,
                data: fileBuffer
            }, {
                logging: false,
                where: {
                    session_name: sessionObject.session
                }
            })

            console.log(affectedRows);
        }
    }
    /**
     * Extracts a session from the database
     * @param {object} sessionObject - The session object to extract
     */
    async extract(sessionObject: SessionObject) {
        console.log('from extract');
        console.log(sessionObject);
        const foundSession = await this.sequelize.models[this.tableName].findOne({
            logging: false,
            where: {
                session_name: sessionObject.session
            }
        });

        if (foundSession != null) {
            fs.writeFileSync(sessionObject.path, foundSession.dataValues.data);
        }
    }
    /**
     * Deletes a session from the database
     * @param {object} sessionObject - The session object to delete
     */
    delete(sessionObject: SessionObject) {
        console.log('from delete');
        console.log(sessionObject);

        this.sequelize.models[this.tableName].destroy({
            logging: false,
            where: {
                session_name: sessionObject.session
            }
        });
    }

    /**
    * Creates a table in your MariaDB database which is used to store sessions, with the name in the `tableName` parameter, default is `wweb_sessions`.
    * 
    * @param {boolean} ignoreIfExists - If `true`, the table creation will be ignored if already exist.
    */
    createSessionStoreTable(ignoreIfExists: boolean = true): void {
        this.sequelize.define(this.tableName, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            session_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            data: {
                type: DataTypes.BLOB({
                    length: 'medium'
                }),
            },
        }, {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        })

        this.sequelize.sync({
            force: !ignoreIfExists,
            logging: false
        })
        console.log(`Sync for table ${this.tableName} schema is done.`)
    }
}