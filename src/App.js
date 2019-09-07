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

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "priority: hi"},
            {title: "React", isDone: true, priority: "priority: hi"},
            {title: "HTML", isDone: true, priority: "priority: hi"},
            {title: "CSS", isDone: false, priority: "priority: hi"},
        ],
    filterValue: "Completed"
}

addTask = (newText) => {
        let newTask = {
        title: newText,
        isDone: true,
        priority: "priority hi"
    };
    let newTasks = [...this.state.tasks, newTask];
    this.setState ( {
        tasks: newTasks
    })
};
    changeFilter = (newFilterValue) => {
        this.setState( {filterValue: newFilterValue})
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map (t=> {
            if ( t != task) {
                return t;
            }
            else {
                return {...t, isDone: isDone};
            }
        })
        this.setState ({
            tasks:newTasks
        })
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus}
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

