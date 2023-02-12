package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.repositorios.HorarioRepository;
import com.barberia.elpirata.servicios.HorarioService;

@Service
public class HorarioServiceImpl implements HorarioService{

	@Autowired
	private HorarioRepository horarioRepository;
	

	@Override
	public Horario guardarHorario(String diaSemana, String horaAperMañ, String horaCierrMañ, String horaAperTar,
			String horaCierrTar) {
		
		Horario horario = horarioRepository.findByDiaSemana(diaSemana);
		if (horario == null) {
		Horario horarioNuevo = new Horario(diaSemana,horaAperMañ,horaCierrMañ,horaAperTar,horaCierrTar);
		return horarioRepository.save(horarioNuevo);
		}else {
			horario.setHora_apertura_mañana(horaAperMañ);
			horario.setHora_apertura_tarde(horaCierrMañ);
			horario.setHora_cierre_mañana(horaAperTar);
			horario.setHora_cierre_tarde(horaCierrTar);
			
			return horarioRepository.save(horario);

		}

	}

}
