import { useState } from 'react';
import './App.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import Column from './Components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Input from './Components/Input/Input';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'task 1' },
    { id: 2, title: 'task 2' },
    { id: 3, title: 'task 3' },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{coordinateGetter:sortableKeyboardCoordinates})
  )

  const addTask= title=>(setTasks(tasks=>[...tasks,{id : tasks.length + 1,title }]))

  return (
    <div className='App'>
      <h1>My Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCorners}>
        <Input onSubmit={addTask}/>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
