import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: "yo"
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick()
        }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }


    onAddTaskClick = () => {
        let newText = this.state.title;
        this.state.title = "";
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.props.addItem(newText);
            this.setState({error: false})
        }
    };


    render = () => {

        let classNameForInput = this.state.error ? "error" : "";

        return (

            <div className="todoList-newTaskForm">
                <input type="text" placeholder="New task name"
                      /* className={classForAll}*/
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                       onChange={this.onTitleChanged}/>
                <button onClick={this.onAddTaskClick}>Add</button>
            </div>
        )
    }
}

export default AddNewItemForm;




