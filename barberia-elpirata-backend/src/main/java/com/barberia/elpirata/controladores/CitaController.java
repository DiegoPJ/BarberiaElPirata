package com.barberia.elpirata.controladores;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	
	@DeleteMapping("/eliminarCita/{id}")
	public ResponseEntity<String> eliminarCita(@PathVariable Long id) {
	    Optional<Cita> cita = citaRepository.findById(id);
	    if (cita.isPresent()) {
	        // Eliminar las filas relacionadas en la tabla cita_servicio
	        cita.get().getServicio().clear();
	        cita.get().getCorte().clear();
	        cita.get().getEstilo().clear();
	        cita.get().getUsuario().getCitas().clear();
	        citaRepository.save(cita.get());
	        // Eliminar la fila correspondiente en la tabla cita
	        citaRepository.delete(cita.get());
	        return new ResponseEntity<>("Cita eliminada", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Cita no encontrada", HttpStatus.NOT_FOUND);
	    }
	}
	
	@GetMapping("/citas/{usuarioId}")
    public List<Cita> obtenerCitasDeUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return citaService.getCitasPorUsuario(usuario);
    }
}
