import React, { useState, useEffect } from 'react';

export default function BUAutomation() {

    const [count, setCount] = useState(0);

    useEffect(() => { }, [count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}