package com.progra.personas.logic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class Model {

    private static Model uniqueInstance;
    
    public static Model instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Model();
        }
        return uniqueInstance;
    }
    
    HashMap<String,Persona> personas;
    
    private Model(){
        personas = new HashMap<String,Persona> ();
        personas.put("111", new Persona("111","Juan","M"));
        personas.put("222", new Persona("222","Maria","F"));
    }

    public List<Persona> personaListAll() {
        return new ArrayList(personas.values());
    } 
    
    public List<Persona> personaSearch(String nombre) {
        List<Persona> result = new ArrayList<>();
        for(Persona p:personas.values()){
            if(p.getNombre().contains(nombre)) result.add(p);
        }
        return result;
    } 
    public Persona personaAdd(Persona per)throws Exception {
        if (personas.get(per.getCedula())!=null){
            throw new Exception ("406-persona ya existe");
        }
        else{
            personas.put(per.getCedula(),per);
            return per;
        }
    }
    
    public void personaUpdate(Persona per)throws Exception {
        if (personas.get(per.getCedula())==null){
            throw new Exception ("404-persona no existe");
        }
        else{
            personas.put(per.getCedula(), per);
        }
    }
    
    public void personaDelete(String cedula)throws Exception {
        if (personas.get(cedula)==null){
            throw new Exception ("404-persona no existe");
        }
        else{
            personas.remove(cedula);
        }
    }
    
    public Persona personaEdit(String cedula)throws Exception {
        if (personas.get(cedula)!=null){
            return personas.get(cedula);
            
        }
        else{
            throw new Exception ("404-persona no existe");
        }
    }
    
}
