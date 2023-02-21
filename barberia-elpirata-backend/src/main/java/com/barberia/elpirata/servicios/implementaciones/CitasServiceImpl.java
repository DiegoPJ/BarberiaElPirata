package com.barberia.elpirata.servicios.implementaciones;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.entidades.Estilo;
import com.barberia.elpirata.entidades.Servicio;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.CitaRepository;
import com.barberia.elpirata.repositorios.CorteRepository;
import com.barberia.elpirata.repositorios.EstiloRepository;
import com.barberia.elpirata.repositorios.ServicioRepository;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.CitaService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class CitasServiceImpl implements CitaService{

	@Autowired
	private CitaRepository citaRepository;
	
	@Autowired
	private ServicioRepository servicioRepository;
	
	@Autowired
	private CorteRepository corteRepository;
	
	@Autowired
	private EstiloRepository estiloRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
		
	
	@Override
	@Transactional
	public Cita guardarCita(Cita cita) throws Exception {
	    Long usuarioId = cita.getUsuario().getId();

	    Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

	    if (!usuarioOptional.isPresent()) {
	        throw new Exception("No se encontró el usuario con id " + usuarioId);
	    }

	    Usuario usuario = usuarioOptional.get();

	    List<Servicio> servicios = new ArrayList<>();

	    for (Servicio servicio : cita.getServicio()) {
	        Long servicioId = servicio.getId();
	        Optional<Servicio> servicioOptional = servicioRepository.findById(servicioId);

	        if (!servicioOptional.isPresent()) {
	            throw new Exception("No se encontró el servicio con id " + servicioId);
	        }

	        servicios.add(servicioOptional.get());
	    }

	    List<Corte> cortes = new ArrayList<>();

	    for (Corte corte : cita.getCorte()) {
	        Long corteId = corte.getId();
	        Optional<Corte> corteOptional = corteRepository.findById(corteId);

	        if (!corteOptional.isPresent()) {
	            throw new Exception("No se encontró el corte con id " + corteId);
	        }

	        cortes.add(corteOptional.get());
	    }

	    List<Estilo> estilos = new ArrayList<>();

	    for (Estilo estilo : cita.getEstilo()) {
	        Long estiloId = estilo.getId();
	        Optional<Estilo> estiloOptional = estiloRepository.findById(estiloId);

	        if (!estiloOptional.isPresent()) {
	            throw new Exception("No se encontró el estilo con id " + estiloId);
	        }

	        estilos.add(estiloOptional.get());
	    }

	    cita.setUsuario(usuario);
	    cita.setServicio(servicios);
	    cita.setCorte(cortes);
	    cita.setEstilo(estilos);

	    return citaRepository.save(cita);
	}
	
	public List <Cita> getCitasPorUsuario(Usuario usuario) {
        return citaRepository.findByUsuario(usuario);
    }

    @Override
    public void eliminarCita(Long id) {
        citaRepository.deleteById(id);
    }

}
