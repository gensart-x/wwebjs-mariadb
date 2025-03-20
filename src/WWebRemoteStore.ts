import { SessionObject } from "./SessionObject.js";

interface WWebRemoteStore {
    sessionExists: (sessionObject: SessionObject) => void;
    save: (sessionObject: SessionObject) => void;
    extract: (sessionObject: SessionObject) => void;
    delete: (sessionObject: SessionObject) => void;
}

export default WWebRemoteStore;