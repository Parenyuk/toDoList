import React, { Component } from 'react';


export default class TodoListHeader extends Component {


        onAddTaskClick = () => {
                let newTitle = this.state.title;
                this.setState({title: ''})
            if (newTitle === "") {
                this.setState({error: true})
                // сетаем в стейт {error: true}
            } else {
                this.setState({error: false})
                // сетаем в стейт {error: false}
                // отправляем родителю название таски
            }

            this.props.addTask(newTitle);
            };

    state = {
        error: false,
        title: ''
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e) =>{
        if (e.key === 'Enter') {
            this.onAddTaskClick()
        }
    }

    render = () => {
        let classNameForInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text" placeholder="New task name"
                           className={classNameForInput}
                           onChange={this.onTitleChanged}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                    />
                    <button
                        onClick={this.onAddTaskClick}
                    >Add
                    </button>
                </div>
            </div>
        )
    }
}
/*
this.state.error ? 'error' : '';
 let inputError =  this.state.error  ? 'error' : ''
 */