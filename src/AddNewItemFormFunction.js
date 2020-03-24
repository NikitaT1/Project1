import React, {useState, useEffect} from 'react';


const AddNewItemFormFunction = (props) => {

  /*  state = {
        error: false,
        title: ""
    };*/

    const [errorState, setError] = useState(false)

    const [title, setTitle] = useState(null)



 /*   const onAddItemClick = () => {
        let newText = state.title;
        if (newText === "") {
            this.setState({error: true})
        }
        else {this.setState({error: false, title: ""})}
        props.addItem(newText);
    };*/

    const onAddItemClick = () => {
        if (!title) {
            setError(true)

        }
        else {
            setError(false);
            props.addItem(title);
            setTitle(null)
            }
        debugger

    };

    /*const onTitleChanged = (e) => {
        this.setState({error: false,
            title: e.currentTarget.value})
    }*/

    const onTitleChanged = (e) => {
       setError(false);
       setTitle(e.currentTarget.value)
    }

    const onKeyPress= (e)=> {
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }



        let error = errorState ? "error" : "";

        return (
            <div className="todoList-newTaskForm">
                <input type="text" placeholder="New task name" className={error} onChange={onTitleChanged}
                       onKeyPress={onKeyPress} value={setTitle.title}/>
                <button onClick={onAddItemClick}>Add</button>
            </div>

        )

}

export default AddNewItemFormFunction




