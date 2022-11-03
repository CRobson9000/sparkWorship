import { ref } from "firebase/storage";

function storageRef(storage, path) {
    return ref(storage, path);
}

export { storageRef }