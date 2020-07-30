 
class Revolution extends THREE.Mesh {
  constructor() {
    super();

    this.createGUI();

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(2,-4,0));
    geometry.vertices.push(new THREE.Vector3(2,4,0));   // SIEMPRE LOS VÉRTICES DE ABAJO A ARRIBA
  
    this.geometry = new THREE.LatheGeometry(geometry.vertices);
    this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.material.side = THREE.DoubleSide;  // Para que la figura se muestre completamente cerrada
  }
  
  createGUI () {
    this.guiControls = new function () {
      this.segmentos = 10;
      this.phiStart = 0;
      this.phiLength = 2*Math.PI;
      
      this.reset = function () {
        this.segmentos = 10;
        this.phiStart = 0;
        this.phiLength = 2*Math.PI;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del cilindro');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'segmentos', 1.0, 20.0, 1.0).name ('Segmentos : ').listen();
    folder.add (this.guiControls, 'phiStart', 0, 10, 1).name ('Phi Start : ').listen();
    folder.add (this.guiControls, 'phiLength', 0.1, 2*Math.PI, 0.2).name ('Phi Length : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(2,-4,0));
    geometry.vertices.push(new THREE.Vector3(2,4,0));   // SIEMPRE LOS VÉRTICES DE ABAJO A ARRIBA
  
    this.geometry = new THREE.LatheGeometry(geometry.vertices, this.guiControls.segmentos, this.guiControls.phiStart, this.guiControls.phiLength);
    this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.material.side = THREE.DoubleSide;  // Para que la figura se muestre completamente cerrada
  }
}