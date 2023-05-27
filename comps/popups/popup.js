import React, { useState } from 'react';
import Draggable from 'react-draggable';
import getText from '@utils/text/getText';

const Popup = ({ icon, content, lang }) => {
  lang = lang ? lang : 'en'
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 320, height: 470 });

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
    setPosition({ x: 0, y: 0 })
  };

  const handleDrag = (e, { x, y }) => {
    console.log(x, y);
    const realY = y + 12;
    const realX = x + 80;
    setPosition({ realX, realY });
  };

  const handleResize = (e, { size }) => {
    setSize(size);
  };

  return (
    <div style={{ marginTop: '10px', marginLeft: '10px' }}>
      <button onClick={handleTogglePopup} ishovering={true}>
        {icon}
      </button>
  
      {isOpen && (
        <Draggable handle=".draggable-handle" defaultPosition={position} onDrag={handleDrag}>
          <ResizableBox
            className="popup-content"
            style={{
              position: 'fixed',
              zIndex: 999,
              border: 'none',
              borderRadius: '0px',
              padding: '0px',
              pointerEvents: 'auto',
              top: `${position.y}px`,
              left: `${position.x}px`,
              background: 'transparent',
            }}
            width={size.width}
            height={size.height}
            minConstraints={[100, 100]}
            onResize={handleResize}
          >
            <div className="popup-header">
            <div className="draggable-handle">Drag Me</div>
            <button className="close-button" onClick={handleTogglePopup}>
              <FaTimes />
            </button>
            </div>
            <div className="app">{content}</div>
          </ResizableBox>
        </Draggable>
      )}
    </div>
  );
   };

export default Popup;