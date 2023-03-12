package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Servicio;
import com.barberia.elpirata.repositorios.ServicioRepository;
import com.barberia.elpirata.servicios.ServicioService;

@Service
public class ServicioServiceImpl implements ServicioService{

	@Autowired
	private ServicioRepository barberiaRepository;
	
	@Override
	public Servicio guardarServicio(Servicio servicio) throws Exception {
		
		 // Verificar si la peluquería ya existe
	    Servicio servicioExistente = barberiaRepository.findByNombre(servicio.getNombre());
	    
	    if (servicioExistente != null) {
	        System.out.println("El Servicio de peluqueria ya existe");
	        throw new Exception("El servicio de peluqueria ya existe");
	    }

	    // Guardar la nueva peluquería
	    return barberiaRepository.save(servicio);
	}
	@Override
	public void eliminarServicio(Long servicioId) throws Exception {
	    Servicio servicio = barberiaRepository.findById(servicioId).orElse(null);
	    if (servicio == null) {
	        throw new Exception("Servicio no encontrado");
	    }
	    barberiaRepository.delete(servicio);
	}


}
