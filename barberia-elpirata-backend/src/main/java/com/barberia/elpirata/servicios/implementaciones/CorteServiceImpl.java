
package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.repositorios.CorteRepository;
import com.barberia.elpirata.servicios.CorteService;

@Service
public class CorteServiceImpl implements CorteService{

	@Autowired
	private CorteRepository corteRepository;
	
	@Override
	public Corte guardarCorte(Corte corte) throws Exception {
		
		 // Verificar si el corte ya existe
	    Corte corteExistente = corteRepository.findByNombre(corte.getNombre());
	    
	    if (corteExistente != null) {
	        System.out.println("El corte ya existe");
	        throw new Exception("El corte ya existe");
	    }

	    // Guardar el nuevo corte
	    return corteRepository.save(corte);
	}
	
	@Override
	public void eliminarCorte(Long corteId) throws Exception {
	    Corte corte = corteRepository.findById(corteId).orElse(null);
	    if (corte == null) {
	        throw new Exception("Corte no encontrado");
	    }
	    corteRepository.delete(corte);
	}


}