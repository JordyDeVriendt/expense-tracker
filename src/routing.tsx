import {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/login/signup';

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<Signup/>}/>
        </Routes>
    );
};

export default Routing;
