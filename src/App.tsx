import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CrudProvider } from './contexts/crudContext';
import HomePage from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CrudProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <ToastContainer theme='colored' />
    </CrudProvider>
  );
}

export default App;
