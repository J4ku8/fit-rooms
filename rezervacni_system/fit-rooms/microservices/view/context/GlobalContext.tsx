// RoomContext.tsx
import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {useTheme} from "@mui/material";

interface GlobalContextProps {
    isRoomFree: boolean;
    setRoomStatus: (isFree: boolean) => void;
    color: string;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalContextProviderProps {
    children: ReactNode;
}
export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const theme = useTheme()
    const [isRoomFree, setIsRoomFree] = useState(true);
    const [color, setColor] = useState(theme.palette.success.light)

    useEffect(() => {
        if(isRoomFree){
            setColor(theme.palette.success.light)
        }else {
            setColor(theme.palette.error.light)
        }
    }, [isRoomFree]);

    const setRoomStatus = (isFree: boolean) => {
        setIsRoomFree(isFree);
    };

    return (
        <GlobalContext.Provider value={{ isRoomFree, setRoomStatus, color }}>
    {children}
    </GlobalContext.Provider>
);
};


export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a RoomProvider');
    }
    return context;
};
