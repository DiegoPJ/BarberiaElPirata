package com.barberia.elpirata.servicios;

import com.barberia.elpirata.entidades.Horario;

public interface HorarioService {

	public Horario guardarHorario(String diaSemana,String horaAperMañ, String horaCierrMañ
								,String horaAperTar,String horaCierrTar);
	
}
