import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

const TodoListHeader = (props) => {

        return (
            <div className="todoList-header">
                <TodoListTitle title={props.title} id={props.id}/>
                <AddNewItemForm addItem={props.onTaskAdded}/>
            </div>
        );

}

export default TodoListHeader;

