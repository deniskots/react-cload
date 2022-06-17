import React from 'react';
import './profile.scss';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))

    }

    return (
        <div className='profile'>
            <div className="profile__btns">
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className='disk__upload-label'>Загрузить аватар</label>
                    <input
                        type="file"
                        id='disk__upload-input'
                        className='disk__upload-input'
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <button className='profile__btn' onClick={() => dispatch(deleteAvatar())}></button>
            </div>

        </div>
    );
};

export default Profile;
