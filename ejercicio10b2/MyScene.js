 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (unRenderer) {
    super();
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera (unRenderer);  
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    /*this.axis.position.set(5,5,0);
    this.add (this.axis);*/

    this.radiocilindro = 2;
    this.alturacilindro = 4;

    this.cilindro = new THREE.Mesh();
    this.cilindro.geometry = new THREE.CylinderGeometry( this.guiControls.radiocilindro, this.guiControls.radiocilindro, this.alturacilindro, 32 );
	this.cilindro.material = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});

	this.radioesfera = 0.25;

	this.esfera = new THREE.Mesh();
    this.esfera.geometry = new THREE.SphereGeometry( this.radioesfera, 32, 32 );
	this.esfera.material = new THREE.MeshNormalMaterial();
	this.esfera.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, this.guiControls.radiocilindro+this.radioesfera*2));

	this.tiempoAnterior = Date.now();

	this.add(this.cilindro);
	this.add(this.esfera);

	this.pelotaSubiendo = true;

    this.anteriorRadio = 2;
  }

  createCamera (unRenderer) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 10, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, unRenderer);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGUI () {
    // Se definen los controles que se modificarán desde la GUI
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.radiocilindro = 2;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    folder.add (this.guiControls, 'radiocilindro', 2, 10, 1).name('Radio : ');
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }
  
  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    var nuevoRadio = this.guiControls.radiocilindro;
    if(nuevoRadio != this.anteriorRadio){
        if(nuevoRadio > this.anteriorRadio){
            this.esfera.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, (nuevoRadio - this.anteriorRadio)));
        }

        else{
            this.esfera.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, (nuevoRadio - this.anteriorRadio)));
        }

        this.anteriorRadio = nuevoRadio;
    }
    // VELOCIDAD INDEPENDIENTE DEL ORDENADOR
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;

    //2pi rad en 4 segundos
    //x rad en segundosTranscurridos
    this.cilindro.geometry = new THREE.CylinderGeometry( this.guiControls.radiocilindro, this.guiControls.radiocilindro, this.alturacilindro, 32 );
    
    this.esfera.rotation.y += segundosTranscurridos*2*Math.PI/ 4;

    if(this.pelotaSubiendo){
    	this.esfera.position.y += (segundosTranscurridos*2*Math.PI / 4)/3;

    	if(this.esfera.position.y >= this.alturacilindro/2)
    		this.pelotaSubiendo = false;
    }

    else{
    	this.esfera.position.y -= (segundosTranscurridos*2*Math.PI / 4)/3;

    	if(this.esfera.position.y <= -this.alturacilindro/2)
    		this.pelotaSubiendo = true;
    }

    this.tiempoAnterior = tiempoActual;
  }
}

// 2 pi * 1 / 1

