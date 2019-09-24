import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    }

    onAddItemButtonClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});
        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            // передаём новый текст наружу
            this.props.addItem(newText);
        }
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemButtonClick()
        }
    }



    render = () => {

        const classNameForInput = this.state.error ? "error" : "";

        return (
            <div className="newItemForm">
                <input className={classNameForInput} type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}/>
                <button onClick={this.onAddItemButtonClick}>Add</button>
            </div>
        )

    }
}

export default AddNewItemForm;




