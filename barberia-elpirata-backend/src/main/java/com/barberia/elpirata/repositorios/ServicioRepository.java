package com.barberia.elpirata.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long>{
	
	 public List<Servicio> findAll();
	 public Servicio findByNombre(String nombre);
	 public Servicio findById(int id);
		public void deleteById(Long id);

}
