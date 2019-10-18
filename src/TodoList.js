import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import connect from "react-redux/lib/connect/connect";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    };

    nextTaskId = 0;

    state = {
        filterValue: "All"
    };

    onTaskAdded = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(newTask, this.props.id)
    }

    onFilterChanged = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        } );
    }

    onTaskStatusChanged = (isDone, taskId) => {
        this.changeTask({isDone:isDone}, taskId)
    };

    onTaskTitleChanged = (title, taskId) => {
        this.changeTask({title:title}, taskId)
    };

    changeTask = (obj, taskId) => {
        this.props.changeTask (obj, taskId, this.props.id)
        /*let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            }
            else {
                return {...t, ...obj};
            }
        });
        this.setState({
            tasks: newTasks
        }, () => {this.saveState()})*/
    };

    render = () => {

        return (
            <div className="todoList">
                <TodoListHeader onTaskAdded={this.onTaskAdded} title={this.props.title}  />
                <TodoListTasks onTaskStatusChanged={this.onTaskStatusChanged} onTaskTitleChanged={this.onTaskTitleChanged}
                               tasks={this.props.tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter onFilterChanged={this.onFilterChanged} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask (newTask, todolistId) {
            const action = {type: "ADD-TASK", newTask, todolistId};
            dispatch(action);
        },
        changeTask (obj, taskId, todolistId) {
            const action = {type: "CHANGE-TASK", obj, taskId, todolistId};
            dispatch(action);
        }
    }
}



const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoList)

export default ConnectedTodoList;
