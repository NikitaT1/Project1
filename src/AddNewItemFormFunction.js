import React, {useState, useEffect} from 'react';
import './css/AddNewItemForm.css';
import { Button, DatePicker} from 'antd';
import { Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'


const AddNewItemFormFunction = (props) => {

    const [errorState, setError] = useState(false)
    const [title, setTitle] = useState('')

    // useEffect(() => {
    //     setTitle(null)
    // })

    const onAddItemClick = () => {
        if (!title) {
            setError(true)
        }
        else {
            setError(false);
            props.addItem(title);
            setTitle('')
            }
    };

    const onTitleChanged = (e) => {
       setError(false);
       setTitle(e.currentTarget.value)
    }

    const onKeyPress= (e)=> {
        if (e.key === "Enter") {
            setTitle(e.currentTarget.value)
        }
    }

         let error = errorState ? "error" : "no-error";
debugger
        return (
            <div className="newTaskForm">
                <div>
                    <Input className={error} type="text" placeholder="New task name" onChange={onTitleChanged}
                            onKeyPress={onKeyPress} value={title}/>
                </div>
                <div >
                    {/*<button id="button" onClick={onAddItemClick}>+</button>*/}
                    {/*<>*/}
                    {/*    <Button type="primary">PRESS ME</Button>*/}
                    {/*    <DatePicker placeholder="select date" />*/}
                    {/*</>*/}
                    <PlusCircleOutlined style={{ fontSize: '1.9em', color: '#08c' }} onClick={onAddItemClick}/>
                </div>
            </div>
        )
}

export default AddNewItemFormFunction




