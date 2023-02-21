package com.barberia.elpirata.servicios.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.repositorios.HorarioRepository;
import com.barberia.elpirata.servicios.HorarioService;

@Service
public class HorarioServiceImpl implements HorarioService {
    
    @Autowired
    private HorarioRepository horarioRepository;
    
    @Override
    public Horario guardarHorario(Horario horario) {
        Horario horarioExistente = horarioRepository.findByDiaSemana(horario.getDiaSemana());
        if (horarioExistente == null) {
            return horarioRepository.save(horario);
        } else {
            horarioExistente.setDiaSemana(horario.getDiaSemana());
            horarioExistente.setHora_apertura_mañana(horario.getHora_apertura_mañana());
            horarioExistente.setHora_cierre_mañana(horario.getHora_cierre_mañana());
            horarioExistente.setHora_apertura_tarde(horario.getHora_apertura_tarde());
            horarioExistente.setHora_cierre_tarde(horario.getHora_cierre_tarde());
            return horarioRepository.save(horarioExistente);
        }
    }
}
