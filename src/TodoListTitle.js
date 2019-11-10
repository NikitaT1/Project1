import React from 'react';
import './App.css';
import connect from "react-redux/lib/connect/connect";
import {delTodoListAC} from "./reducer";
import axios from "axios"


class TodoListTitle extends React.Component {


    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"}})
            .then((res) => {
                this.props.deleteTodolist(this.props.id)
            })
    }


    render = () => {


        return (
            <div>
                <h3 className="todoList-header__title">{this.props.title} <button onClick={this.deleteTodolist}>X</button>
                </h3>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (todolistId) => {
            const action = delTodoListAC (todolistId)
            dispatch(action)
            }
        }

}



const ConnectedTodoListTitle = connect(null, mapDispatchToProps) (TodoListTitle)

export default ConnectedTodoListTitle;

