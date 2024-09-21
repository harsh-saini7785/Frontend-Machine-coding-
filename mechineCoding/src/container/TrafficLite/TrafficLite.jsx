import { useEffect, useState, useRef } from "react";

export default function TrafficLite() {
    const trafficLite = {
        red: {
            next: "yellow",
            time: "2",
        },
        yellow: {
            next: "green",
            time: "5",
        },
        green: {
            next: "red",
            time: "3",
        },
    };
    const [activeLight, setActiveLight] = useState("red");
    const [time, setTime] = useState(trafficLite["red"].time);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    setActiveLight(trafficLite[activeLight].next);
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [time, activeLight]);

    useEffect(() => {
        setTime(trafficLite[activeLight].time);
    }, [activeLight]);

    const handleButtonClick = (color) => {
        setActiveLight(color);
    };

    const keyHandler = (e) => {
        if (e.key === "Enter") {
            setTime((prev) => +prev + +e.target.value);
        }
    };

    return (
        <div className="App">
            <h1 style={{ textAlign: 'center' }}>Lights</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: "10px",
                }}
            >
                <h3>Enter Delay</h3>
                <input
                    style={{ padding: '6px' }}
                    onKeyUp={keyHandler}
                    type="number"
                    placeholder="please enter delay"
                />
            </div>
            <div
                style={{
                    marginBottom: "10px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                }}
            >
                <button style={{ padding: '6px', cursor: 'pointer' }} onClick={() => handleButtonClick("red")}>Red</button>
                <button style={{ padding: '6px', cursor: 'pointer' }} onClick={() => handleButtonClick("yellow")}>Yellow</button>
                <button style={{ padding: '6px', cursor: 'pointer' }} onClick={() => handleButtonClick("green")}>Green</button>
            </div>
            <div
                style={{
                    backgroundColor: "black",
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "10px",
                    margin: "auto",
                }}
            >
                <div
                    style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...(activeLight === "red"
                            ? { backgroundColor: "red" }
                            : { backgroundColor: "white" }),
                    }}
                >
                    {activeLight === "red" && <h2>{time}</h2>}
                </div>
                <div
                    style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        ...(activeLight === "yellow"
                            ? { backgroundColor: "yellow" }
                            : { backgroundColor: "white" }),
                    }}
                >
                    {activeLight === "yellow" && <h2>{time}</h2>}
                </div>
                <div
                    style={{
                        height: "40px",
                        width: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "1px solid black",
                        backgroundColor: "white",
                        ...(activeLight === "green"
                            ? { backgroundColor: "green" }
                            : { backgroundColor: "white" }),
                    }}
                >
                    {activeLight === "green" && <h2>{time}</h2>}
                </div>
            </div>
        </div>
    );
}
