import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoProductos() {
  const urlBase = "http://localhost:8080/mini/productos";

  //usaremos lo hoot
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    console.log("resultado de cargar empelados");
    console.log(resultado.data);
    setProductos(resultado.data);
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarProductos();
  }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h2>Listado de productos</h2>
      </div>

      <table className="table table-striped table-hover align-middle1111">
        <thead className="table-danger">
          <tr>
            <th scope="col">id</th>
            <th scope="col">nombre</th>
            <th scope="col">precio</th>
            <th scope="col">stock</th>
            <th className="text-center" scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            //Iteramso el arreglo de productos
            productos.map((producto, indice) => (
              <tr key={indice}>
                <th scope="row">{producto.id}</th>
                <td>{producto.nombre}</td>
                <td><NumericFormat value={producto.precio} displayType={'text'} thousandSeparator={','} prefix="$" decimalScale={2} fixedDecimalScale /></td>
                <td>{producto.stock}</td>
                <td className="text-center">
                  <div>
                    <Link to={`/editar/${producto.id}`} className="btn btn-warning btn-sm me-3">
                      Editar
                    </Link>
                    <button onClick={()=> eliminarProducto(producto.id)} className="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
              
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
