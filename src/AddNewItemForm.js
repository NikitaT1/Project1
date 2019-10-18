import React from 'react';


class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    };


    onAddItemClick = () => {
        let newText = this.state.title;
        if (newText === "") {
            this.setState({error: true})
        }
        else {this.setState({error: false, title: ""})}
        this.props.addItem(newText);

    };

    onTitleChanged = (e) => {
        this.setState({error: false,
            title: e.currentTarget.value})

    }

    onKeyPress= (e)=> {
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    }

    render = () => {

        let error = this.state.error ? "error" : "";

        return (
            <div className="todoList-newTaskForm">
                <input type="text" placeholder="New task name" className={error} onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress} value={this.state.title}/>
                <button onClick={this.onAddItemClick}>Add</button>
            </div>

        )
    }
}

export default AddNewItemForm




