import axios, {AxiosResponse} from 'axios';
import {useMutation,UseMutationResult} from '@tanstack/react-query'
import {useContext} from 'react';
import {AccountContext} from '../context/accountContext';

const client = axios.create({
    baseURL: 'http://localhost:8080/'
})

//mutations
export const useCreateAccount = (): UseMutationResult<CreateAccountParams,Error,void> => {
    const {handleIsLoggedIn,handleUsername,handleEmail,handleId} = useContext(AccountContext)
    return useMutation(createAccount, {
        onSuccess: (data) => {
            handleIsLoggedIn(true)
            handleUsername(data.data.username)
            handleEmail(data.data.email)
            handleId(data.data.id)
        },
        onError: (error) => {
            console.error('Error creating account:', error.message);
        },
    })
}


//api calls
interface Account {
    id: string;
    username: string;
    email: string;
    password: string;
}

const getAccounts = async (): Promise<Account[]> => {
    const { data } = await client.get('accounts');
    return data;
};

interface CreateAccountParams {
    username: string;
    email: string;
    password: string;
}

const createAccount = async ({username, email, password}:CreateAccountParams): Promise<AxiosResponse<Account>> => {
    try {
        const { data } = await client.post(`/accounts/${username}/${email}/${password}`);
        return data;
    } catch (error) {
        throw error;
    }
};

