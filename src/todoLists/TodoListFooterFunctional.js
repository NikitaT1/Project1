import React, {useState} from 'react';
import '../css/TodoList.css'

const TodoListFooterFunctional = (props) => {

    const [isHidden, setHidden] = useState(true)

    const onAllFilterClick = () => {
        props.onFilterChanged("All")
    };
    const onCompletedFilterClick = () => {
        props.onFilterChanged("Completed")
    };
    const onActiveFilterClick = () => {
        props.onFilterChanged("Active")
    };

        let classForAll = props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div>
                {isHidden && <div>
                    <button onClick={onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={onActiveFilterClick} className={classForActive}>Active</button>
                </div>}
                {!isHidden && <button onClick={()=>setHidden(true)}>Show</button>}
                {isHidden && <button onClick={()=>setHidden(false)}>Hide</button>}
            </div>

        );
}

export default TodoListFooterFunctional;

