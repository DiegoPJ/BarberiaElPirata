package com.barberia.elpirata.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Horario;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long>{
	
	 public List<Horario> findAll();

	public Horario findByDiaSemana(String diaSemana);

}
