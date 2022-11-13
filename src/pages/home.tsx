import { Link } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <div>
        <ol>
          <Link to={{ pathname: '/class' }}>
            <li>class 놀이터</li>
          </Link>
          <Link to={{ pathname: '/fieldset' }}>
            <li>field set 놀이터</li>
          </Link>
          <Link to={{ pathname: '/checkbox' }}>
            <li>check box 놀이터</li>
          </Link>
          <Link to={{ pathname: '/css' }}>
            <li>css 놀이터</li>
          </Link>
          <Link to={{ pathname: '/data-structure' }}>
            <li>Data Structure 놀이터</li>
          </Link>
        </ol>
      </div>
    </>
  );
}
