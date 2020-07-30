
/// The Ground class
/**
 * @author FVelasco
 * 
 * @param aWidth - The width of the ground
 * @param aDeep - The deep of the ground
 * @param aMaterial - The material of the ground
 * @param aBoxSize - The size for the boxes
 */

class Ground extends THREE.Object3D {

  constructor (aWidth, aDeep, aMaterial, aBoxSize) {
    super();
    
    this.width = aWidth;
    this.deep = aDeep;
    this.material = aMaterial;
    this.boxSize = aBoxSize;
    
    this.ground = null;
    this.boxes  = null;
    
    this.raycaster = new THREE.Raycaster ();
  
    this.ground = new THREE.Mesh (
      new THREE.BoxGeometry (this.width, 0.2, this.deep, 1, 1, 1),
      this.material);
    this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
    this.ground.receiveShadow = true;
    this.ground.autoUpdateMatrix = false;
    this.add (this.ground);
    
    this.boxes = new THREE.Object3D();

  }
  
  /// It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
  /**
   * @param event - Mouse information
   * @return A Vector2 with the normalized mouse position
   */
  getMouse (event) {
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }
  
  /// It adds a new box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is going to be processed: start adding or finish.
   */
  addBox (event, action) {
    if (action === TheScene.END_ACTION && this.box !== null) {
      this.box = null;
      return;
    }
    
    var pointOnGround = this.getPointOnGround (event);
    if (pointOnGround !== null) {
      if (action === TheScene.NEW_BOX) {
        this.box = new THREE.Mesh (
          new THREE.BoxGeometry (this.boxSize, this.boxSize, this.boxSize), 
          new THREE.MeshPhongMaterial ({color: Math.floor (Math.random()*16777215)}));
        this.box.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.boxSize/2, 0));
        this.box.position.x = pointOnGround.x;
        this.box.position.y = 0;
        this.box.position.z = pointOnGround.y;
        this.box.receiveShadow = true;
        this.box.castShadow = true;
        this.boxes.add (this.box);
        this.updateHeightBoxes(this.boxes.children.length-1);
      }
    }
  }
    
  /// It moves or rotates a box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is going to be processed: select a box, move it, rotate it or finish the action.
   */
  moveBox (event, action) {
    switch (action) {
      case TheScene.END_ACTION :
        if (this.box !== null) {
          this.box.material.transparent = false;
          this.box = null;
        }
        break;
        
      case TheScene.MOVE_BOX :
        var pointOnGround = this.getPointOnGround (event);
        if (pointOnGround !== null) {
          if (this.box !== null) {
            this.box.position.x = pointOnGround.x;
            this.box.position.z = pointOnGround.y;
            this.updateHeightBoxes(this.boxes.children.length-1);
          }
        }
        break;
        
      case TheScene.SELECT_BOX :
        var mouse = this.getMouse (event);
        this.raycaster.setFromCamera (mouse, scene.getCamera());
        var pickedObjects = this.raycaster.intersectObjects (this.boxes.children);
        if (pickedObjects.length > 0) {
          this.box = pickedObjects[0].object;
          this.box.material.transparent = true;
          this.box.material.opacity = 0.5;
          var indexOfBox = this.boxes.children.indexOf (this.box);
          this.boxes.remove (this.box);
          this.boxes.add (this.box);
          this.updateHeightBoxes(indexOfBox);
        }
        break;
        
      case TheScene.ROTATE_BOX :
        if (this.box !== null) {
          // Chrome and other use wheelDelta, Firefox uses detail
          this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
        }
        break;
    }
  }
}
