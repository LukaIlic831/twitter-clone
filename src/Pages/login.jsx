import React from 'react';
import LoginImage from '../components/loginImage';
import Logininfo from '../components/logininfo';

const Login = () => {
    return (
        <div className='login__wrapper'>
            <div className="login__block1">
                <LoginImage />
            </div>
            <div className="login__block2">
                <Logininfo />
            </div>
        </div>
    );
}

export default Login;
