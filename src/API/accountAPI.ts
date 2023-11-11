import axios, {AxiosResponse} from 'axios';
import {useMutation, UseMutationResult, useQuery} from '@tanstack/react-query';
import {useContext} from 'react';
import {AccountContext} from '../context/accountContext';
import {Transaction} from '../models/ITransaction';

const client = axios.create({
    baseURL: 'http://localhost:8080/'
})

//mutations
export const useTransactionsByAccountId = (accountId: string) => {
    return useQuery(['transactions', accountId], () => getTransactionsByAccountId({accountId}));
};
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

export const useCheckAccount = (): UseMutationResult<{ email: string; password: string }, Error, AxiosResponse<Account>> => {
    const {handleIsLoggedIn,handleUsername,handleEmail,handleId} = useContext(AccountContext)
    return useMutation(checkAccount, {
        onSuccess: (data) => {
            handleIsLoggedIn(true)
            handleUsername(data.data.username)
            handleEmail(data.data.email)
            handleId(data.data.id)
        },
        onError: (error) => {
            throw error;
        },
    });
};


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


const getTransactionsByAccountId = async ({ accountId }: { accountId: string }): Promise<AxiosResponse<Transaction[]>> => {
    try {
        const response = await client.get(`/transactions/account/${accountId}`);
        return response.data.transactions;
    } catch (error) {
        throw error;
    }
};

const checkAccount = async ({ email, password }: { email: string; password: string }): Promise<AxiosResponse<Account>> => {
    try {
        const { data } = await client.post('check-account', { email, password });
        return data;
    } catch (error) {
        throw error;
    }
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

