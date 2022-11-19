import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataStructurePage from 'pages/data-structure';
import LinkedListPage from 'pages/data-structure/linked-list';
import ImagePage from 'pages/img';
import KakaoSharePage from 'pages/kakao_share';
import Home from './pages/home';
import CheckBox from './pages/checkbox';
import ClassPlayground from './pages/class';
import CssPlayGround from './pages/css';
import FieldSet from './pages/fieldset';

function App() {
  // console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          <Route path='/kakao_share' element={<KakaoSharePage />} />
          <Route
            path='/data-structure/linked-list'
            element={<LinkedListPage />}
          />
          <Route path='/data-structure' element={<DataStructurePage />} />
          <Route path='/image' element={<ImagePage />} />
          <Route path='/class' element={<ClassPlayground />} />
          <Route path='/css' element={<CssPlayGround />} />
          <Route path='/fieldset' element={<FieldSet />} />
          <Route path='/checkbox' element={<CheckBox />} />
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
