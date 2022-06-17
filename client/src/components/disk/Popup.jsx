import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/files";
import Input from "../../utils/input/Input";

const Popup = () => {
    const [dirName, setDirName] = React.useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir )
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
        dispatch(setPopupDisplay('none'))
        setDirName('')
    }

    const handleClosePopup = () => {
            dispatch(setPopupDisplay('none'))
    }

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={handleClosePopup}>
            <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className='popup__close' onClick={handleClosePopup}>X</button>
                </div>
                <Input type="text" placeholder='Введите назвние папки' value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={createHandler}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;
