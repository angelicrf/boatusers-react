import BUNavBar from '../FuncComponents/BUNavBar'
import StoreNameData from '../HooksComponents/StoreNameData'
import React from 'react'
import UserName from '../FuncComponents/UserName'

export default function About() {

    return (
        <div >
            <header>
                <title>About</title>
            </header>
            <BUNavBar />
            <div>About</div>
            <UserName />
            <StoreNameData />
        </div>
    );
}