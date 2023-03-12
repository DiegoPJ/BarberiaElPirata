package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.repositorios.HorarioRepository;
import com.barberia.elpirata.servicios.HorarioService;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {
	
	@Autowired
	private HorarioRepository horarioRepository;
	
	@Autowired
	private HorarioService horarioService;
	
	@GetMapping("/todosLosHorarios")
    public List<Horario> obtenerHorario(){
    		List<Horario> x = horarioRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarHorario")
    public Horario guardarHorario(@RequestBody Horario horario) throws Exception{
        return horarioService.guardarHorario(horario);
    }
	
}
