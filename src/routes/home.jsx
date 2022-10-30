import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <ol>
        <Link to={{ pathname: '/fieldset' }}>
          <li>field set 놀이터</li>
        </Link>
        <Link to={{ pathname: '/checkbox' }}>
          <li>check box 놀이터</li>
        </Link>
      </ol>
    </div>
  );
}
