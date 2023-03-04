package com.barberia.elpirata.servicios.implementaciones;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.AuthorityName;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.RolRepository;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RolRepository rolRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Usuario guardarUsuario(Usuario usuario) throws Exception {
		Usuario usuarioLocal = usuarioRepository.findByEmail(usuario.getEmail());
		if (usuarioLocal != null) {
			System.out.println("El usuario ya existe");
			throw new Exception("El usuario ya existe");
		} else {
			String password = usuario.getContraseña();
			String encodedPassword = passwordEncoder.encode(password);
			usuario.setContraseña(encodedPassword);
//			Rol rol = new Rol();
//			rol.setNombre(AuthorityName.USUARIO);
//			List<Rol> roles = new ArrayList<>();
//			roles.add(rol);
//			usuario.setRoles(roles);
			usuarioLocal = usuarioRepository.save(usuario);
		}
		return usuarioLocal;
	}

	@Override
	public Usuario obtenerEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

	@Override
	public void eliminarUsuario(Long usuarioId) {
		usuarioRepository.deleteById(usuarioId);
	}

}