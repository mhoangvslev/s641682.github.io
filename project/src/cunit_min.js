function CUnit(a,b,c,d,e){THREE.Object3D.call(this);this.type="CUnit";this.color=this.getColorPerWeight(d);this.opacity=1;this.geometry=GEO_CUBE;this.cell_x=b;this.cell_y=a;this.time_step=c;this.zscore=d;this.mesh=new THREE.Mesh(this.geometry,new THREE.MeshPhongMaterial({color:this.color,transparent:!0,opacity:this.opacity}));this.mesh.name="Longitude: "+b+" | Latitude: "+a+" | Time step: "+c+" | ZScore: "+d+" | PValue: "+e;this.mesh.position.x=this.cell_y*dimensionX-offsetX;this.mesh.position.z=
-this.cell_x*dimensionZ-offsetZ;this.mesh.position.y=this.time_step*dimensionY-offsetY;this.mesh.renderOrder=2;this.currentSize=this.mesh.scale.x;this.bearing=this.calcBearing();this.angularDistance=this.calcAngularDistance();this.latitude=this.calcLatitude();this.longitude=this.calcLongitude()}CUnit.prototype=Object.create(THREE.Mesh.prototype);CUnit.prototype.constructor=CUnit;CUnit.prototype.getMesh=function(){return this.mesh};CUnit.prototype.changeGeometry=function(a){this.mesh.geometry=a};
CUnit.prototype.getColorPerWeight=function(a){return-2.58>a?new THREE.Color(3368652):-2.58<=a&&-1.96>a?new THREE.Color(10066380):-1.96<=a&&-1.65>a?new THREE.Color(12632256):-1.65<=a&&1.65>a?new THREE.Color(16777164):1.65<=a&&1.96>a?new THREE.Color(16764057):1.96<=a&&2.58>a?new THREE.Color(16737894):new THREE.Color(13382451)};CUnit.prototype.reinitiate=function(){this.mesh.material=new THREE.MeshPhongMaterial({color:this.getColorPerWeight(this.zscore),transparent:!0,opacity:this.opacity})};
CUnit.prototype.setCunitSize=function(a,b,c){this.mesh.scale.set(c,b,a);this.currentSize=this.mesh.scale.x};CUnit.prototype.getCellY=function(){return this.cell_y};CUnit.prototype.getCellX=function(){return this.cell_x};CUnit.prototype.getTimeStep=function(){return this.time_step};CUnit.prototype.getZScore=function(){return this.zscore};CUnit.prototype.getScalePerWeight=function(){return(this.zscore-ZSCORE_LOWER_BOUND)*sizeTime/ZSCORE_SCALE};
CUnit.prototype.calcLatitude=function(){return THREE.Math.degToRad(LAT_MIN+.2*this.cell_y/111.321)};CUnit.prototype.calcLongitude=function(){return THREE.Math.degToRad(LNG_MIN+.2*this.cell_x/(111.321*Math.cos(this.latitude)))};CUnit.prototype.calcAngularDistance=function(){return.001*Math.sqrt(Math.pow(200*this.cell_x,2)+Math.pow(200*this.cell_y,2))/6371};CUnit.prototype.calcBearing=function(){return Math.atan2(this.cell_x-xLowerBound,this.cell_y-yLowerBound)};CUnit.prototype.getLongitude=function(){return THREE.Math.radToDeg(this.longitude).toFixed(6)};
CUnit.prototype.getLatitude=function(){return THREE.Math.radToDeg(this.latitude).toFixed(6)};CUnit.prototype.getAngularDistance=function(){return THREE.Math.radToDeg(this.angularDistance)};CUnit.prototype.getBearing=function(){return this.bearing};CUnit.prototype.update=function(){this.bearing=this.calcBearing();this.latitude=this.calcLatitude();this.longitude=this.calcLongitude()};CUnit.prototype.getCurrentSize=function(){return this.currentSize};
