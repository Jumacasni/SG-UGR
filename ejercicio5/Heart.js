 
class Heart extends THREE.Mesh {
  constructor() {
    super();

    var x = 0, y = 0;

    var heartShape = new THREE.Shape();

    heartShape.moveTo( x + 5, y + 5 );
  	heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  	heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  	heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  	heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  	heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  	heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    var extrudeSettings = {
      steps: 2,
      depth: 5,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

  	this.geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  }
  
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    /*this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
      
      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del cubo');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');*/
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.rotation.y += 0.1;
    this.scale.set(0.25,0.25,0.25);
  }
}