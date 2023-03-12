package com.barberia.elpirata.servicios;

import com.barberia.elpirata.entidades.Corte;

public interface CorteService {

	public Corte guardarCorte(Corte corte) throws Exception;

	void eliminarCorte(Long corteId) throws Exception;

	
}