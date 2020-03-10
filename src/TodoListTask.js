import React, {Component} from "react";

class TodoListTask extends Component {
    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone}/>
                <span>{this.props.title}</span>: <span> </span>
                 <span>{this.props.priority}</span>
            </div>
        )
    }
 }


export default TodoListTask;