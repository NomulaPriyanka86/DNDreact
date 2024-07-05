import React from 'react';
import './Column.css';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from '../Task/Task';

function Column({ tasks }) {
  return (
    <div className='column'>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} id={task.id} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
