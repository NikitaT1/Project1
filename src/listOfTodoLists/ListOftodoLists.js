import React from 'react';
import {connect} from "react-redux"
import {delTodoListTC} from "../reducer";
import '../css/ListOfTodoLists.css'

const ListOftodoLists = (props) => {
    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    return (
        <div className="ListMain">
            <div className="List">
            <div className="Title">{props.title}</div>
            <button id="buttonDel" onClick={deleteTodolist}>X</button>
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
        }
    }
}

const ConnectedTListOftodoLists = connect(null, mapDispatchToProps) (ListOftodoLists)

export default ConnectedTListOftodoLists;
