import React, {Component} from "react";

class TodoListTask extends Component {
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked )
    }
    render = () => {
        let taskClass = this.props.task.isDone
            ? 'todoList-task done'
            : 'todoList-task'
        return (
            <div className={taskClass}>
                <input type="checkbox" checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.title}</span>: <span> </span>
                <span>{this.props.task.priority}</span>
            </div>
                )
    }
}


export default TodoListTask;