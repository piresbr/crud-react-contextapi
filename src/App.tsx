import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { CrudProvider } from './contexts/crudContext';
import HomePage from './pages/Home';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <CrudProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <ToastContainer />
    </CrudProvider>
  );
}

export default App;
