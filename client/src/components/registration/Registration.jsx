import React, {useState} from 'react';
import './registration.scss';
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";


const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="registration">
                <div className="registration__header">Регистрация</div>
                <Input value = {email} setValue = {setEmail} type ='text' placeholder='Введите email'/>
                <Input value = {password} setValue = {setPassword} type ='password' placeholder='Введите password'/>
                <button className="registration__btn" onClick={() => registration(email, password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;

