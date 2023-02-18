package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Estilo;
import com.barberia.elpirata.repositorios.EstiloRepository;
import com.barberia.elpirata.servicios.EstiloService;


@RestController
@RequestMapping("/api")
public class EstiloController {
	
	@Autowired
	private EstiloRepository estiloRepository;
	
	@Autowired
	private EstiloService estiloService;
	
	@GetMapping("/estilos")
    public List<Estilo> obtenerEstilos(){
    		List<Estilo> x = estiloRepository.findAll();
        return x;
    }
	
//	@PostMapping("/guardarEstilo")
//    public Estilo guardarEstilo(@RequestBody Estilo estilo) throws Exception{
//        return estiloService.guardarEstilo(estilo);
//    }
	
}