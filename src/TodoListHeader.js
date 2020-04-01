import React, { Component } from 'react'

export default class TodoListHeader extends Component {

        newTaskTitleRef = React.createRef();
        onAddTaskClick = () => {
                let newTitle = this.newTaskTitleRef.current.value;
                this.newTaskTitleRef.current.value = '';
                this.props.addTask(newTitle);
            };

    state = {
        isError: false
    }

    onTitleChanged = () => {
        this.setState({error: false});
    }
    render = () => {
        let changeInputColor = () => {this.setState()}
        return (
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input type="text" placeholder="New task name"
                            ref={this.newTaskTitleRef}
                            className={this.state.error ? 'error' : ''}
                                   onChange={this.onTitleChanged}
                            />
                            <button
                                onClick={this.onAddTaskClick}
                            >Add</button>
                        </div>
                    </div>
        )
    }
}
