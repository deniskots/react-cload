import React, {useEffect} from 'react';
import './disk.scss'
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/files";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay, setViewAction} from "../../reducers/fileReducer";
import Uploader from "./fileList/uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const loader = useSelector(state => state.app.loader);
    const [dragEnter, setDragEnter] = React.useState(false)
    const [sort, setSort] = React.useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort]);

    function showPopupDisplay() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))

    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true)

    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    if (loader) {
        return (
            <div className='loader'>
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }


    return (!dragEnter ?
            <div
                className='disk'
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}>
                <div className="disk__btns">
                    <div className="disk__btns-left">
                        <div className="disk__upload">
                            <label htmlFor="disk__upload-input" className='disk__upload-label'>Загрузить файл</label>
                            <input
                                type="file"
                                id='disk__upload-input'
                                className='disk__upload-input'
                                onChange={(event) => fileUploadHandler(event)}
                            />
                        </div>
                        <button className='disk__create' onClick={() => showPopupDisplay()}/>
                        <button className='disk__back' onClick={() => backClickHandler()}/>
                    </div>
                    <div className="disk__btns-right">
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk__select'>
                            <option value="name">По имени</option>
                            <option value="type">По типу</option>
                            <option value="date">По дате</option>
                        </select>
                        <button className="disk__plate" onClick={() => dispatch(setViewAction('plate'))}></button>
                        <button className="disk__list" onClick={() => dispatch(setViewAction('list'))}></button>
                    </div>
                </div>
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div
                className='drop-area'
                onDrop={dropHandler}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}>
                Переместите файлы в это поле
            </div>
    );
};

export default Disk;