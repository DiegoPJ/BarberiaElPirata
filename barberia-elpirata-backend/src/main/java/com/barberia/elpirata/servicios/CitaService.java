package com.barberia.elpirata.servicios;


import java.util.List;
import java.util.Optional;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Usuario;

public interface CitaService {

	public Cita guardarCita(Cita cita) throws Exception;
	public List <Cita> getCitasPorUsuario(Usuario usuario);
	public void eliminarCita(Long id);

}
