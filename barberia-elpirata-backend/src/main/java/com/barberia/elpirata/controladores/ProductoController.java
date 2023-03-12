package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Producto;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.ProductoRepository;
import com.barberia.elpirata.servicios.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	@Autowired
	private ProductoRepository productoRepository;
	
	@Autowired
	private ProductoService productoService;
	
	@GetMapping("/todosLosProductos")
    public List<Producto> obtenerCitas(){
    		List<Producto> x = productoRepository.findAll();
        return x;
    }
	@DeleteMapping("/eliminarProducto/{productoId}")
    public void eliminarUsuario(@PathVariable("productoId") Long productoId){
        productoService.eliminarProducto(productoId);
    }
	
	@PostMapping("/guardarProducto")
    public Producto guardarProducto(@RequestBody Producto producto) throws Exception{
        return productoService.guardarProducto(producto);
    }
}
