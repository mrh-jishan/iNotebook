import { DatePicker } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Notes: React.FC = () => {
  let { noteId } = useParams();

  console.log('this is note id: ', noteId);

  return (
    <div>
      <Link to="/">
        <button type="button">
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </button>
      </Link>
      <DatePicker />
    </div>
  );
};

export default Notes;
