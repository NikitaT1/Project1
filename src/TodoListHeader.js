import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

class TodoListHeader extends React.Component {


    render = () => {



        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <TodoListTitle/>
            </div>
        );
    }
}

export default TodoListHeader;

