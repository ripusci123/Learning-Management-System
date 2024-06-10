import React, { useRef, useState } from 'react'
import { useInterval } from "react-unique-hooks";

function AutoIncrement({ to = 1, time = 10, suffix, subtext }) {
    const step = to / 100;
    const [count, setCount] = useState(0);

    const { stop } = useInterval(() => {
        if (to <= count) return stop();
        setCount(count + step);
    }, time)

    const divRef = useRef(null);

    return (
        <div ref={divRef}>
            <h1 className='text-4xl font-semibold min-w-[120px]'>{count.toFixed(1)}{suffix}</h1>
            <p className='text-gray-600 text-sm'>{subtext}</p>
        </div>
    )
}

export default AutoIncrement