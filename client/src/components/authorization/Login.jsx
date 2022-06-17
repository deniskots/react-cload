import React, {useState} from 'react';
import './auth.scss';
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className="auth">
                <div className="auth__header">Авторизация</div>
                <Input value = {email} setValue = {setEmail} type ='text' placeholder='Введите email'/>
                <Input value = {password} setValue = {setPassword} type ='password' placeholder='Введите password'/>
                <button className="auth__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Login;

