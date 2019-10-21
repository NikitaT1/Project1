import React from 'react';
import './App.css';
import connect from "react-redux/lib/connect/connect";


class TodoListTitle extends React.Component {

    delTodoList = () => {
        this.props.delTodoList(this.props.id)
    }


    render = () => {


        return (
            <div>
                <h3 className="todoList-header__title">{this.props.title} <button onClick={this.delTodoList}>X</button>
                </h3>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delTodoList: (todolistId) => {
            const action = {
                type: "DEL-TODOLIST",
                todolistId: todolistId
            };
            dispatch(action)
        }
    }
}



const ConnectedTodoListTitle = connect(null, mapDispatchToProps) (TodoListTitle)

export default ConnectedTodoListTitle;

