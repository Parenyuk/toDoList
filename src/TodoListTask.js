import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0
        this.props.changeStatus(this.props.task, status);
    }

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value })

    }

    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {

        this.setState({editMode: true});
    }

    deactivateEditMode= () => {
        this.props.changeTitle(this.props.task, this.state.title);
        this.setState({editMode: false, title: ''});
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render = () => {
        let statusTask = this.props.task.status;
        let containerCssClass = statusTask === 2 ? "todoList-task done" : "todoList-task";
        return (
            <div className={containerCssClass}>
                <input type="checkbox" checked={statusTask === 2}
                       onChange={this.onIsDoneChanged}/>
                { this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title} />
                    : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>
                }, priority: {this.props.task.priority} <button onClick={this.onDeleteTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

