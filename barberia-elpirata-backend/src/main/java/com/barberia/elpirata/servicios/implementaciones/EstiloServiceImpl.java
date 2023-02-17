
package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Estilo;
import com.barberia.elpirata.repositorios.EstiloRepository;
import com.barberia.elpirata.servicios.EstiloService;

@Service
public class EstiloServiceImpl implements EstiloService{

	@Autowired
	private EstiloRepository estiloRepository;
	
	@Override
	public Estilo guardarEstilo(Estilo estilo) throws Exception {
		
		 // Verificar si el estilo ya existe
	    Estilo estiloExistente = estiloRepository.findByNombre(estilo.getNombre());
	    
	    if (estiloExistente != null) {
	        System.out.println("El estilo ya existe");
	        throw new Exception("El estilo ya existe");
	    }

	    // Guardar el nuevo estilo
	    return estiloRepository.save(estilo);
	}

}