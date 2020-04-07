import React, {Component} from "react";

class TodoListTask extends Component {

    state = {
        editMode: false,
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
}
    deactivatedEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked )
    }
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value )
    }
    render = () => {
        let taskClass = this.props.task.isDone
            ? 'todoList-task done'
            : 'todoList-task'
        return (
            <div className={taskClass}>
                <input type="checkbox" checked={this.props.task.id.isDone}
                       onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.id} - </span>
                {this.state.editMode
                    ? <input
                        value={this.props.task.title}
                        autoFocus={true}
                         onBlur={this.deactivatedEditMode}
                        onChange={this.onTitleChanged}
                    />
                    :  <span onClick={this.activatedEditMode}>{this.props.task.title}: </span>
                }
                <span>priority {this.props.task.priority}</span>
            </div>
                )
    }
}


export default TodoListTask;