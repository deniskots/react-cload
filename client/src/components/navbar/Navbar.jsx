import React from 'react';
import './navbar.scss'
import Logo from '../../assets/img/icons8-logo-30.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/files";
import {showLoader} from "../../reducers/appReducer";
import avaLogo from '../../assets/img/carbon_user-avatar-filled.svg';
import {API_URL} from "../../config";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currenDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const [searchName, setSearchName] = React.useState('');
    const [searchTimeout, setSearchTimeout] = React.useState(false);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avaLogo;

    function searchChangeHandler(e) {
            setSearchName(e.target.value)
        if(searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        }else {
          dispatch(getFiles(currenDir))
        }

    }

    return (
        <div className='navbar'>
            <div className="container">
                <NavLink to='/'>
                    <img src={Logo} alt="logo" className='navbar__logo'/>
                </NavLink>
                <div className="navbar__header">React cloud</div>
                {isAuth && <input
                    value={searchName}
                    onChange={(e) => searchChangeHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder='Поиск...'
                />}

                {!isAuth && <div className="navbar__login"><NavLink to='/login'>Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to='/registration'>Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Выход</div>}
                {isAuth && <NavLink to='/profile'>
                    <img className='navbar__ava' src={avatar} alt="avatar"/>
                </NavLink>
                }
            </div>

        </div>
    );
};

export default Navbar;