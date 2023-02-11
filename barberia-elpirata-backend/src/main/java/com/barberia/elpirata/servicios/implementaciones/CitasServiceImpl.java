package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.repositorios.CitaRepository;
import com.barberia.elpirata.servicios.CitasService;

@Service
public class CitasServiceImpl implements CitasService{

	@Autowired
	private CitaRepository citaRepository;
		
	
	@Override
	public Cita guardarCita(Cita cita) throws Exception {
		Cita citaBD = citaRepository.findByFechaAndHora(cita.getFecha(), cita.getHora())	;
		if(citaBD.getFecha() == cita.getFecha() && citaBD.getHora() == cita.getHora()) {
			System.out.println("La cita ya esta cogida");
            throw new Exception("La cita ya esta cogida");
		}else {
			return citaRepository.save(cita);
		}
	}

}
