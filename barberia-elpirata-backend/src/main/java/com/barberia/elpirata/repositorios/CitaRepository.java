package com.barberia.elpirata.repositorios;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Usuario;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long>{
	
    public List<Cita> findAllByOrderByFechaInicioAsc();

	public List<Cita> findByUsuario(Usuario usuario);
	public Cita findByfechaInicio(Timestamp fechaInicio);

}