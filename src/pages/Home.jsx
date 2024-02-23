import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { useEffect, useState } from 'react';

const Home = () => {
  let { noteId } = useParams();

  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    return () => {
      setMarkdown(`# this is my note ${noteId}`);
    };
  }, [noteId]);

  const onCodeEditorChange = (md) => {
    window.electron.ipcRenderer.sendMessage('update-note', {
      file: '',
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
