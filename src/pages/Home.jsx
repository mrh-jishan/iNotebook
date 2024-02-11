import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <Link to="/notes">
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            This is home
          </button>
        </Link>
      </div>
    </div>
  );
}
