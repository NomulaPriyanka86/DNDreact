import { useSortable } from '@dnd-kit/sortable';
import './Task.css';
import { CSS } from '@dnd-kit/utilities';

function Task({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className='task' ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <input type='checkbox' className='checkbox' />
      {title}
    </div>
  );
}

export default Task;
