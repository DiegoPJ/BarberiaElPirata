package com.barberia.elpirata;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;
import com.barberia.elpirata.servicios.HorarioService;
import com.barberia.elpirata.servicios.UsuarioService;

@SpringBootApplication
public class BarberiaElpirataBackendApplication implements CommandLineRunner{

	@Autowired 
	private UsuarioService usuarioService;
	
	@Autowired
	private HorarioService horarioService;
	
	public static void main(String[] args) {
		SpringApplication.run(BarberiaElpirataBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		//crear Horario
		
		Horario horario = new Horario();
		horario.setId(1);
		horario.setDiaSemana("Lunes");
		horario.setHora_apertura_mañana("10:00");
		horario.setHora_cierre_mañana("14:00");
		horario.setHora_apertura_tarde("16:00");
		horario.setHora_cierre_tarde("21:00");
		
		horarioService.guardarHorario(horario.getDiaSemana(), 
				horario.getHora_apertura_mañana(), horario.getHora_cierre_mañana(), 
				horario.getHora_apertura_tarde(), horario.getHora_cierre_tarde());
		
		Horario horario2 = new Horario();
		horario.setId(2);
		horario2.setDiaSemana("Martes");
		horario2.setHora_apertura_mañana("09:00");
		horario2.setHora_cierre_mañana("14:00");
		horario2.setHora_apertura_tarde("16:00");
		horario2.setHora_cierre_tarde("23:00");
		
		horarioService.guardarHorario(horario2.getDiaSemana(), 
				horario2.getHora_apertura_mañana(), horario2.getHora_cierre_mañana(), 
				horario2.getHora_apertura_tarde(), horario2.getHora_cierre_tarde());
		
		Horario horario3 = new Horario();
		horario.setId(3);
		horario3.setDiaSemana("Miercoles");
		horario3.setHora_apertura_mañana("11:00");
		horario3.setHora_cierre_mañana("14:00");
		horario3.setHora_apertura_tarde("16:00");
		horario3.setHora_cierre_tarde("22:00");
		
		horarioService.guardarHorario(horario3.getDiaSemana(), 
				horario3.getHora_apertura_mañana(), horario3.getHora_cierre_mañana(), 
				horario3.getHora_apertura_tarde(), horario3.getHora_cierre_tarde());
		
		Horario horario4 = new Horario();
		horario.setId(4);
		horario4.setDiaSemana("Jueves");
		horario4.setHora_apertura_mañana("12:00");
		horario4.setHora_cierre_mañana("14:00");
		horario4.setHora_apertura_tarde("16:00");
		horario4.setHora_cierre_tarde("21:00");
		
		horarioService.guardarHorario(horario4.getDiaSemana(), 
				horario4.getHora_apertura_mañana(), horario4.getHora_cierre_mañana(), 
				horario4.getHora_apertura_tarde(), horario4.getHora_cierre_tarde());
		
		Horario horario5 = new Horario();
		horario.setId(5);
		horario5.setDiaSemana("Viernes");
		horario5.setHora_apertura_mañana("10:00");
		horario5.setHora_cierre_mañana("14:00");
		horario5.setHora_apertura_tarde("16:00");
		horario5.setHora_cierre_tarde("21:00");
		
		horarioService.guardarHorario(horario5.getDiaSemana(), 
				horario5.getHora_apertura_mañana(), horario5.getHora_cierre_mañana(), 
				horario5.getHora_apertura_tarde(), horario5.getHora_cierre_tarde());
		
		Horario horario6 = new Horario();
		horario.setId(6);
		horario6.setDiaSemana("Sabado");
		horario6.setHora_apertura_mañana("10:00");
		horario6.setHora_cierre_mañana("14:00");
		horario6.setHora_apertura_tarde("16:00");
		horario6.setHora_cierre_tarde("21:00");
		
		horarioService.guardarHorario(horario6.getDiaSemana(), 
				horario6.getHora_apertura_mañana(), horario6.getHora_cierre_mañana(), 
				horario6.getHora_apertura_tarde(), horario6.getHora_cierre_tarde());
		
		Horario horario7 = new Horario();
		horario.setId(7);
		horario7.setDiaSemana("Domingo");
		horario7.setHora_apertura_mañana("10:00");
		horario7.setHora_cierre_mañana("14:00");
		horario7.setHora_apertura_tarde("16:00");
		horario7.setHora_cierre_tarde("21:00");
		
		horarioService.guardarHorario(horario7.getDiaSemana(), 
				horario7.getHora_apertura_mañana(), horario7.getHora_cierre_mañana(), 
				horario7.getHora_apertura_tarde(), horario7.getHora_cierre_tarde());
 /*
		//creas usuario
		Usuario usuario = new Usuario();
		usuario.setNombre("Diego");
		usuario.setApellido("pastor");
		usuario.setEmail("d@d.com");
		usuario.setUsername("emca");
		usuario.setPassword("0000");
		usuario.setTelefono("222");
		usuario.setPerfil("foto.png");
		usuario.equals(true);
		
		//creas rol
		Rol rol = new Rol();
		rol.setRolId(1L);
		rol.setNombre("admin");
		
		//creas mapa
		Set<UsuarioRol> usuarioRoles = new HashSet<>();
		//crear la asociacion entre los dos
		UsuarioRol usuarioRol = new UsuarioRol();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);
		
		Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario,usuarioRoles);
		
		System.out.println(usuarioGuardado.getUsername());
	*/}

}
