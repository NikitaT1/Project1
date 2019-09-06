import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    render = () => {
        let tasks = [
            {title: "JS", isDone: true},
            {title: "React", isDone: true},
            {title: "HTML", isDone: true},
            {title: "CSS", isDone: true},
        ]
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader tasks={tasks}/>
                    <TodoListTasks tasks={tasks}/>
                    <TodoListFooter tasks={tasks}/>
                </div>
            </div>
        );
    }
}

export default App;

