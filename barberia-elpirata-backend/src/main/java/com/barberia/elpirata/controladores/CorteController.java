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

import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.repositorios.CorteRepository;
import com.barberia.elpirata.servicios.CorteService;


@RestController
@RequestMapping("/api/cortes")
public class CorteController {
	
	@Autowired
	private CorteRepository corteRepository;
	
	@Autowired
	private CorteService corteService;
	
	@GetMapping("/todosLosCortes")
    public List<Corte> obtenerCortes(){
    		List<Corte> x = corteRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarCorte")
    public Corte guardarCorte(@RequestBody Corte corte) throws Exception{
        return corteService.guardarCorte(corte);
    }
	@DeleteMapping("/eliminarCorte/{corteId}")
	public void eliminarCorte(@PathVariable("corteId") Long corteId) throws Exception {
	    corteService.eliminarCorte(corteId);
	}

	
	
}