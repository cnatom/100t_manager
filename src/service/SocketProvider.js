import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

export const SocketDataContext = React.createContext();
export const SocketProvider = ({ children }) => {

    const [data,setData] = useState({});

    useEffect(() => {
        const socket = io('ws://127.0.0.1:5000', {
            cors: {
                origin: '*',
            }
        });

        socket.on('update_data',newData=>{
            setData(newData);
        })
        return () => {
            socket.disconnect();
        };
    }, []); // 移除socket从依赖数组

    return (
        <SocketDataContext.Provider value={{data}}>
            {children}
        </SocketDataContext.Provider>
    );
};
