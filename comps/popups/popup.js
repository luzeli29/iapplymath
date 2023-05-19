import React, { useState } from 'react';
import Draggable from 'react-draggable';
import getText from '@utils/text/getText';

const Popup = ({ icon, content, lang }) => {
  lang = lang ? lang : 'en'
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
          >
            <div className="draggable-handle">{getText('drag_me', lang)}
              <div className="app">{content}</div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Popup;