import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/routes/home';
import CheckBox from './routes/checkbox';
import FieldSet from './routes/fieldset';

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path='/fieldset' element={<FieldSet />} />
          <Route path='/checkbox' element={<CheckBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
