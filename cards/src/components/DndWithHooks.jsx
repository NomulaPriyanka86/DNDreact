import React, { useEffect, useRef, useState } from 'react'
import './DndWithHooks.css'

function DndWithHooks({data}) {
const[list,setList]=useState(data);
const [dragging, setDragging] = useState(false);

// useEffect(() => {
//   setList(data);
// }, [setList, data])

const dragItem = useRef();
const dragItemNode = useRef();


const handletDragStart = (e , params) => {
  console.log('Starting to drag' , params);
  dragItem.current = params;
  
  dragItemNode.current = e.target;
  dragItemNode.current.addEventListener('dragend', handleDragEnd)
  
  setTimeout(() => {
    setDragging(true); 
},0)
}

const handleDragEnd = () => {
  console.log("drag End ........");
  setDragging(false);
  dragItem.current = null;
  dragItemNode.current.removeEventListener('dragend', handleDragEnd)
  dragItemNode.current = null;
}

const handleDragEnter = (e,params) => {
  console.log('Entering a drag target',params)
  const currentItem = dragItem.current;
  if (dragItemNode.current !== e.target) {
      console.log('Target is NOT the same as dragged item')
      setList(oldList => {
          let newList = JSON.parse(JSON.stringify(oldList))
          newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0])
          dragItem.current = params;
          localStorage.setItem('List', JSON.stringify(newList));
          return newList
      })
  }
}

const getStyles = (params) => {
  const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {  
  return "dnd-item current"
  }
  return "dnd-item"
}
// if (list) {
  return (
    <div className="drag-n-drop">
    {list.map((grp, grpI) => (
      <div key={grp.title}
      onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null} 
      className="dnd-group">
        <div className='group-title'>{grp.title}</div>
        {grp.items.map((item, itemI) => (
          <div 
          draggable
           onDragStart={(e) => handletDragStart(e, {grpI, itemI})}
          //  onDragEnter={dragging?handleDragEnter:null}  // check this the condition is working
          onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI})}:null}
           key={item} 
             className={dragging?getStyles({grpI, itemI}):"dnd-item"}>
            {item}
          </div>
        ))}
      </div>
    ))}
    </div>
  )
// } else { return null}
}

export default DndWithHooks