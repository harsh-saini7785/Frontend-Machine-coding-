import React from 'react';
import { useState } from 'react';

import "./StarRating.css";


const StarRating = ({ count = 10 }) => {
    const arr = new Array(count).fill(0);
    const [starCount, setStarCount] = useState(0);
    const [starCountHover, setStarCountHover] = useState(0);
    return (
        <div className="container">
            <div>
                {arr?.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => setStarCount(idx + 1)}
                        className={
                            (!starCountHover && idx < starCount) || starCountHover > idx
                                ? "star gold"
                                : "star"
                        }
                        onMouseEnter={() => setStarCountHover(idx + 1)}
                        onMouseLeave={() => {
                            setStarCountHover(0);
                        }}
                    >
                        &#9733;
                    </span>
                ))}
            </div>
            <div><span className='result'>{starCount}/{count}</span></div>
        </div>
    );
}

export default StarRating