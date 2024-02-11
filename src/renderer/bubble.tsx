import { createRoot } from 'react-dom/client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import './Bubble.css';

function App() {
  const iconRef = useRef<HTMLButtonElement>(null);

  const clickPopup = () => {
    window.electron.ipcRenderer.sendMessage('close-popup');
  };

  const startDrag = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    let hasMoved = false; // Flag to track if mouse has moved significantly
    const iconRect = iconRef.current?.getBoundingClientRect();
    if (iconRect) {
      const offsetX = event.clientX - iconRect.left;
      const offsetY = event.clientY - iconRect.top;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const x = moveEvent.screenX - offsetX;
        const y = moveEvent.screenY - offsetY;
        window.electron.ipcRenderer.sendMessage('start-drag', { x, y });

        // Check if the mouse has moved significantly
        if (
          !hasMoved &&
          (Math.abs(moveEvent.clientX - event.clientX) > 5 ||
            Math.abs(moveEvent.clientY - event.clientY) > 5)
        ) {
          hasMoved = true;
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        // If the mouse has not moved significantly, trigger the clickPopup function
        if (!hasMoved) {
          clickPopup();
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <Button
      ref={iconRef}
      type="primary"
      icon={<DownloadOutlined />}
      size="large"
      onMouseDown={startDrag}
    />
  );
}

const container = document.getElementById('bubble-root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
