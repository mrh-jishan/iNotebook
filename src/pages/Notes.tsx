import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';

export default function Notes() {
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
}
