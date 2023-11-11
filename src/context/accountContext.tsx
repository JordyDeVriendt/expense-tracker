import {createContext} from 'react';

interface IAccountContext {
    isLoggedIn: boolean | undefined
    username: string | undefined
    email: string | undefined
    id: string | undefined
    handleIsLoggedIn: (value:boolean) => void
    handleUsername: (newUsername:string) => void
    handleEmail: (newEmail:string) => void
    handleId: (newEmail:string) => void
}

export const AccountContext = createContext<IAccountContext> ({
    isLoggedIn: undefined,
    username: undefined,
    email: undefined,
    id: undefined,
    handleIsLoggedIn: (): void => {
        console.warn('An implementation for this method has not been provided.')
    },
    handleUsername: (): void => {
        console.warn('An implementation for this method has not been provided.')
    },
    handleEmail: (): void => {
        console.warn('An implementation for this method has not been provided.')
    },
    handleId: (): void => {
        console.warn('An implementation for this method has not been provided.')
    },
})
