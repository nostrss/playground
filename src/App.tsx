import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import CheckBox from './routes/checkbox';
import ClassPlayground from './routes/class';
import CssPlayGround from './routes/css';
import FieldSet from './routes/fieldset';

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
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
