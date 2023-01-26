import React, { useState, useEffect } from 'react';
import BUSpinner from '../FuncComponents/BUSpinner'

export default function BUWeather({ name }) {


    const [count, setCount] = useState(0);
    const [thisName, setThisName] = useState(name);

    useEffect(() => { setThisName(name) }, [name])


    if (name)
        return (
            <div>
                <p bg="danger">You clicked from weather {count} time firstName {name} and thisnNameName {thisName}</p>
                <button className='btn btn-info' onClick={() => {
                    setCount(count + 1);
                }}>
                    Click me
                </button>
            </div>
        );
    else
        return (
            <div>
                <div>No Data</div>
                <BUSpinner />
            </div>)
}