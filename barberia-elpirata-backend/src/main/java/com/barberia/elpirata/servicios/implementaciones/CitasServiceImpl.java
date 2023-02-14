package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.repositorios.CitaRepository;
import com.barberia.elpirata.servicios.CitaService;

@Service
public class CitasServiceImpl implements CitaService{

	@Autowired
	private CitaRepository citaRepository;
		
	
	@Override
	public Cita guardarCita(Cita cita) throws Exception {
		Cita citaBD = citaRepository.findByFecha(cita.getFecha())	;
		if(citaBD.getFecha() == cita.getFecha()) {
			System.out.println("La cita ya esta cogida");
            throw new Exception("La cita ya esta cogida");
		}else {
			return citaRepository.save(cita);
		}
	}

}
