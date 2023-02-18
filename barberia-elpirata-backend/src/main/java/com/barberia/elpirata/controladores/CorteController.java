package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.repositorios.CorteRepository;
import com.barberia.elpirata.servicios.CorteService;


@RestController
@RequestMapping("/api")
public class CorteController {
	
	@Autowired
	private CorteRepository corteRepository;
	
	@Autowired
	private CorteService corteService;
	
	@GetMapping("/cortes")
    public List<Corte> obtenerCortes(){
    		List<Corte> x = corteRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarCorte")
    public Corte guardarCorte(@RequestBody Corte corte) throws Exception{
        return corteService.guardarCorte(corte);
    }
	
}