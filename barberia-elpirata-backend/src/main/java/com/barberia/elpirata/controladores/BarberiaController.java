package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Barberia;
import com.barberia.elpirata.repositorios.BarberiaRepository;
import com.barberia.elpirata.servicios.BarberiaService;


@RestController
@RequestMapping("/api")
public class BarberiaController {
	
	@Autowired
	private BarberiaRepository barberiaRepository;
	
	@Autowired
	private BarberiaService barberiaService;
	
	@GetMapping("/barberia")
    public List<Barberia> obtenerBarberias(){
    		List<Barberia> x = barberiaRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarBarberia")
    public Barberia guardarBarberia(@RequestBody Barberia barberia) throws Exception{
        return barberiaService.guardarBarberia(
        		barberia);
    }
	
}
