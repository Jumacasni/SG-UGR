 
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

    /*********************/
    /* CREACIÓN DEL VASO */
    /*********************/

	// CREO UN CILINDRO
	var geometria_cilindro = new THREE.CylinderGeometry( 1, 1, 1, 32 );
	var material_cilindro = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
	this.cilindro = new THREE.Mesh( geometria_cilindro, material_cilindro );
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeScale (0.6,0.6,1));
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-1,0,0));
	
	this.cilindroBSP = new ThreeBSP(this.cilindro.geometry);

   	// CREO UNA ESFERA

   	var geometria_esfera = new THREE.SphereGeometry( 1, 32, 32 );
	var material_esfera = new THREE.MeshNormalMaterial();
	this.sphere = new THREE.Mesh( geometria_esfera, material_esfera );
	this.sphere.geometry.applyMatrix (new THREE.Matrix4().makeScale (0.8,0.8,0.2));
	this.sphere.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-1,0,0));

	this.esferaBSP = new ThreeBSP(this.sphere.geometry);

	var aux = this.esferaBSP.subtract(this.cilindroBSP);
	this.asa = aux.toMesh(material_esfera);
	this.asaBSP = new ThreeBSP(this.asa.geometry);

	// CREO CILINDRO 2
	var geometria_cilindro2 = new THREE.CylinderGeometry( 1, 1, 1, 32 );
	var material_cilindro2 = new THREE.MeshNormalMaterial();
	this.cilindro2 = new THREE.Mesh( geometria_cilindro2, material_cilindro2 );
	this.cilindro2.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,2,1));
	this.cilindro2BSP = new ThreeBSP(this.cilindro2.geometry);

	var union = this.cilindro2BSP.union(this.asaBSP);
	this.asaycilindro2 = union.toMesh(material_esfera);
	this.asaycilindro2BSP = new ThreeBSP(this.asaycilindro2.geometry);

	// CREO CILINDRO 3
	var geometria_cilindro3 = new THREE.CylinderGeometry( 1, 1, 1, 32 );
	var material_cilindro3 = new THREE.MeshNormalMaterial();
	this.cilindro3 = new THREE.Mesh( geometria_cilindro3, material_cilindro3 );
	this.cilindro3.geometry.applyMatrix (new THREE.Matrix4().makeScale (0.8,2,0.8));
	this.cilindro3.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.1,0));

	this.cilindro3BSP = new ThreeBSP(this.cilindro3.geometry);

	var resultado = this.asaycilindro2BSP.subtract(this.cilindro3BSP);
	this.vaso = resultado.toMesh(material_esfera);
	this.vaso.position.x = -5;
	this.add(this.vaso);

	/*******************************/
    /* CREACIÓN DEL SEGUNDO OBJETO */
    /*******************************/

    // CREO UN CUBO
    var geometria_cubo = new THREE.BoxGeometry( 1, 1, 1);
	var material_cubo = new THREE.MeshNormalMaterial();
	this.cubo = new THREE.Mesh( geometria_cubo, material_cubo );
	this.cubo.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,1,0.5));

	this.cuboBSP = new ThreeBSP(this.cubo.geometry);
	//this.add(this.cubo);

	var geometria_cilindro = new THREE.CylinderGeometry( 1, 1, 1, 32 );
	var material_cilindro = new THREE.MeshNormalMaterial();
	this.cilindro = new THREE.Mesh( geometria_cilindro, material_cilindro );
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeScale (0.25,0.25,1));
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-0.25+0.10,0.25-0.10,0));
	
	this.cilindroBSP = new ThreeBSP(this.cilindro.geometry);
	//this.add(this.cilindro);

	var primeraparte = this.cuboBSP.subtract(this.cilindroBSP);




	var geometria_cubo = new THREE.BoxGeometry( 1, 1, 1);
	var material_cubo = new THREE.MeshNormalMaterial();
	this.cubo1 = new THREE.Mesh( geometria_cubo, material_cubo );
	this.cubo1.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,1,0.5));
	this.cubo1.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0.1,-0.35,0));
	
	this.cubo1BSP = new ThreeBSP(this.cubo1.geometry);
	
	var segundaparte = primeraparte.subtract(this.cubo1BSP);
	this.parte2 = segundaparte.toMesh(material_cubo);
	



	var geometria_cubo = new THREE.BoxGeometry( 1, 1, 1);
	var material_cubo = new THREE.MeshNormalMaterial();
	this.cubo2 = new THREE.Mesh( geometria_cubo, material_cubo );
	this.cubo2.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,1,0.5));
	this.cubo2.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0.35,-0.1,0));
	
	this.cubo2BSP = new ThreeBSP(this.cubo2.geometry);

	var terceraparte = segundaparte.subtract(this.cubo2BSP);

	this.resultado = terceraparte.toMesh(material_cubo);
	this.resultado.scale.set(2,2,2);
	this.add(this.resultado);



	/*************************/
    /* CREACIÓN DE LA TUERCA */
    /*************************/

	var geometria_cilindro = new THREE.CylinderGeometry( 1, 1, 1, 6 );
	var material_cilindro = new THREE.MeshNormalMaterial();
	this.cilindro = new THREE.Mesh( geometria_cilindro, material_cilindro );
	this.cilindro.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,0.7,1));

	this.cilindroBSP = new ThreeBSP(this.cilindro.geometry);

	var geometria_cilindro = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 );
	var material_cilindro = new THREE.MeshNormalMaterial();
	this.cilindro2 = new THREE.Mesh( geometria_cilindro, material_cilindro );

	this.cilindro2.geometry.applyMatrix (new THREE.Matrix4().makeScale (1,1,1));

	this.cilindro2BSP = new ThreeBSP(this.cilindro2.geometry);

	var primeraparte = this.cilindroBSP.subtract(this.cilindro2BSP);

	

	var geometria_esfera = new THREE.SphereGeometry( 1, 32, 32 );
	var material_esfera = new THREE.MeshNormalMaterial();
	this.sphere = new THREE.Mesh( geometria_esfera, material_esfera );

	this.esferaBSP = new ThreeBSP(this.sphere.geometry);

	var segundaparte = primeraparte.intersect(this.esferaBSP);

	this.tuerca = segundaparte.toMesh(material_cilindro);
	this.tuerca.scale.set(1.5,1.5,1.5);
	this.tuerca.position.x = 5;
	this.add(this.tuerca);
  }
  
  createCamera (unRenderer) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 5, 10);
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
    }

    // Accedemos a la variable global   gui   declarada en   script.js   para añadirle la parte de interfaz que corresponde a los elementos de esta clase
    
    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
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

  }
}