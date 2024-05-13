import React, { useEffect, useState } from 'react'
import Square from '../../components/Square'
import { styles } from './BoardStyles'

const arr = new Array(9).fill(null);
const values = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const Board = () => {
    const [data, setData] = useState(arr);
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState('');
    const [isDraw, setIsDraw] = useState(false);

    const onClickHandler = (idx) => {
        if(data[idx]) return;
        const newArray = [...data];
        isXTurn ? newArray[idx] = 'x' : newArray[idx] = '0';
        setData(newArray);
        setIsXTurn(prev => !prev);
    }

    const isWinner = () => {
        values.map(item => {
            const [a, b, c] = item;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setWinner(data[a]);
                return true;
            }
        })
    }

    const isAllBoxesFilled = () => {
        return data.every(item => item);
    }

    const playAgainHandler = () => {
        setData(arr);
        setWinner('');
        setIsDraw(false)
    }

    useEffect(() => {
        console.log(isAllBoxesFilled(), 'isAllBoxesFilled');
        isWinner();
        if (!isWinner() && isAllBoxesFilled()) {
            setIsDraw(true);
        }
    }, [data])

    return (
        winner ?
            <div style={styles.messageContainer}>
                <h1>{`${winner} won the game`}</h1>
                <button style={styles.playAgainButton} onClick={playAgainHandler}>Play again</button>
            </div>
            :
            isDraw
                ?
                <div style={styles.messageContainer}>
                    <h1>No Winner</h1>
                    <button style={styles.playAgainButton} onClick={playAgainHandler}>Play again</button>
                </div>
                : <div style={styles.boardContainer}>
                    <div style={styles.row}>
                        <Square onClick={() => onClickHandler(0)} value={data[0]} />
                        <Square onClick={() => onClickHandler(1)} value={data[1]} />
                        <Square onClick={() => onClickHandler(2)} value={data[2]} />
                    </div>
                    <div style={styles.row}>
                        <Square onClick={() => onClickHandler(3)} value={data[3]} />
                        <Square onClick={() => onClickHandler(4)} value={data[4]} />
                        <Square onClick={() => onClickHandler(5)} value={data[5]} />
                    </div>
                    <div style={styles.row}>
                        <Square onClick={() => onClickHandler(6)} value={data[6]} />
                        <Square onClick={() => onClickHandler(7)} value={data[7]} />
                        <Square onClick={() => onClickHandler(8)} value={data[8]} />
                    </div>
                </div>

    )
}

export default Board