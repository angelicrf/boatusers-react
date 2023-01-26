import React, { useState, useEffect } from 'react';

let nextId = 0;
let newArray = [];

export default function StoreNameData({ buData }) {

    const [thisData, setThisData] = useState([]);

    useEffect(() => {
        console.log('renderd')

    }, [buData, thisData])


    return (
        <>
            <button onClick={() => {

                newArray.push({
                    id: nextId++,
                    name: buData,
                });
                setThisData([...newArray])
            }}>Add</button>
            <ul>
                {thisData.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
}