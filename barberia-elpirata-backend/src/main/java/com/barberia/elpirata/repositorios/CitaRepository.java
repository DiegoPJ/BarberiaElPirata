package com.barberia.elpirata.repositorios;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Cita;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long>{

	public Cita findByUsuario(String usuario);
	public Cita findByFecha(Date fecha);
}
