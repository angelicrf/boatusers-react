import React, { useState, useEffect, useCallback } from 'react'

let nextId = 0;

export default function StoreNameData() {

    const [thisData, setThisData] = useState([]);
    const [thisInputValue, setThisInputValue] = useState('')

    const addData = useCallback((event) => {
        event.preventDefault();
        setThisData(prevData => [
            ...prevData,
            {
                id: nextId++,
                name: thisInputValue,
            }
        ])
    })
    const handleOnChangeValue = (event) => {
        event.persist();
        setThisInputValue(event.target.value)
    }

    return (
        <>
            <div className='container bg-light col-md-6 col-md-offset-6'>
                <form className='mt-3 needs-validation' onSubmit={addData}>
                    <label>
                        Name:
                    </label><br />
                    <div className='row d-flex justify-content-center'>
                        <input className='col-md-6' type="text" value={thisInputValue} onChange={handleOnChangeValue} required />
                    </div>
                    <div className='row d-flex justify-content-center mt-2'><input className='btn btn-danger col-md-4' type="submit" value="Submit" /></div>

                </form>
                <ul>
                    {thisData.map((item, index) => (
                        <li key={index}>
                            {
                                (item) ?
                                    <div>
                                        {item.name}
                                    </div>
                                    : null
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}