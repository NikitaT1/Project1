import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";

class TodoList extends React.Component {

    constructor (props) {
        super (props);
    }

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [],
        filterValue: "All"
    };


    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString);
    };

    restoreState = () => {

        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if(stateAsString) {
            let state = JSON.parse(stateAsString);

            state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id+ 1;
                }
            });
            this.setState(state);
        }
    };

    nextTaskId = 0;


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
    }, ()=>{
        this.saveState();
    } );
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


    changeTitle = (taskId, title) => {
        let object = {title: title};
        this.changeTask (taskId, object)
    };


    render = () => {

        return (
                <div className="todoList">
                    <AddNewItemForm addTask={this.addTask} title={this.props.title} />
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
        );
    }
}

export default TodoList;

