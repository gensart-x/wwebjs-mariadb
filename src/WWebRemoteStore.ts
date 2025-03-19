interface WWebRemoteStore {
    sessionExists: (obj: object) => void;
    save: (obj: object) => void;
    extract: (obj: object) => void;
    delete: (obj: object) => void;
}

export default WWebRemoteStore;