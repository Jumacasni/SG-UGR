 
class MyLine extends THREE.Line {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
   /*this.createGUI();
    
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (1,1,1);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    //this.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0,0));
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;
    this.material.needsUpdate = true;*/

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(1,2,0));
    geometry.vertices.push(new THREE.Vector3(1,-2,0));
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(new THREE.Vector3(2,4,0));
    this.geometry.vertices.push(new THREE.Vector3(2,-4,0));

    this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
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
    this.position.set(0,5,15);
  }
}