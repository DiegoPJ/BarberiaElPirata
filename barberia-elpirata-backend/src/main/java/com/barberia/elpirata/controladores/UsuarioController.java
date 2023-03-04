package com.barberia.elpirata.controladores;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.servicios.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired 
    private UsuarioRepository usuarioRepository;
    
   
    
    @PostMapping("/guardarUsuario")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) throws Exception{
        return usuarioService.guardarUsuario(usuario);
    }

    @GetMapping("/todosLosUsuarios")
    public List<Usuario> obtenerUsuarios(){
    		List<Usuario> x = usuarioRepository.findAll();
        return x;
    }
    @GetMapping("/{email}")
    public Usuario obtenerEmail(@PathVariable String email){
        return usuarioService.obtenerEmail(email);
    }

    @DeleteMapping("/{usuarioId}")
    public void eliminarUsuario(@PathVariable("usuarioId") Long usuarioId){
        usuarioService.eliminarUsuario(usuarioId);
    }

}
