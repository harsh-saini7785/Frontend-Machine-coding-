import React, { useState, useCallback, useRef } from 'react';
import { forwardRef } from 'react';

const Alldata = ['Apple', 'Orange', 'Date', 'Banana', 'Guava']

import './TypeHead.css';

const debounce = (fn, delay = 1000) => {
    let time;
    let flag = true;
    return function (...args) {
        if (flag) {
            fn.apply(this, args);
            flag = false;
            return;
        }
        if (time) clearTimeout(time);
        time = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const Card = forwardRef(({ data }, ref) => {
    return (
        <div className='cardContainerr'>
            <ul>
                {data?.map((item, idx) => {
                    return <li className='item' key={idx}>{item}</li>
                })}
            </ul>
        </div>
    )
})

const TypeHead = () => {
    const [data, setData] = useState(Alldata);
    const inputRef = useRef();
    const [filteredData, setFilteredData] = useState([])
    console.log(data);

    const onChangeHandler = (e) => {
        const filterData = e.target.value ? data.filter((item) => item.toLocaleLowerCase().includes(e.target.value)) : []
        setFilteredData(filterData)
    }

    const handleInputWithDebounce = useCallback(debounce(onChangeHandler), [])


    return (
        <div className='parent'>
            <div className='container'>
                <div className='inputContainer'>
                    <input
                        ref={inputRef}
                        onChange={handleInputWithDebounce}
                        className='input'
                        type='text'
                        placeholder='enter value'
                    />
                </div>
                {!!filteredData?.length && <Card
                    data={filteredData}
                    ref={inputRef}
                />}

            </div>
        </div>
    )
}

export default TypeHead