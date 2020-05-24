import React, {useState, useEffect} from 'react';
import './css/AddNewItemForm.css';


const AddNewItemFormFunction = (props) => {

    const [errorState, setError] = useState(false)

    const [title, setTitle] = useState(null)

    const onAddItemClick = () => {
        if (!title) {
            setError(true)
        }
        else {
            setError(false);
            props.addItem(title);
            setTitle(null)
            }
    };


    const onTitleChanged = (e) => {
       setError(false);
       setTitle(e.currentTarget.value)
    }

    const onKeyPress= (e)=> {
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }



         let error = errorState ? "error" : "no-error";


        return (
            <div className="newTaskForm">
                <div>
                    <input className={error} type="text" placeholder="New task name" onChange={onTitleChanged}
                            onKeyPress={onKeyPress} value={setTitle.title}/>
                </div>
                <div >
                    <button id="button" onClick={onAddItemClick}>+</button>
                </div>
            </div>
        )
}

export default AddNewItemFormFunction




