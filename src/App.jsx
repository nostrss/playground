import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/routes/home';

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
