import React, { useState, useEffect } from 'react'

import './App.css'
import TaskColumn from './components/TaskColumn'
import TaskForm from './components/taskForm'

const oldTasks = localStorage.getItem('tasks')

const App = () => {

const [tasks, setTasks] = useState(JSON.parse(oldTasks) || [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex)
    setTasks(newTasks)
  }
  return (
    <div className='app'>
      <TaskForm setTasks={setTasks} />
      <main className='app_main'>
        <TaskColumn title='To do' tasks={tasks} status='todo' handleDelete={handleDelete}/>
        <TaskColumn title='In Progress' tasks={tasks} status='in-progress' handleDelete={handleDelete}/>
        <TaskColumn title='Done' tasks={tasks} status='done' handleDelete={handleDelete}/>
      </main>
    </div>
  )
} 

export default App
