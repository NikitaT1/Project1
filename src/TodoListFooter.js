import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    }

    changeFiltersClick = (isHidden) => {
        if (this.state.isHidden === true) {
            return (this.setState( {isHidden: false}))
    }
        else {
            return (this.setState( {isHidden: true}))}
    };

    onAllFilterClick = () => {this.props.changeFilter("All")};
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")};
    onActiveFilterClick = () => {this.props.changeFilter("Active")}


    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        /*let hide = this.state.isHidden === true ? "filter-active" : "";
        let nichtHide = this.state.isHidden === false ? "filter-active" : "";*/






        return (
                    <div className="todoList-footer">
                        {!this.state.isHidden && <div>
                        <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                        <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                        <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                        </div>}
                        <div>
                            {!this.state.isHidden && <button onClick={this.changeFiltersClick} >Hide</button>}
                            {this.state.isHidden && <button onClick={this.changeFiltersClick} >Show</button>}
                        </div>
                    </div>
        );
    }
}

export default TodoListFooter;

