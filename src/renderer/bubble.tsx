import { createRoot } from 'react-dom/client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function App() {
  const clickPopup = () => {
    window.electron.ipcRenderer.sendMessage('close-popup');
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      size="large"
      onClick={clickPopup}
    />
  );
}

const container = document.getElementById('bubble-root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
