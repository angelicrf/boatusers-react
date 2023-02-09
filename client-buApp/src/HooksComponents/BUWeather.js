import React, { useState, useMemo } from 'react'
import BUSpinner from '../FuncComponents/BUSpinner'
import UserName from "../FuncComponents/UserName"

export default function BUWeather() {


    return (
        (getUserName) ?
            <div>
                <UserName />
            </div>
            :
            <BUSpinner />
    );

}