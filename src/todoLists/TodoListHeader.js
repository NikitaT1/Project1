import React from 'react';
import '../css/TodoList.css';
import AddNewItemFormFunction from "../AddNewItemFormFunction";
import TodoListTitle from "./TodoListTitle";

const TodoListHeader = (props) => {

        return (
            <div>
                <TodoListTitle title={props.title} id={props.id}/>
                <AddNewItemFormFunction addItem={props.onTaskAdded}/>
            </div>
        );

}

export default TodoListHeader;

