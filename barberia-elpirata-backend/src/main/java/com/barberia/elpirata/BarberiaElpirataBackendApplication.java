package com.barberia.elpirata;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.barberia.elpirata.entidades.Cita;
import com.barberia.elpirata.entidades.Horario;
import com.barberia.elpirata.entidades.Servicio;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.entidades.Estilo;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.CitaService;
import com.barberia.elpirata.servicios.CorteService;
import com.barberia.elpirata.servicios.EstiloService;
import com.barberia.elpirata.servicios.HorarioService;
import com.barberia.elpirata.servicios.ServicioService;
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

	@Autowired
	private ServicioService servicioService;

	@Autowired
	private CorteService corteService;

	@Autowired
	private EstiloService estiloService;

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
//		horarioService.guardarHorario(horario);
//
//		Horario horario2 = new Horario();
//		horario2.setDiaSemana("Martes");
//		horario2.setHora_apertura_mañana("09:00");
//		horario2.setHora_cierre_mañana("14:00");
//		horario2.setHora_apertura_tarde("16:00");
//		horario2.setHora_cierre_tarde("23:00");
//
//		horarioService.guardarHorario(horario2);
//
//		Horario horario3 = new Horario();
//		horario3.setDiaSemana("Miércoles");
//		horario3.setHora_apertura_mañana("11:00");
//		horario3.setHora_cierre_mañana("14:00");
//		horario3.setHora_apertura_tarde("16:00");
//		horario3.setHora_cierre_tarde("22:00");
//
//		horarioService.guardarHorario(horario3);
//
//		Horario horario4 = new Horario();
//		horario4.setDiaSemana("Jueves");
//		horario4.setHora_apertura_mañana("12:00");
//		horario4.setHora_cierre_mañana("14:00");
//		horario4.setHora_apertura_tarde("16:00");
//		horario4.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario4);
//
//		Horario horario5 = new Horario();
//		horario5.setDiaSemana("Viernes");
//		horario5.setHora_apertura_mañana("10:00");
//		horario5.setHora_cierre_mañana("14:00");
//		horario5.setHora_apertura_tarde("16:00");
//		horario5.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario5);
//
//		Horario horario6 = new Horario();
//		horario6.setDiaSemana("Sábado");
//		horario6.setHora_apertura_mañana("10:00");
//		horario6.setHora_cierre_mañana("14:00");
//		horario6.setHora_apertura_tarde("16:00");
//		horario6.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario6);
//
//		Horario horario7 = new Horario();
//		horario7.setDiaSemana("Domingo");
//		horario7.setHora_apertura_mañana("10:00");
//		horario7.setHora_cierre_mañana("14:00");
//		horario7.setHora_apertura_tarde("16:00");
//		horario7.setHora_cierre_tarde("21:00");
//
//		horarioService.guardarHorario(horario7);
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


//		Servicio servicio1 = new Servicio();
//		servicio1.setNombre("Peluqueria");
//		servicioService.guardarServicio(servicio1);
//		
//		Servicio servicio2 = new Servicio();
//		servicio2.setNombre("Cejas");
//		servicio2.setPrecio(2);
//		servicioService.guardarServicio(servicio2);
//		
//		Servicio servicio3 = new Servicio();
//		servicio3.setNombre("Barba");
//		servicio3.setPrecio(5);
//		servicioService.guardarServicio(servicio3);
//		
//		
//		
//		Corte corte1 = new Corte();
//		corte1.setNombre("Corte Clasico");
//		corte1.setPrecio(8.0);
//		corte1.setSuplemento("Lavado");
//		corte1.setServicio(servicio1);
//		corteService.guardarCorte(corte1);
//		
//		Corte corte2 = new Corte();
//		corte2.setNombre("Degradado");
//		corte2.setPrecio(10.0);
//		corte2.setSuplemento("Lavado");
//		corte2.setServicio(servicio1);
//		corteService.guardarCorte(corte2);
//
//		
//		Corte corte3 = new Corte();
//		corte3.setNombre("Afeitado De Cabeza");
//		corte3.setPrecio(5.0);
//		corte3.setServicio(servicio1);
//		corteService.guardarCorte(corte3);
//
//		Corte corte4 = new Corte();
//		corte4.setNombre("Degradado De Barba");
//		corte4.setPrecio(5.0);
//		corte4.setServicio(servicio3);
//		corteService.guardarCorte(corte4);
//
//		
//		Estilo estilo1 = new Estilo();
//		estilo1.setNombre("Mohicano");
//		estilo1.setPrecio(12.0);
//		estilo1.setSuplemento("Lavado");
//		estilo1.setCorte(corte2);
//		estiloService.guardarEstilo(estilo1);
//
//	
//		Optional<Usuario> optionalUsuario = Optional.ofNullable(usuarioRepository.findByEmail("d@d.com"));
//		if (optionalUsuario.isPresent()) {
//			
//			Usuario usuario2 = optionalUsuario.get();
//			SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			Date date = formato.parse("2023-02-19 12:00:00");
//			Cita cita = new Cita();
//			List<Corte> cortes = new ArrayList();
//			cortes.add(corte3);
//			cortes.add(corte4);
//			
//			List<Servicio> servicios = new ArrayList();;
//			servicios.add(servicio2);
//			
//			cita.setUsuario(usuario2);
//			cita.setFecha(new Timestamp(date.getTime()));
//			cita.setCorte(cortes);
//			cita.setServicio(servicios);
//			citaService.guardarCita(cita);
//
//			
//			Date date2 = formato.parse("2023-02-19 18:00:00");
//			Cita cita2 = new Cita();
//			
//			List<Servicio> servicios2 = new ArrayList();;
//			servicios2.add(servicio3);
//			servicios2.add(servicio2);
//					
//			List<Estilo> estilos2 = new ArrayList();;
//			estilos2.add(estilo1);
//			
//			cita2.setUsuario(usuario2);
//			cita2.setFecha(new Timestamp(date2.getTime()));
//			cita2.setServicio(servicios2);
//			cita2.setEstilo(estilos2);
//			citaService.guardarCita(cita2);
//		}
	}
}
