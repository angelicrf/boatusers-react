import React, { createContext } from 'react';
import NameCmpt from '../FuncComponents/NameCmpt';


const storeData = {
    appName: "BoatUsers",
    appInfo: "ReactApp"
}
const BUStoreData = createContext(storeData);

export default function BUItems() {
    return (
        <div>
            <BUStoreData.Provider value={storeData}>
                <NameCmpt />
            </BUStoreData.Provider>
        </div>
    );
}
export { BUStoreData };