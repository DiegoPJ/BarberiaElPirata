package com.barberia.elpirata.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.barberia.elpirata.entidades.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
 public Usuario findByUsername(String username);
 public Usuario findByEmail(String email);
 public List<Usuario> findAll();
 	Optional<Usuario> findOneByEmail(String email);
 	
 	  @Query("SELECT c FROM Usuario u LEFT JOIN u.citas c ON u.id = c.usuario")
 	   public List <Usuario> findAllWithCitas();
 	    public void deleteByEmail(String email);
}
