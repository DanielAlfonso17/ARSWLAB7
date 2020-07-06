package edu.escuelaing.arsw.tictactoe;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.Session;

public class Sala {
	private String nombre;
	private List<Session> sesiones;
	
	public Sala(String nombre) {
		this.nombre = nombre;
		sesiones = new ArrayList<Session>();
	}
	
	public void addSession(Session sesion) {
		sesiones.add(sesion);
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Session> getSesiones() {
		return sesiones;
	}

	public void setSesiones(List<Session> sesiones) {
		this.sesiones = sesiones;
	}
	
	
	

}
