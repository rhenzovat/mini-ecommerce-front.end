import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarProducto() {
    const urlBase = "http://localhost:8080/mini/productos";

  let navegacion = useNavigate();

  const {id}= useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: 0,
  });

  const { nombre, precio, stock } = producto;

  useEffect(()=>{
    cargarProducto();
  },[]);

  const cargarProducto = async () =>{
    const resultado = await axios.get(`${urlBase}/${id}`);
    setProducto(resultado.data);
  }

  const cambioEntrada = (e) => {
    //operador spread ... (expandir el objeto producto) y luego actualizamos el valor del campo que se esta editando
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const enviarProducto = async (e) => {
    e.preventDefault();    
    await axios.put(`${urlBase}/${id}`, producto);
    //redireccionamos a la pagina de inicio
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h1>Editar Producto</h1>
      </div>
      <form onSubmit={(e) => enviarProducto(e)}>
        <div className="mb-3">
          <label for="nombre" className="form-label">
            nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => cambioEntrada(e)}
          />
        </div>

        <div className="mb-3">
          <label for="precio" className="form-label">
            precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            required={true}
            value={precio}
            onChange={(e) => cambioEntrada(e)}
          />
        </div>
        <div className="mb-3">
          <label for="stock" className="form-label">
            stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            required={true}
            value={stock}
            onChange={(e) => cambioEntrada(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn sm me-3">
            Guardar
          </button>
          <a href="/" className="btn btn-danger btn sm">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

