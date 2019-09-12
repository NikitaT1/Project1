import React from 'react';
import './App.css';
/*import TodoListHeader from "./TodoListHeader";*/
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";

class App extends React.Component {

    constructor (props) {
        super (props);
    }

    nextTaskId = 4;

    state = {
        tasks: [
            {id: 0, title: "JS", isDone: true, priority: "priority: hi"},
            {id: 1, title: "React", isDone: true, priority: "priority: hi"},
            {id: 2, title: "HTML", isDone: true, priority: "priority: hi"},
            {id: 3, title: "CSS", isDone: false, priority: "priority: hi"},
        ],
    filterValue: "All"
}

addTask = (newText) => {
        let newTask = {
        id: this.nextTaskId,
        title: newText,
        isDone: true,
        priority: "priority hi"
    };
    this.nextTaskId++;
    let newTasks = [...this.state.tasks, newTask];
    this.setState ( {
        tasks: newTasks
    })
};
    changeFilter = (newFilterValue) => {
        this.setState( {filterValue: newFilterValue})
    };

    changeTask = (taskId, object) => {
        let newTasks = this.state.tasks.map (t=> {
            if (t.id == taskId) {
                return {...t, ...object};
            }
            else {
                return t
            }
        });
        this.setState ({
            tasks:newTasks
        })
    };

    changeStatus = (taskId, isDone) => {
        let object = {isDone: isDone};
        this.changeTask (taskId, object)
    };

    /*changeTitle = (taskId, title) => {
        this.changeTask (taskId, {title: title})
    };*/

    changeTitle = (taskId, title) => {
        let object = {title: title};
        this.changeTask (taskId, object)
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus} changeTitle={this.changeTitle}
                        tasks={this.state.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true
                        }
                        if (this.state.filterValue === "Active") {
                            return (t.isDone === false)
                        }
                        if (this.state.filterValue === "Completed") {
                            return (t.isDone === true)
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

