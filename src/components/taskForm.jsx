import React, { useState } from 'react'

import './TaskForm.css'
import Tag from './Tag'

const TaskForm = ({ setTasks }) => {
    const [taskData, settaskData] = useState({
        task: '',
        status: 'todo',
        tags: [],
    })

    const checkTag = (tag) => {
        return taskData.tags.some(item => item === tag)
    }

    const selectTag = (tag) => {
        if (taskData.tags.some(item => item === tag)) {
            const filterTags = taskData.tags.filter(item => item !== tag)
            settaskData(prev => {
                return { ...prev, tags: filterTags }
            })
        } else {
            settaskData((prev) => {
                return { ...prev, tags: [...prev.tags, tag] }
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        settaskData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData);
        setTasks(prev => {
            return [...prev, taskData]
        })
        settaskData({
            task: '',
            status: 'todo',
            tags: [],
        })
    }

    return (
        <header className='app_header'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter task'
                    className='task_input'
                    name='task'
                    value={taskData.task}
                    onChange={handleChange} />

                <div className='task_form_bottom_line'>
                    <div>
                        <Tag tagName='HTML' selectTag={selectTag} selected={checkTag('HTML')} />
                        <Tag tagName='CSS' selectTag={selectTag} selected={checkTag('CSS')} />
                        <Tag tagName='JavaScript' selectTag={selectTag} selected={checkTag('JavaScript')} />
                        <Tag tagName='React' selectTag={selectTag} selected={checkTag('React')} />
                    </div>
                    <div>
                        <select 
                            className='task_status' 
                            name='status' 
                            value={taskData.status}
                            onChange={handleChange}>
                            <option value='todo'>To Do</option>
                            <option value='in-progress'>In Progress</option>
                            <option value='done'>Done</option>
                        </select>
                        <button type='submit' className='task_submit'>Add Task</button>
                    </div>
                </div>
            </form>
        </header>
    )
}

export default TaskForm;
