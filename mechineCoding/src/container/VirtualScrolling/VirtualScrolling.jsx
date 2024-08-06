import React, { useEffect, useState } from 'react'
import './VirtualScrolling.css'

const lists = Array.from({ length: 1000 }, (_, i) => i);
const height = 400;
const itemHeight = 50

const VirtualScrolling = () => {
    const [listIdx, setListIdx] = useState([0, Math.floor(height / itemHeight)]);

    const visibleList = lists.slice(listIdx[0], listIdx[1] + 4)

    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        const newStart = Math.floor(scrollTop / itemHeight);
        const newEnd = Math.floor(newStart + height / itemHeight)
        setListIdx([newStart, newEnd]);
    }

    return (
        <div className='container' onScroll={handleScroll}>
            <div style={{ height: itemHeight * lists.length, position: 'relative' }}>
                <ul>
                    {visibleList?.map((item, idx) => {
                        return <li
                            style={
                                {
                                    position: 'absolute',
                                    top: (listIdx[0]+idx) * itemHeight,
                                    width: '100%',
                                    textAlign: 'center'
                                }
                            } className='listitem'>
                            item{item}
                        </li>
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default VirtualScrolling