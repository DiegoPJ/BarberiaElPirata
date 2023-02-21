package com.barberia.elpirata.servicios.implementaciones;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.CitaRepository;
import com.barberia.elpirata.servicios.CitaService;
import java.util.List;
@Service
public class CitasServiceImpl implements CitaService{

	@Autowired
	private CitaRepository citaRepository;
		
	
	@Override
	public Cita guardarCita(Cita cita) throws Exception {
		Cita citaBD = citaRepository.findByFecha(cita.getFecha());
		if(citaBD == null) {
			SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = formato.parse(cita.getFecha().toString());
			cita.setFecha(new Timestamp(date.getTime()));;
			
			
			return citaRepository.save(cita);
		}else {
			System.out.println("La cita ya esta cogida");
            throw new Exception("La cita ya esta cogida");		}
	}
	
	public List <Cita> getCitasPorUsuario(Usuario usuario) {
        return citaRepository.findByUsuario(usuario);
    }

}
