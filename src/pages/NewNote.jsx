import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';

export default function NewNote() {
  return (
    <div>
      <Link to="/">
        <button type="button">
          <span role="img" aria-label="books">
            📚
          </span>
          NewNote
        </button>
      </Link>
      <DatePicker />
    </div>
  );
}
