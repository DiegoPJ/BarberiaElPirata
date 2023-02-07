package com.barberia.elpirata.servicios.implementaciones;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;
import com.barberia.elpirata.repositorios.RolRepository;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.UsuarioService;
@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception {
        Usuario usuarioLocal = usuarioRepository.findByEmail(usuario.getEmail());

        if(usuarioLocal != null){
            System.out.println("El usuario ya existe");
            throw new Exception("El usuario ya existe");
        }
        else{
            for(UsuarioRol usuarioRol:usuarioRoles){
                rolRepository.save(usuarioRol.getRol());
            }
            usuario.getUsuarioRoles().addAll(usuarioRoles);
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