import React, { useState, useEffect } from 'react';

export default function BUWeather() {

    const [count, setCount] = useState(0);
    useEffect(() => { }, [])

    return (
        <div>
            <p bg="danger">You clicked {count} times</p>
            <button className='btn btn-info' onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}