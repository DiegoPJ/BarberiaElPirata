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
	public Producto guardarProducto(Producto producto) {
		return productoRepository.save(producto);
	}

}
