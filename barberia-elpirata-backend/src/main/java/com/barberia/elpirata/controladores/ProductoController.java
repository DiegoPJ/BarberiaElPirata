package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Producto;
import com.barberia.elpirata.repositorios.ProductoRepository;
import com.barberia.elpirata.servicios.ProductoService;

@RestController
@RequestMapping("/api")
public class ProductoController {

	@Autowired
	private ProductoRepository productoRepository;
	
	@Autowired
	private ProductoService productoService;
	
	@GetMapping("/productos")
    public List<Producto> obtenerCitas(){
    		List<Producto> x = productoRepository.findAll();
        return x;
    }
}
