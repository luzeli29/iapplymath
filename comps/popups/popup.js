import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Popup = ({ icon, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleDrag = (e, { x, y }) => {
    setPosition({ x, y });
  };

  return (
    <div style={{ marginTop: '10px', marginLeft: '10px' }}>
      <button onClick={handleTogglePopup} ishovering={true}>
        {icon}
      </button>

      {isOpen && (
        <Draggable handle=".draggable-handle" defaultPosition={position} onDrag={handleDrag}>
          <div
            className="popup-content"
            style={{
              position: 'absolute',
              zIndex: 999,
              border: 'none',
              borderRadius: '0px',
              padding: '0px',
              pointerEvents: 'auto',
              top: `${position.y}px`,
              left: `${position.x}px`,
              background: 'transparent',
            }}
          >
            <div className="draggable-handle">Drag Me</div>
            <div className="app">{content}</div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Popup;