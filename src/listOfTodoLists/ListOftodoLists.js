import React from 'react';
import {connect} from "react-redux"
import {delTodoListTC, onTodoListTitleChangedTC} from "../reducer";
import {useState, useEffect} from 'react';
import '../css/ListOfTodoLists.css'
import {CloseCircleOutlined} from "@ant-design/icons";

const ListOftodoLists = (props) => {

    const [editMode, setEditMode] = useState(false)

    const [todoListTitle, setTodoListTitle] = useState(props.title)
    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    const activateEditMode = () => {
        setEditMode(true)
    };

    const deactivateEditMode = () => {
        setEditMode(false)
        props.onTodoListTitleChanged(props.id, todoListTitle)
    };

    return (
        <div className="ListMain">
            <div className="List">
            <div className="Title">
                {editMode ? <input onBlur={deactivateEditMode}
                                   autoFocus={true}
                                   value={todoListTitle} onChange={e => setTodoListTitle(e.target.value)}/> :
                    <span onClick={activateEditMode}>
                   {props.title}</span>}
            </div>
                <CloseCircleOutlined style={{ fontSize: '1.7em', color: '#FF8C00'}} onClick={deleteTodolist}/>
            </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (todolistId) => {
            debugger
            const action = delTodoListTC (todolistId)
            dispatch(action)
        },
        onTodoListTitleChanged: (todolistId, todolistNewTitle) => {
            const action =  onTodoListTitleChangedTC (todolistId, todolistNewTitle)
            dispatch(action)
        }

    }
}

const ConnectedTListOftodoLists = connect(null, mapDispatchToProps) (ListOftodoLists)

export default ConnectedTListOftodoLists;
