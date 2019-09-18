import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: " "
    };

    onAddTaskClick = () => {
        let newText = this.state.title;
        this.state.title = "";
        if (newText === "") {
            this.setState( {error: true})
        }
        else {
            this.props.addTask(newText);
            this.setState( {error: false})
        }
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick()
        }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    render = () => {
        let classForAll = this.state.error === true ? "error" : "";


        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text" placeholder="New task name"
                           className={classForAll}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                           onChange={this.onTitleChanged}/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}



