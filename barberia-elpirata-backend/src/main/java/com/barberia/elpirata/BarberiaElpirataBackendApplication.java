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
import com.barberia.elpirata.entidades.Producto;
import com.barberia.elpirata.entidades.Servicio;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Corte;
import com.barberia.elpirata.entidades.Estilo;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.CitaService;
import com.barberia.elpirata.servicios.CorteService;
import com.barberia.elpirata.servicios.EstiloService;
import com.barberia.elpirata.servicios.HorarioService;
import com.barberia.elpirata.servicios.ProductoService;
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
	
	@Autowired
	private ProductoService productoService;
	
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
//
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
//		Producto producto1 = new Producto();
//		producto1.setNombre("Gel Canonico");
//		producto1.setCantidad(20);
//		producto1.setDescripcion(
//				"Gel refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto1.setPrecio(25.2);
//		producto1.setImagen("");
//		productoService.guardarProducto(producto1);
//		
//		Producto producto2 = new Producto();
//		producto2.setNombre("Champu Gay");
//		producto2.setCantidad(20);
//		producto2.setDescripcion(
//				"Champu refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto2.setPrecio(25.2);
//		producto2.setImagen("");
//		productoService.guardarProducto(producto2);
//
//		Producto producto3 = new Producto();
//		producto3.setNombre("Peine X");
//		producto3.setCantidad(20);
//		producto3.setDescripcion(
//				"peine refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto3.setPrecio(25.2);
//		producto3.setImagen("");
//		productoService.guardarProducto(producto3);
//
//		Producto producto4 = new Producto();
//		producto4.setNombre("Paprica Lindo");
//		producto4.setCantidad(20);
//		producto4.setDescripcion(
//				"PapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapri"
//				+ "caPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPapricaPaprica");
//		producto4.setPrecio(25.2);
//		producto4.setImagen("");
//		productoService.guardarProducto(producto4);
//
//		Producto producto5 = new Producto();
//		producto5.setNombre("Cerbeza con b");
//		producto5.setCantidad(20);
//		producto5.setDescripcion(
//				"cerbeza refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto5.setPrecio(25.2);
//		producto5.setImagen("");
//		productoService.guardarProducto(producto5);
//
//		Producto producto6 = new Producto();
//		producto6.setNombre("Ole tu");
//		producto6.setCantidad(20);
//		producto6.setDescripcion(
//				"ÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑA"
//				+ "ÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑAÑAÑAÑAÑÑA");
//		producto6.setPrecio(25.2);
//		producto6.setImagen("");
//		productoService.guardarProducto(producto6);
//
//		Producto producto7 = new Producto();
//		producto7.setNombre("Cafe");
//		producto7.setCantidad(20);
//		producto7.setDescripcion(
//				"Gel refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto7.setPrecio(25.2);
//		producto7.setImagen("");
//		productoService.guardarProducto(producto7);
//
//		Producto producto8 = new Producto();
//		producto8.setNombre("Jazmin");
//		producto8.setCantidad(20);
//		producto8.setDescripcion(
//				"Gel refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto8.setPrecio(25.2);
//		producto8.setImagen("");
//		productoService.guardarProducto(producto8);
//
//		Producto producto9 = new Producto();
//		producto9.setNombre("Rinoceronte");
//		producto9.setCantidad(20);
//		producto9.setDescripcion(
//				"Rino refrescante de alta calidad con aroma a menta, ideal para aliviar dolores"
//				+ " musculares y fatiga en cualquier momento del día.");
//		producto9.setPrecio(25.2);
//		producto9.setImagen("");
//		productoService.guardarProducto(producto9);

	}
}
