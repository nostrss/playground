import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <ol>
        <Link to={{ pathname: '/220915/checkbox' }}>
          <li>체크박스 놀이터</li>
        </Link>
      </ol>
    </div>
  );
}
