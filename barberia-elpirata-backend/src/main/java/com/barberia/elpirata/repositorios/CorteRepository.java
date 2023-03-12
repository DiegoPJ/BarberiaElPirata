package com.barberia.elpirata.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Corte;

@Repository
public interface CorteRepository extends JpaRepository<Corte, Long>{
	
	 public List<Corte> findAll();
	 public Corte findByNombre(String nombre);
		public void deleteById(Long id);

	 
}