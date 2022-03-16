import React, { useEffect } from 'react';
import SurfaceSdk from '@pipedrive/surface-sdk';

export const GlobalContext = React.createContext({});

export function GlobalContextProvider({ children }) {
    const [surfaceSdk, setSurfaceSdk] = React.useState();
    useEffect(() => {
            const initSdk = async () => {
                const sdk = await new SurfaceSdk().initialize({
            size: {height: 450},
        });

        setSurfaceSdk(sdk);
        }

        initSdk();
    }, [])

    return <GlobalContext.Provider value={{surfaceSdk}}>
        { children }
    </GlobalContext.Provider>;
}