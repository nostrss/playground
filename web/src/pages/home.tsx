import { Link } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <div>
        <ul>
          <li>HTML</li>
          <ol>
            <Link to={{ pathname: '/html/fieldset' }}>
              <li>field set </li>
            </Link>
            <Link to={{ pathname: '/html/image' }}>
              <li>image </li>
            </Link>
          </ol>
          <li>CSS</li>
          <ol>
            <Link to={{ pathname: '/css/checkbox' }}>
              <li>check box </li>
            </Link>
          </ol>
          <li>Javascript</li>
          <ol>
            <Link to={{ pathname: '/javascript/class' }}>
              <li>class </li>
            </Link>
            <Link to={{ pathname: '/javascript/intl' }}>
              <li>Intl </li>
            </Link>
            <Link to={{ pathname: '/javascript/api' }}>
              <li>api </li>
            </Link>
          </ol>
          <li>React</li>
          <ol>
            <Link to={{ pathname: '/react/kakao_share' }}>
              <li>카카오 공유하기</li>
            </Link>
            <Link to={{ pathname: '/react/drag_drop' }}>
              <li>Drag & Drop</li>
            </Link>
          </ol>
          <li>Data Structures</li>
          <ol>
            <Link to={{ pathname: '/data-structure/linked-list' }}>
              <li>linked-list</li>
            </Link>
          </ol>
        </ul>
      </div>
    </>
  );
}
