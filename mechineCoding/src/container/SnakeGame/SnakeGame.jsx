import { useState, useEffect, useRef } from "react";

import "./SnakeGame.css";


const arr = Array.from({ length: 15 }, () => new Array(15).fill(""));

export default function SnakeGame() {
  const [snakeGrid, setSnakeGrid] = useState([{ x: 5, y: 6 }]);

  const getRandom = () => {
    const x = Math.floor(Math.random() * 15);
    const y = Math.floor(Math.random() * 15);
    return [{ x, y }];
  };
  const [food, setFood] = useState(getRandom());
  const [time, setTime] = useState(1000);

  const directionRef = useRef({ x: 0, y: 1 });
  const score = useRef(0);

  const isMatch = (ri, ci) => {
    return snakeGrid.some((item) => item.x === ri && item.y === ci);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown" && directionRef.current.x !== -1) {
      directionRef.current = { x: 1, y: 0 };
    } else if (e.key === "ArrowUp" && directionRef.current.x !== 1) {
      directionRef.current = { x: -1, y: 0 };
    } else if (e.key === "ArrowLeft" && directionRef.current.y !== 1) {
      directionRef.current = { x: 0, y: -1 };
    } else if (e.key === "ArrowRight" && directionRef.current.y !== -1) {
      directionRef.current = { x: 0, y: 1 };
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSnakeGrid((prev) => {
        const newHead = {
          x: prev[0].x + directionRef.current.x,
          y: prev[0].y + directionRef.current.y,
        };
        const newGrid = prev?.map((snake) => ({ ...snake }));
        if (newHead.x === food[0].x && newHead.y === food[0].y) {
          setFood(getRandom());
          score.current += 1;
          if (score.current % 2 === 0) {
            setTime(time / 1.5);
            clearInterval(id);
          }
        } else {
          newGrid.pop();
        }
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x > 14 ||
          newHead.y > 14 ||
          newGrid?.some((item) => item.x === newHead.x && item.y === newHead.y)
        ) {
          setSnakeGrid([{ x: 5, y: 6 }]);
          score.current = 0;
          directionRef.current = { x: 0, y: 1 };
          setTime(1000);
        }
        newGrid.unshift(newHead);
        return newGrid;
      });
    }, time);

    return () => clearInterval(id);
  }, [food, time]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className="container">
        {arr?.map((row, ri) =>
          row?.map((col, ci) => {
            return (
              <div
                key={ci}
                className={`cell ${isMatch(ri, ci) ? "snake" : " "} 
                ${food.some((item) => item.x === ri && item.y === ci)
                    ? "food"
                    : " "
                  }
              `}
              ></div>
            );
          })
        )}
      </div>
      <h2>Score {score.current}</h2>
    </div>
  );
}
