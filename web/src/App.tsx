import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImagePage from 'pages/html/img';
import KakaoSharePage from 'pages/react/kakao_share';
import LinkedListContainer from 'pages/data-structure/linked-list/linked-list.container';
import IntlPage from 'pages/javascript/intl';
import ApiTest from 'pages/javascript/api';
import DragDrop from 'pages/react/drag_drop';
import Home from './pages/home';
import ClassPlayground from './pages/javascript/class';
import FieldSet from './pages/html/fieldset';
import CheckBoxPage from './pages/css/checkbox';

function App() {
  // console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          {/* Data Structures */}
          <Route
            path='/data-structure/linked-list'
            element={<LinkedListContainer />}
          />

          {/* React  */}
          <Route path='/react/kakao_share' element={<KakaoSharePage />} />
          <Route path='/react/drag_drop' element={<DragDrop />} />

          {/* javascipt  */}
          <Route path='/javascript/intl' element={<IntlPage />} />
          <Route path='/javascript/class' element={<ClassPlayground />} />
          <Route path='/javascript/api' element={<ApiTest />} />

          {/* CSS  */}
          <Route path='/css/checkbox' element={<CheckBoxPage />} />

          {/* Html */}
          <Route path='/html/image' element={<ImagePage />} />
          <Route path='/html/fieldset' element={<FieldSet />} />
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
