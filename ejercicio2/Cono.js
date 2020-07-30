class Cono extends THREE.Mesh{
	constructor(){
		super();

		this.createGUI();

		this.geometry = new THREE.ConeGeometry( 1, 2, 32 );

		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;
    	this.material.needsUpdate = true;

	}

	createGUI () {

    this.guiControls = new function () {
      this.radio = 1;
      this.altura = 2;
      this.segmentosBase = 32;
      
      this.reset = function () {
        this.radio = 1;
        this.altura = 2;
        this.segmentosBase = 32;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del cono');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen();
    folder.add (this.guiControls, 'altura', 1, 20, 1).name ('Altura : ').listen();
    folder.add (this.guiControls, 'segmentosBase', 10, 50, 1).name ('Segmentos base : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

	update () {

	    this.geometry = new THREE.ConeGeometry( this.guiControls.radio, this.guiControls.altura, this.guiControls.segmentosBase );

	    this.material = new THREE.MeshNormalMaterial();
	    this.material.flatShading = true;
	    this.material.needsUpdate = true;

	  	this.position.set(15,5,0);
	  	this.rotation.x += 0.01;
  }
}