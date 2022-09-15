import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/routes/home';
import CheckBox from './routes/CheckBox';

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path='/220915-checkbox' element={<CheckBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
