 
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

    this.anchoBaseVerde = 1;
    this.alturaBaseVerde = 1;
    this.profundidadBaseVerde = 1;

    this.anchoCuboRojo = 1;
    this.alturaCuboRojo = 1;
    this.profundidadCuboRojo = 1;

    this.anchoCabezaVerde = 1;
    this.alturaCabezaVerde = 1;
    this.profundidadCabezaVerde = 1;

    /*this.radioCilindroMorado = 0.3;
    this.alturaCilindroMorado = 1;

    this.radioCilindroVerde = 0.1;
    this.alturaCilindroVerde = 1;

    this.anchoCuboAzul = 1;
    this.alturaCuboAzul = 1;
    this.profundidadCuboAzul = 1;

    this.salienteCilindro = 0.2;

    this.pendulo = this.crearPendulo();
    this.add(this.pendulo);*/
  }

  crearBaseVerde(){
    var geometry = new THREE.BoxGeometry( this.anchoBaseVerde, this.alturaBaseVerde, this.profundidadBaseVerde);
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var baseverde = new THREE.Mesh( geometry, material );

    baseverde.position.y(0, -alturaBaseVerde)
  }
  
  /*crearBase(){
  	var geometry = new THREE.BoxGeometry( this.anchoBaseVerde, this.alturaBaseVerde, this.profundidadBaseVerde);
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var baseverde = new THREE.Mesh( geometry, material );
	baseverde.position.y = -(this.alturaBaseVerde+this.guiControls.longitud);

	return baseverde;
  }

  crearCuboRojo(){
  	var geometry = new THREE.BoxGeometry( this.anchoCuboRojo, this.guiControls.longitud, this.profundidadCuboRojo );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var mediorojo = new THREE.Mesh( geometry, material );
	mediorojo.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(this.anchoCuboRojo/2, -this.alturaCuboRojo/2, 0));
	mediorojo.position.x = -this.anchoCuboRojo/2;
	mediorojo.position.y = -this.guiControls.longitud/2;

	return mediorojo;
  }

  crearCabezaVerde(){
	var geometry = new THREE.BoxGeometry( this.anchoCabezaVerde, this.alturaBaseVerde, this.profundidadBaseVerde );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var cabeza = new THREE.Mesh( geometry, material );
	
	return cabeza;
  }

  crearCilindro(){
  	var geometry = new THREE.CylinderGeometry( this.radioCilindroMorado, this.radioCilindroMorado, this.alturaCilindroMorado, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0x572364} );
	var cilindro = new THREE.Mesh( geometry, material );
	cilindro.geometry.applyMatrix( new THREE.Matrix4().makeRotationX(Math.PI/2));
	cilindro.position.z += this.salienteCilindro;

	return cilindro;
  }

  crearPendulo(){
  	var pendulo = new THREE.Mesh();
  	pendulo.add(this.crearBase());
  	pendulo.add(this.crearCuboRojo());
	pendulo.add(this.crearCabezaVerde());
	pendulo.add(this.crearCilindro());
	pendulo.add(this.crearSegundoPendulo());

	return pendulo;
  }

  crearCilindroPequenio(){
	var geometry = new THREE.CylinderGeometry( this.radioCilindroVerde, this.radioCilindroVerde, this.alturaCilindroVerde, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x03250d} );
	var cilindro = new THREE.Mesh( geometry, material );
	cilindro.geometry.applyMatrix( new THREE.Matrix4().makeRotationX(Math.PI/2));

	return cilindro;
  }

  crearCuboAzul(){
	var geometry = new THREE.BoxGeometry( this.anchoCuboAzul, this.guiControls.segundalongitud, this.profundidadCuboAzul );
	var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
	var cubo = new THREE.Mesh( geometry, material );
	cubo.geometry.applyMatrix( new THREE.Matrix4().makeScale(this.anchoCuboRojo/2, 1, 0.2));
	cubo.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(this.anchoCuboAzul/2, -this.guiControls.segundalongitud/2, 0));
	cubo.position.x = -this.anchoCuboAzul/2;
	cubo.position.y = this.radioCilindroVerde*2;
	cubo.position.z = 0.2;

	return cubo;
  }

  crearSegundoPendulo(){
  	var pendulo = new THREE.Mesh();
  	pendulo.add(this.crearCilindroPequenio());
  	pendulo.add(this.crearCuboAzul());
  	pendulo.position.y = -this.alturaCuboRojo/2-this.radioCilindroVerde-this.guiControls.posicion;
  	pendulo.position.z = this.salienteCilindro*2;
  	pendulo.rotation.z = this.guiControls.segundogiro;

	return pendulo;
  }*/

  createCamera (unRenderer) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 10);
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
      this.axisOnOff = true;
      this.longitud = 1;
      this.giro = 0;
      this.segundalongitud = 2.25;
      this.posicion = 0;
      this.segundogiro = 0;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

    var folderPrimerPendulo = gui.addFolder ('Primer pendulo');

    folderPrimerPendulo.add(this.guiControls, 'longitud', 1, 3, 0.1).name('Longitud : ');
    folderPrimerPendulo.add(this.guiControls, 'giro', -1.3, 1.3, 0.1).name('Giro : ');

    var folderSegundoPendulo = gui.addFolder ('Segundo pendulo');
    folderSegundoPendulo.add(this.guiControls, 'segundalongitud', 2.25, 4, 0.1).name('Longitud : ');
    folderSegundoPendulo.add(this.guiControls, 'posicion', 0, this.guiControls.longitud*0.9, 0.1).name('Posición : ');
    folderSegundoPendulo.add(this.guiControls, 'segundogiro', -1.3, 1.3, 0.1).name('Giro : ');
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

    //this.segundopendulo.rotation.z += 0.01;
    this.remove(this.pendulo);
    this.pendulo = this.crearPendulo();
	this.pendulo.rotation.z = this.guiControls.giro;
    this.add(this.pendulo);
    
  }
}