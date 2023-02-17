package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Barberia;
import com.barberia.elpirata.repositorios.BarberiaRepository;
import com.barberia.elpirata.servicios.BarberiaService;

@Service
public class BarberiaServiceImpl implements BarberiaService{

	@Autowired
	private BarberiaRepository barberiaRepository;
	
	@Override
	public Barberia guardarBarberia(Barberia barberia) throws Exception {
		
		 // Verificar si la peluquería ya existe
	    Barberia barberiaExistente = barberiaRepository.findByNombre(barberia.getNombre());
	    
	    if (barberiaExistente != null) {
	        System.out.println("El Servicio de peluqueria ya existe");
	        throw new Exception("El servicio de peluqueria ya existe");
	    }

	    // Guardar la nueva peluquería
	    return barberiaRepository.save(barberia);
	}

}
