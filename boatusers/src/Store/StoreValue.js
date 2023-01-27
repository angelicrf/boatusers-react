import { createContext } from 'react';


const boatClass = {
    buAppName: "BoatUsers"
}

Object.defineProperty(boatClass, "getName", {
    get: function () {
        return this.buAppName;
    }
});
Object.defineProperty(boatClass, "changeName", {
    set: function (value) {
        this.buAppName = value;
    }
});

export const storeData = {
    appName: () => { return boatClass.getName },
    setAppName: (thisName) => { return boatClass.changeName = thisName }
}
export const StoreValue = createContext(storeData)

