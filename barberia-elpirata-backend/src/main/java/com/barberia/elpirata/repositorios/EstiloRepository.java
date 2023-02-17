package com.barberia.elpirata.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Estilo;

@Repository
public interface EstiloRepository extends JpaRepository<Estilo, Long>{
	
	 public List<Estilo> findAll();
	 public Estilo findByNombre(String nombre);

}