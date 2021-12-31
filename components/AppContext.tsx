import React, { useContext } from 'react'



interface AppContext extends Record<string, any> {

}
const Context = React.createContext<AppContext>({

});


export const useAppContext = () => {
    return useContext(Context);
}


export interface AppContextProviderProps {
    children?: React.ReactNode
}
export function AppContextProvider(props: AppContextProviderProps) {
    const { children, ...restProps } = props;
    return (
        <Context.Provider value={restProps}>
            { children }
        </Context.Provider>
    );
}