package com.barberia.elpirata.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Barberia;

@Repository
public interface BarberiaRepository extends JpaRepository<Barberia, Long>{
	
	 public List<Barberia> findAll();
	 public Barberia findByNombre(String nombre);

}
