import React, { Component } from 'react'
import TodoListTask from "./TodoListTask";

export default class TodoListTasks extends Component {
    render = () => {
        let tasksElements = this.props.tasks.map(task =>  <TodoListTask
            changeStatus={this.props.changeStatus} task={task}
            changeTitle={this.props.changeTitle}
        />)
        return (
            <div>
                <div className="todoList-tasks">
                    {tasksElements}

                </div>
            </div>
        )
    }
}

/*
  <TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone} />
                    <TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone} />
                    <TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>
                    <TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>
                    <TodoListTask title={this.props.tasks[4].title} isDone={this.props.tasks[4].isDone}/>
 */

/*
 <div className="todoList-task">
                        <input type="checkbox" checked={false}/>
                        <span>JS</span>
                    </div>
                    <div className="todoList-task">
                        <input type="checkbox" checked={false}/>
                        <span>ReactJS</span>
                    </div>
                    <div className="todoList-task">
                        <input type="checkbox" checked={true}/>
                        <span>Patterns</span>
                    </div>
 */