import * as THREE from 'three'

class AxisGrigHelper {
  grid: THREE.GridHelper;
  axes: THREE.AxesHelper;
  private _visible: boolean;

  constructor(node: THREE.Object3D, units = 10) {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 2
    node.add(axes)


    const grid = new THREE.GridHelper(units, units)
    grid.material.depthTest = false
    grid.renderOrder = 1
    node.add(grid)

    this.grid = grid
    this.axes = axes
    this.visible = this._visible = false
  }

  get visible() { return this._visible }

  set visible(v: boolean) { 
    this._visible = v 
    this.grid.visible = v
    this.axes.visible = v
  }
}

export default AxisGrigHelper