import React, { Component } from 'react'

export default class TodoListTasks extends Component {
    render = () => {
        return (
            <div>
                <div className="todoList-tasks">
                    <div className="todoList-task">
                        <input type="checkbox" checked={true}/>
                        <span>CSS</span>
                    </div>
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
                </div>
            </div>
        )
    }
}