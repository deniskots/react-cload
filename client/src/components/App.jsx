import React, {useEffect} from "react";
import './app.scss';
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth ?
                        <Routes>
                            <Route path="/registration" element={<Registration/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="*" element={<Navigate to="/login" replace />}/>
                        </Routes>
                        :
                        <Routes>
                            <Route exact path="/" element={<Disk/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                            <Route path="*" element={<Navigate to="/" replace />}/>
                        </Routes>
                    }

                </div>

            </div>
        </BrowserRouter>

    );
}

export default App;
