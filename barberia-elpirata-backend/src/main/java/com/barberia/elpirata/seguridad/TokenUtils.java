package com.barberia.elpirata.seguridad;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class TokenUtils {

	private final static String ACCESS_TOKEN_SECRET = "412haKQMnasnaja6127Aasj212nas32jsa1ñPm2hfU";
	private final static Long ACCESS_TOKEN_VALIDITY_SECONDS = 2_592_000L;
	
	public static String createToken(String nombre,String email,Collection<? extends GrantedAuthority> rolesGrants) {
		long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1000;
		Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);
		List<String> roles = new ArrayList<>();
		 
		for (GrantedAuthority grantedAuthority : rolesGrants) {
		    roles.add(grantedAuthority.getAuthority());
		}
		Map<String, Object> extra = new HashMap<>();
		extra.put("nombre", nombre);
	    extra.put("roles", roles);

		return Jwts.builder()
				.setSubject(email)
				.setExpiration(expirationDate)
				.addClaims(extra)
				.signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
				.compact();
	}
	
	public static UsernamePasswordAuthenticationToken getAuthentification(String token) {
		
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
					.build()
					.parseClaimsJws(token)
					.getBody();
			
			String username = claims.getSubject();
			 List<String> roles = claims.get("roles", List.class);
		        List<GrantedAuthority> authorities = roles.stream()
		                .map(role -> new SimpleGrantedAuthority(""+ role))
		                .collect(Collectors.toList());
			return new UsernamePasswordAuthenticationToken(username, null,authorities);
		} catch (JwtException e) {
			return null;
		}
		
	}
}