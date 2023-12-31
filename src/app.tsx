import {FunctionComponent, Suspense, useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routing from './routing';
import NavbarBootstrap from './navbarBootstrap';
import {Container} from 'react-bootstrap';
import {AccountContext} from './context/accountContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
interface AppProps {

}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: import.meta.env.PROD,
        },
    },
})

const App: FunctionComponent<AppProps> = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [id, setId] = useState<string | undefined>(undefined)
    const handleIsLoggedIn = (value:boolean) => {
        setIsLoggedIn(value)
    }
    const handleUsername = (newUsername:string) => {
        setUsername(newUsername)
    }
    const handleEmail = (newEmail:string) => {
        setEmail(newEmail)
    }
    const handleId = (newEmail:string) => {
        setEmail(newEmail)
    }
    return (
        <BrowserRouter>
            <AccountContext.Provider value={{isLoggedIn,username,email,id,handleIsLoggedIn,handleUsername,handleEmail,handleId}}>
                <QueryClientProvider client={queryClient}>
                    <NavbarBootstrap/>
                    <Container>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routing/>
                        </Suspense>
                    </Container>
                </QueryClientProvider>
            </AccountContext.Provider>
        </BrowserRouter>
    );
};

export default App;
