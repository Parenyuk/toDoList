import React, { Component } from 'react';

export default class TodoListFooter extends Component {

    state = {
        isHidden: true
    }

    onShowFilterClick = () => {
        this.setState({isHidden: false})
    };
    onHideFilterClick = () => {
        this.setState({isHidden: true})
    };


    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                <button className={classForAll}
                        onClick={() => {
                            this.props.changeFilter('All')
                        }}
                >All
                </button>
                <button className={classForCompleted}
                        onClick={() => {
                            this.props.changeFilter('Completed')
                        }}
                >Completed
                </button>
                <button className={classForActive}
                        onClick={() => {
                            this.props.changeFilter('Active')
                        }}
                >Active
                </button>
                {!this.state.isHidden && <span onClick={this.onHideFilterClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFilterClick}>show</span>}

            </div>

        )
    }
}
