import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { useEffect, useState } from 'react';

const Home = () => {
  let { noteId } = useParams();

  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    return () => {
      window.electron.ipcRenderer.sendMessage('get-note', [noteId]);
      window.electron.ipcRenderer.once('get-notes', (arg) => {
        setMarkdown(arg);
      });
    };
  }, [noteId]);

  const onCodeEditorChange = (md) => {
    window.electron.ipcRenderer.sendMessage('update-note', {
      file: noteId,
      md,
    });
  };

  return (
    <div>
      <CodeEditor markdown={markdown} onChange={onCodeEditorChange} />
    </div>
  );
};

export default Home;
