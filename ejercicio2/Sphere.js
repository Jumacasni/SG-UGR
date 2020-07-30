class Sphere extends THREE.Mesh {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();
    
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.SphereGeometry( 1.5, 32, 32 );
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    //this.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0,0));
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;
    this.material.needsUpdate = true;
  }

  createGUI () {

    this.guiControls = new function () {
      this.radio = 1.5;
      this.widthSegments = 32;
      this.heightSegments = 32;
      
      this.reset = function () {
        this.radio = 1.5;
        this.widthSegments = 32;
        this.heightSegments = 32;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles de la esfera');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen();
    folder.add (this.guiControls, 'widthSegments', 10, 50, 1).name ('Width Segments : ').listen();
    folder.add (this.guiControls, 'heightSegments', 10, 50, 0.1).name ('Height Segments : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    
    this.geometry = new THREE.SphereGeometry( this.guiControls.radio, this.guiControls.widthSegments, this.guiControls.heightSegments );

    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;
    this.material.needsUpdate = true;

    this.position.set(0,3,0);
    this.rotation.x += 0.01;
  }
}