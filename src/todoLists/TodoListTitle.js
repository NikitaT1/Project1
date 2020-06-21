import React, {useState, useEffect} from 'react';
import {connect} from "react-redux"
import {delTodoListTC} from "../reducer";
import {onTodoListTitleChangedTC} from "../reducer";
import TodoList from "../css/TodoList.css"
import 'antd/dist/antd.css';
import { CloseCircleOutlined } from '@ant-design/icons'



const TodoListTitle = (props) => {

    const [editMode, setEditMode] = useState(false)

    const [todoListTitle, setTodoListTitle] = useState(props.title)

    // state = {
    //     editMode: false,
    //     taskTitle: this.props.task.title
    // };

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
            <div className="todoListHeader">
                <div id="todolistDelButton">
                    <CloseCircleOutlined style={{ fontSize: '1.7em', color: '#FF8C00' }} onClick={deleteTodolist}/>
                </div>
                {editMode ? <input onBlur={deactivateEditMode}
                                   autoFocus={true}
                                   value={todoListTitle} onChange={e => setTodoListTitle(e.target.value)}/> :
                    <span onClick={activateEditMode}>
                   {props.title}</span>}
            </div>
        );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (todolistId) => {
            const action = delTodoListTC (todolistId)
            dispatch(action)
            },
        onTodoListTitleChanged: (todolistId, todolistNewTitle) => {
            const action =  onTodoListTitleChangedTC (todolistId, todolistNewTitle)
            dispatch(action)
        }
        }
}



const ConnectedTodoListTitle = connect(null, mapDispatchToProps) (TodoListTitle)

export default ConnectedTodoListTitle;

