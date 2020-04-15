import React, { Component } from 'react';


export default class TodoListHeader extends Component {


    render = () => {

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
            </div>
        )
    }
}
export default TodoListHeader;
/*
this.state.error ? 'error' : '';
 let inputError =  this.state.error  ? 'error' : ''
 */