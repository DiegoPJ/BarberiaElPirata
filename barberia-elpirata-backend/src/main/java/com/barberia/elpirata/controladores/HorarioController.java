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
@RequestMapping("/api")
public class HorarioController {
	
	@Autowired
	private HorarioRepository horarioRepository;
	
	@Autowired
	private HorarioService horarioService;
	
	@GetMapping("/horarios")
    public List<Horario> obtenerHorario(){
    		List<Horario> x = horarioRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarHorario")
    public Horario guardarHorario(@RequestBody Horario horario) throws Exception{
        return horarioService.guardarHorario(
        		horario.getDiaSemana(),horario.getHora_apertura_mañana(), horario.getHora_cierre_mañana(),
        								horario.getHora_apertura_tarde(),horario.getHora_cierre_tarde());
    }
	
}
