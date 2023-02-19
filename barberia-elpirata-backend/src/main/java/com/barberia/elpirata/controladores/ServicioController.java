package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Servicio;
import com.barberia.elpirata.repositorios.ServicioRepository;
import com.barberia.elpirata.servicios.ServicioService;


@RestController
@RequestMapping("/api")
public class ServicioController {
	
	@Autowired
	private ServicioRepository servicioRepository;
	
	@Autowired
	private ServicioService servicioService;
	
	@GetMapping("/servicios")
    public List<Servicio> obtenerBarberias(){
    		List<Servicio> x = servicioRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarServicio")
    public Servicio guardarServicio(@RequestBody Servicio servicio) throws Exception{
        return servicioService.guardarServicio(
        		servicio);
    }
	
}
