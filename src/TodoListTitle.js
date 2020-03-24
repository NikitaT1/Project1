import React from 'react';
import './App.css';
import {connect} from "react-redux"
import {delTodoListAC, delTodoListTC} from "./reducer";



const TodoListTitle = (props) => {


    const deleteTodolist = () => {
          props.deleteTodolist(props.id)
    }

        return (
            <div>
                <h3 className="todoList-header__title">{props.title} <button onClick={deleteTodolist}>X</button>
                </h3>

            </div>
        );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (todolistId) => {
            const action = delTodoListTC (todolistId)
            dispatch(action)
            }
        }
}



const ConnectedTodoListTitle = connect(null, mapDispatchToProps) (TodoListTitle)

export default ConnectedTodoListTitle;

