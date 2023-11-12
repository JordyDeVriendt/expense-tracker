import axios, {AxiosResponse} from 'axios';
import {useMutation, UseMutationResult, useQuery, useQueryClient} from '@tanstack/react-query';
import {useContext} from 'react';
import {AccountContext} from '../context/accountContext';
import {Transaction} from '../models/ITransaction';

const client = axios.create({
    baseURL: 'http://localhost:8080/'
})

//mutations
export const useTransactionsByAccountId = (accountId: string) => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => await getTransactionsByAccountId({accountId})
    })
};
export const useCreateAccount = (): UseMutationResult<AxiosResponse<Account>,Error,CreateAccountParams> => {
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

export const useCheckAccount = (): UseMutationResult<AxiosResponse<Account>, Error, { email: string; password: string }> => {
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

export const useCreateTransaction = (): UseMutationResult<AxiosResponse<Transaction>, Error, CreateTransactionParams> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createTransaction,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['transactions']})
    })
}
export const useDeleteTransaction = (): UseMutationResult<AxiosResponse<Transaction>, Error, DeleteTransactionParams> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['transactions']})
    })
}

export const useUpdateTransaction = (): UseMutationResult<AxiosResponse<Transaction>, Error, UpdateTransactionParams> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateTransaction,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['transactions']})
    })
}

//api calls
interface Account {
    id: string;
    username: string;
    email: string;
    password: string;
}

const getTransactionsByAccountId = async ({ accountId }: { accountId: string }): Promise<AxiosResponse<Transaction[]>> => {
    const response = await client.get(`/transactions/account/${accountId}`);
    return response.data.transactions
};

const checkAccount = async ({ email, password }: { email: string; password: string }): Promise<AxiosResponse<Account>> => {
    const {data} = await client.post('check-account', { email, password });
    return data
};

interface CreateAccountParams {
    username: string;
    email: string;
    password: string;
}

const createAccount = async ({username, email, password}:CreateAccountParams): Promise<AxiosResponse<Account>> => {
    const {data} = await client.post(`/accounts/${username}/${email}/${password}`);
    return data
};

interface CreateTransactionParams {
    name:string
    amount:string
    accountId:string
}
interface Transaction {
    id:string
    name:string
    amount:string
    accountId:string
    date:Date
}
const createTransaction = async ({name,amount,accountId}: CreateTransactionParams): Promise <AxiosResponse<Transaction>> => {
    const {data} = await client.post(`/transactions-create/${name}/${amount}/${accountId}`);
    return data
}
interface DeleteTransactionParams {
    id:string
}
const deleteTransaction = async ({id}:DeleteTransactionParams): Promise <AxiosResponse<Transaction>> => {
    const {data} = await client.delete(`/transactions-delete/${id}`)
    return data
}

interface UpdateTransactionParams {
    id:string
    name:string
    amount:string
}

const updateTransaction = async ({id,name,amount}: UpdateTransactionParams): Promise <AxiosResponse<Transaction>> => {
    const {data} = await client.put(`/transactions-update/${id}/${name}/${amount}`)
    return data
}
