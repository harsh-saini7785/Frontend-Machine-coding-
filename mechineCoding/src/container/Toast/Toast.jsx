import React, { useEffect, useState } from 'react'
import { styles } from './ToastStyle'


const CustomToast = ({ text, onClose, id }) => {
    const [timeCount, setTimeCount] = useState(10);

    useEffect(() => {
        const timeId = setInterval(() => {
            setTimeCount(prev => {
                if (prev <= 0) {
                    clearInterval(timeId)
                    onClose(id)
                }
                else return prev - 1;
            });

            return (() => {
                clearInterval(timeId)
            })
        }, 1000)

    }, [])

    return (
        <div style={styles.customToast}>
            <p>{text} {timeCount}</p>
            <p style={styles.cross} onClick={() => onClose(id)}>X</p>
        </div>
    )
}

const Toast = () => {
    const [toasts, setToasts] = useState([]);
    const onAddToast = () => {
        setToasts((prev) => [...prev, { id: Date.now().toString(), text: 'I am toast', visible: true }])
    }

    const onClose = (id) => {
        // need to update using prev for accssing latest state
        setToasts((prevToast)=> prevToast.filter((item)=> item.id !== id));
    }


    return (
        <div>
            <button style={styles.showToastButton} onClick={onAddToast}>show Toast</button>
            <div style={styles.customToastContainer}>
                {toasts?.map((item, idx) =>
                    <CustomToast
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        onClose={onClose}
                        visible={item.visible}
                        toasts={toasts}
                        setToasts={setToasts}
                    />)
                }
            </div>
        </div>
    )
}

export default Toast