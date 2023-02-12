import './App.css';
import Main from './pages/Main.js';
import Detalles from './pages/Detalles.js';
import Setting from './pages/Setting.js'
import DetallesEventos from './pages/DetallesEventos.js';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/login/Login';
import Registro from './pages/Registro'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App({ Component }) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/detallesEventos/:id" element={<DetallesEventos />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/main" element={<Main />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="*" element={NotFound} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}
function NotAuthorized() {
  return <>No esta autorizado estar aqui</>;
}

export default App;
