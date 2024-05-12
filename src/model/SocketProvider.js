import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

export const SocketDataContext = React.createContext();
export const SocketProvider = ({ children }) => {
    const socket = io('ws://127.0.0.1:5000', {
        cors: {
            origin: '*',
        }
    });

    const [data,setData] = useState({});

    useEffect(() => {
        socket.on('update_data',newData=>{
            setData(newData);
        })
    }, [socket]);

    return (
        <SocketDataContext.Provider value={{data}}>
            {children}
        </SocketDataContext.Provider>
    );
};
