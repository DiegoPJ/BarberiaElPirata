package com.barberia.elpirata;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.CitaService;
import com.barberia.elpirata.servicios.HorarioService;
import com.barberia.elpirata.servicios.UsuarioService;
import com.barberia.elpirata.servicios.implementaciones.CitasServiceImpl;

@SpringBootApplication
public class BarberiaElpirataBackendApplication implements CommandLineRunner {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private HorarioService horarioService;

	@Autowired
	private CitaService citaService;
	
	
	public static void main(String[] args) {
		SpringApplication.run(BarberiaElpirataBackendApplication.class, args);
		
	}

	@Override
	public void run(String... args) throws Exception {
		
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String password = passwordEncoder.encode("0000");
//		System.out.println(password);
//		
//		// crear Horario
//
//		Horario horario = new Horario();
//		horario.setDiaSemana("Lunes");
//		horario.setHora_apertura_mañana("10:00");
//		horario.setHora_cierre_mañana("14:00");
//		horario.setHora_apertura_tarde("16:00");
//		horario.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario.getDiaSemana(), horario.getHora_apertura_mañana(),
//				horario.getHora_cierre_mañana(), horario.getHora_apertura_tarde(), horario.getHora_cierre_tarde());
//
//		Horario horario2 = new Horario();
//		horario2.setDiaSemana("Martes");
//		horario2.setHora_apertura_mañana("09:00");
//		horario2.setHora_cierre_mañana("14:00");
//		horario2.setHora_apertura_tarde("16:00");
//		horario2.setHora_cierre_tarde("23:00");
//
//		horarioService.guardarHorario(horario2.getDiaSemana(), horario2.getHora_apertura_mañana(),
//				horario2.getHora_cierre_mañana(), horario2.getHora_apertura_tarde(), horario2.getHora_cierre_tarde());
//
//		Horario horario3 = new Horario();
//		horario3.setDiaSemana("Miércoles");
//		horario3.setHora_apertura_mañana("11:00");
//		horario3.setHora_cierre_mañana("14:00");
//		horario3.setHora_apertura_tarde("16:00");
//		horario3.setHora_cierre_tarde("22:00");
//
//		horarioService.guardarHorario(horario3.getDiaSemana(), horario3.getHora_apertura_mañana(),
//				horario3.getHora_cierre_mañana(), horario3.getHora_apertura_tarde(), horario3.getHora_cierre_tarde());
//
//		Horario horario4 = new Horario();
//		horario4.setDiaSemana("Jueves");
//		horario4.setHora_apertura_mañana("12:00");
//		horario4.setHora_cierre_mañana("14:00");
//		horario4.setHora_apertura_tarde("16:00");
//		horario4.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario4.getDiaSemana(), horario4.getHora_apertura_mañana(),
//				horario4.getHora_cierre_mañana(), horario4.getHora_apertura_tarde(), horario4.getHora_cierre_tarde());
//
//		Horario horario5 = new Horario();
//		horario5.setDiaSemana("Viernes");
//		horario5.setHora_apertura_mañana("10:00");
//		horario5.setHora_cierre_mañana("14:00");
//		horario5.setHora_apertura_tarde("16:00");
//		horario5.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario5.getDiaSemana(), horario5.getHora_apertura_mañana(),
//				horario5.getHora_cierre_mañana(), horario5.getHora_apertura_tarde(), horario5.getHora_cierre_tarde());
//
//		Horario horario6 = new Horario();
//		horario6.setDiaSemana("Sábado");
//		horario6.setHora_apertura_mañana("10:00");
//		horario6.setHora_cierre_mañana("14:00");
//		horario6.setHora_apertura_tarde("16:00");
//		horario6.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario6.getDiaSemana(), horario6.getHora_apertura_mañana(),
//				horario6.getHora_cierre_mañana(), horario6.getHora_apertura_tarde(), horario6.getHora_cierre_tarde());
//
//		Horario horario7 = new Horario();
//		horario7.setDiaSemana("Domingo");
//		horario7.setHora_apertura_mañana("10:00");
//		horario7.setHora_cierre_mañana("14:00");
//		horario7.setHora_apertura_tarde("16:00");
//		horario7.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario7.getDiaSemana(), horario7.getHora_apertura_mañana(),
//				horario7.getHora_cierre_mañana(), horario7.getHora_apertura_tarde(), horario7.getHora_cierre_tarde());
//
//		// creas usuario
//		Usuario usuario = new Usuario();
//		usuario.setNombre("Diego");
//		usuario.setEmail("d@d.com");
//		usuario.setUsername("emca");
//		usuario.setContraseña("0000");
//		usuario.setTelefono("222");
//
//		// creas rol
//		Rol rol = new Rol();
//		rol.setRolId(1L);
//		rol.setNombre("admin");
//
//		// creas mapa
//		Set<UsuarioRol> usuarioRoles = new HashSet<>();
//		// crear la asociacion entre los dos
//		UsuarioRol usuarioRol = new UsuarioRol();
//		usuarioRol.setRol(rol);
//		usuarioRol.setUsuario(usuario);
//		usuarioRoles.add(usuarioRol);
//
//		usuarioService.guardarUsuario(usuario, usuarioRoles);
//
//		/// CITAS
//		Optional<Usuario> optionalUsuario = Optional.ofNullable(usuarioRepository.findByEmail("d@d.com"));
//		if (optionalUsuario.isPresent()) {
//		    Usuario usuario2 = optionalUsuario.get();
//		SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date date = formato.parse("2023-02-19 12:00:00");
//		Cita cita = new Cita();
//		cita.setUsuario(usuario2);
//		cita.setFecha(date);
//		
//		citaService.guardarCita(cita);
//
//		Date date2 = formato.parse("2023-02-19 18:00:00");
//		Cita cita2 = new Cita();
//		cita2.setUsuario(usuario2);
//		cita2.setFecha(date2);
//		
//		citaService.guardarCita(cita2);
//		}
	}
}
