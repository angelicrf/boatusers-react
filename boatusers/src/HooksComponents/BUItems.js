import React, { createContext } from 'react';
import NameCmpt from '../FuncComponents/NameCmpt';

const Name = createContext();

export default function BUItems() {
    return (
        <div>
            <Name.Provider value={'BoatUers'}>
                <NameCmpt />
            </Name.Provider>
        </div>
    );
}
export { Name };