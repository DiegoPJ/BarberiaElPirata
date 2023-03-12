package com.barberia.elpirata.servicios;

import com.barberia.elpirata.entidades.Producto;

public interface ProductoService {

	public Producto guardarProducto(Producto producto) throws Exception;

	public void eliminarProducto(Long productoId);

}
