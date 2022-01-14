import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';

const App = () => {
  return (
    <div>
      <main>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;