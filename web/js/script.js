  var  personas = new Array();
  var persona={cedula:"", nombre:"",sexo:""};
  var mode='A'; //adding
  var url="http://localhost:8080/PersonasIntegradoMultipart/";

  function render(){
	$("#cedula").val(persona.cedula);
	$("#nombre").val(persona.nombre);
        $("input[name='sexo']").val([persona.sexo]);
        switch(mode){
            case 'A':
                $("#cedula" ).prop( "readonly", false );
                $('#aplicar').off('click').on('click', add);
                break;
            case 'E':
                $("#cedula" ).prop( "readonly", true );
                $('#aplicar').off('click').on('click', update);
                break;             
        }
        $("#add-modal #errorDiv").html("");
        $("#add-modal #imagen").val("");        
        $('#add-modal').modal('show');        
  }
  
    function load(){
        persona = Object.fromEntries( (new FormData($("#formulario").get(0))).entries());       
    }
    
    function reset(){
        persona={cedula:"", nombre:"",sexo:""}; 
    }    
 
  function add(){
    load();
    if(!validar()) return;
    let request = new Request(url+'api/personas', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(persona)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
        addImagen();
        fetchAndList();
        reset();
        $('#add-modal').modal('hide');                
    })();    
  }
  
  function addImagen(){
    var imagenData = new FormData();
    imagenData.append("cedula", persona.cedula);
    imagenData.append("imagen", $("#imagen").get(0).files[0]); 
    let request = new Request(url+'api/personas/'+persona.cedula+"/imagen", {method: 'POST',body: imagenData});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}              
    })();    
  }
  
  function update(){
    load();
    if(!validar()) return;
    let request = new Request(url+'api/personas', {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(persona)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
        fetchAndList();
        reset();
        $('#add-modal').modal('hide');                
    })();     
  }
  
  function validar(){
    var error=false;
   $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='text']").filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("input[name='sexo']:checked").length==0;
    if ( $("input[name='sexo']:checked").length==0) $("#formulario input[name='sexo']").addClass("invalid");
    return !error;
  }

  function list(){
    $("#listado").html("");
    personas.forEach( (p)=>{row($("#listado"),p);});	
  }  
  
  function row(listado,persona){
	var tr =$("<tr />");
	tr.html("<td>"+persona.cedula+"</td>"+
                "<td>"+persona.nombre+"</td>"+
                "<td><img src='images/"+persona.sexo+".png' class='icon' ></td>"+
                "<td><img src='"+url+"api/personas/"+persona.cedula+"/imagen' class='icon_large' ></td>"+                
                "<td id='edit'><img src='images/edit.png'></td>");
        tr.find("#edit").on("click",()=>{edit(persona.cedula);});
	listado.append(tr);           
  }
  
  function edit(cedula){
    let request = new Request(url+'api/personas/'+cedula, {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
        persona = await response.json();
        mode='E'; //editing
        render();        
    })();         
      

  }
  
  function makenew(){
      reset();
      mode='A'; //adding
      render();
    }
    
  function search(){
      //to do
  }
  
  function errorMessage(status,place){  
        switch(status){
            case 404: error= "Registro no encontrado"; break;
            case 403: case 405: error="Usuario no autorizado"; break;
            case 406: case 405: error="Usuario ya existe"; break;
        };            
        place.html('<div class="alert alert-danger fade show">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button><h4 class="alert-heading">Error!</h4>'+error+'</div>');
        return;        
    }  

  function fetchAndList(){
    let request = new Request(url+'api/personas', {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
        personas = await response.json();
        list();              
    })();    
  } 
  
  function loaded(){
    fetchAndList();
    $("#crear").click(makenew);        
    $("#buscar").on("click",search);
  }
  
  $(loaded);  