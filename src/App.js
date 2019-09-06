import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    tasks = [
        {title: "JS", isDone: true, priority: "priority: hi"},
        {title: "React", isDone: true, priority: "priority: hi"},
        {title: "HTML", isDone: true, priority: "priority: hi"},
        {title: "CSS", isDone: true, priority: "priority: hi"},
    ];

    filterValue="Completed";

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

