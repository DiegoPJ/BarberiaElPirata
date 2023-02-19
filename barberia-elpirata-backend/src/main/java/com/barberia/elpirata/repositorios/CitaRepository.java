package com.barberia.elpirata.repositorios;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Usuario;

import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long>{
	
	public List<Cita>  findAll();
	public List<Cita> findByUsuario(Usuario usuario);
	public Cita findByFecha(Date fecha);
}
