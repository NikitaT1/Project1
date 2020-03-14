import React from 'react';
import './App.css';
import {connect} from "react-redux"
import {delTodoListAC, delTodoListTC} from "./reducer";



class TodoListTitle extends React.Component {


    deleteTodolist = () => {
          this.props.deleteTodolist(this.props.id)
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
            const action = delTodoListTC (todolistId)
            dispatch(action)
            }
        }
}



const ConnectedTodoListTitle = connect(null, mapDispatchToProps) (TodoListTitle)

export default ConnectedTodoListTitle;

