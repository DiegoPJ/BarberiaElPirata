package com.barberia.elpirata.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.CitaRepository;
import com.barberia.elpirata.servicios.CitaService;



@RestController
@RequestMapping("/api")
public class CitaController {

	@Autowired
	private CitaRepository citaRepository;
	
	@Autowired
	private CitaService citaService;
	
	@GetMapping("/citas")
    public List<Cita> obtenerCitas(){
    		List<Cita> x = citaRepository.findAll();
        return x;
    }
	
	@PostMapping("/guardarCita")
	public Cita guardarCita(@RequestBody Cita cita) throws Exception {
		return citaService.guardarCita(cita);
		
	}
	
	@GetMapping("/citas/{usuarioId}")
    public List<Cita> obtenerCitasDeUsuario(@PathVariable int usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return citaService.getCitasPorUsuario(usuario);
    }
}
