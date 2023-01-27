import React, { useState } from 'react';
import NameCmpt from '../FuncComponents/NameCmpt';
import { StoreValue, storeData } from '../Store/StoreValue';

export default function BUItems() {

    //const [appName, setAppName] = useState('')

    const value = storeData

    return (
        <div>
            <StoreValue.Provider value={value}>
                <NameCmpt />
            </StoreValue.Provider>
        </div>
    );
}
