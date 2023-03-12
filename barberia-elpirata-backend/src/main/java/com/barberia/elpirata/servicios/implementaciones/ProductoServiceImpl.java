package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Producto;
import com.barberia.elpirata.repositorios.ProductoRepository;
import com.barberia.elpirata.servicios.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService{

	
	@Autowired
	private ProductoRepository productoRepository;
	
	@Override
	public Producto guardarProducto(Producto producto) throws Exception {
	    if (producto.getId() == -1) {
	    	producto.setId(null);
	        // Producto no existe, crear uno nuevo
	        return productoRepository.save(producto);
	    } else {
	        // Producto ya existe, actualizarlo
	        Producto productoExistente = productoRepository.findById(producto.getId()).orElse(null);
	        if (productoExistente == null) {
	            throw new Exception("Producto no encontrado");
	        }
	        productoExistente.setNombre(producto.getNombre());
	        productoExistente.setPrecio(producto.getPrecio());
	        productoExistente.setCantidad(producto.getCantidad());
	        productoExistente.setDescripcion(producto.getDescripcion());
	        productoExistente.setImagen(producto.getImagen());
	        return productoRepository.save(productoExistente);
	    }
	}


	@Override
	public void eliminarProducto(Long productoId) {
		productoRepository.deleteById(productoId);
	}
	
}
