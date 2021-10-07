package com.progra.personas.logic;


public class Persona{
    String cedula;
    String nombre;
    String sexo;

    public Persona(String cedula, String nombre, String sexo) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.sexo = sexo;
    }

    
    public Persona() {
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String Sexo) {
        this.sexo = Sexo;
    }
    
    
}
