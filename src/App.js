import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoProductos from "./empleado/ListadoProductos";
import Navegacion from "./plantilla/Navegacion";
import AgregarProducto from "./empleado/AgregarProducto";
import EditarProducto from "./empleado/EditarProducto";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path="/" element={<ListadoProductos/>} />
          <Route exact path="/agregar" element={<AgregarProducto/>} />
          <Route exact path="/editar/:id" element={<EditarProducto/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
