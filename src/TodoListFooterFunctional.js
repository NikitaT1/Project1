import React, {useState} from 'react';
import './App.css';

const TodoListFooterFunctional = (props) => {

    /*state = {
        isHidden: false
    };*/

    const [isHidden, setHidden] = useState(false)

    const onAllFilterClick = () => {
        props.onFilterChanged("All")
    };
    const onCompletedFilterClick = () => {
        props.onFilterChanged("Completed")
    };
    const onActiveFilterClick = () => {
        props.onFilterChanged("Active")
    };
    const onShowFiltersClick = () => {
        setHidden(false)
    };
    const onHideFiltersClick = () => {
        setHidden(true)
    };

        let classForAll = props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                {setHidden && <div>
                    <button onClick={onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={onActiveFilterClick} className={classForActive}>Active</button>
                </div>}
                {!setHidden && <span onClick={onHideFiltersClick}>Hide</span>}
                {setHidden && <span onClick={onShowFiltersClick}>Show</span>}
            </div>

        );
}

export default TodoListFooterFunctional;

