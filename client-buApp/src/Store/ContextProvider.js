import { createContext, useState } from 'react';
import { useContext } from 'react';
import React, { Component } from 'react';

export const LoginContext = createContext(null);

export default function ContextProvider({ children }) {

    const [appName, setAppName] = useState('')
    let value = { appName, changeName: (thisname) => { setAppName(thisname) } }

    return (
        <>
            <LoginContext.Provider value={value}>
                {children}
            </LoginContext.Provider>
        </>
    );
}
export const BUContext = () => {
    return useContext(LoginContext);
}