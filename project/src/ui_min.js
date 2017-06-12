function updateZoomSpeedFilter(a){zoomFactor=a}function updateCameraFOVFilter(a){camera.setFov(a)}function updateBrushSizeFilter(){CUnitCluster.traverse(function(a){a instanceof CUnit&&(mustExtrude?a.setCunitSize(BRUSH_SIZE,.5*a.getScalePerWeight(),BRUSH_SIZE):a.setCunitSize(BRUSH_SIZE,BRUSH_SIZE,BRUSH_SIZE))})}
function updateSceneFilters(){resetScene();CUnitCluster.traverse(function(a){a instanceof CUnit&&(a.getTimeStep()>=timeStepLowerBound&&a.getTimeStep()<timeStepUpperBound&&a.getCellY()>=xLowerBound&&a.getCellY()<xUpperBound&&a.getCellX()>=yLowerBound&&a.getCellX()<yUpperBound&&a.getZScore()>=zScoreLowerBound&&a.getZScore()<zScoreUpperBound?a.getMesh().visible=!0:a.getMesh().visible=!1)});mustScale?document.getElementById("time_step_unit").innerHTML="X: "+(200*newSizeZ/step).toFixed(2)+"m Y: "+(sizeTime/
newSizeY/step).toFixed(2)+"x Z: "+(200*newSizeX/step).toFixed(2)+"m":document.getElementById("time_step_unit").innerHTML="X: "+(200*sizeLat/step).toFixed(2)+"m Y: "+(200*sizeTime/step).toFixed(2)+"x Z: "+(200*sizeLng/step).toFixed(2)+"m"}
function updateMapLayerDisplay(a){a?(CUnitCluster.traverse(function(a){a instanceof CUnit&&(a.getMesh().position.z=-(a.getCellX()-yLowerBound)*(sizeLat/newSizeZ)-offsetZ,a.getMesh().position.x=(a.getCellY()-xLowerBound)*(sizeLng/newSizeX)-offsetX,mustExtrude?(a.getMesh().scale.y=a.getScalePerWeight(),a.getMesh().position.y=sizeTime/2+a.getMesh().scale.y*a.getDimension()/2-sizeTime):a.getMesh().position.y=(a.getTimeStep()-timeStepLowerBound)*(sizeTime/newSizeY)-offsetY,a.getCellX()==yLowerBound&&(newLngMin=
a.getLongitude()),a.getCellX()==yUpperBound&&(newLngMax=a.getLongitude()),a.getCellY()==xLowerBound&&(newLatMin=a.getLatitude()),a.getCellY()==xUpperBound&&(newLatMax=a.getLatitude()))}),a=encodeURIComponent(newLngMin+","+newLatMin+","+newLngMax+","+newLatMax)):(a=encodeURIComponent(LNG_MIN+","+LAT_MIN+","+LNG_MAX+","+LAT_MAX),resetScene());a="http://www.openstreetmap.org/export/embed.html?bbox=LOCATION&amp;layers=MAPTYPE&amp;marker=MRKERS&amp".replace("LOCATION",a).replace("MAPTYPE",maptype);document.getElementById("OSMLayer").setAttribute("src",
a)}
function updateOneLayerFilter(){resetScene();CUnitCluster.traverse(function(a){a instanceof CUnit&&(a.getTimeStep()===extrudeLayer&&a.getTimeStep()>=timeStepLowerBound&&a.getTimeStep()<timeStepUpperBound&&a.getCellY()>=xLowerBound&&a.getCellY()<xUpperBound&&a.getCellX()>=yLowerBound&&a.getCellX()<yUpperBound&&a.getZScore()>=zScoreLowerBound&&a.getZScore()<zScoreUpperBound?(a.getMesh().visible=!0,mustExtrude&&(a.getMesh().scale.y=a.getScalePerWeight(),a.getMesh().position.y=sizeTime/2+a.getMesh().scale.y*a.getDimension()/
2-sizeTime)):a.getMesh().visible=!1)})}function updateMapAlphaFilter(a){mapMesh.material.opacity=a;document.getElementById("outerOSM").style.opacity=a}function updateGeometryFilter(a){CUnitCluster.traverse(function(b){b instanceof CUnit&&b.changeGeometry(a)})}function updateDynamicMapFilter(a){a?(mapMesh.visible=!0,document.getElementById("OSMLayer").style.display="none"):(mapMesh.visible=!1,document.getElementById("OSMLayer").style.display="block")}
function updateInteractiveMapFilter(a){a?document.getElementById("OSMLayerBlocker").style.display="none":document.getElementById("OSMLayerBlocker").style.display="block"}function updateMapScaleXFilter(a){mapLayer.scale.x=a}function updateMapScaleYFilter(a){mapLayer.scale.y=a}function updateMapOffsetX(a){mapLayer.position.x=baseOXYGridHelper.position.x+a}function updateMapOffsetZ(a){mapLayer.position.z=baseOXYGridHelper.position.z+a}
function updateMapOffsetY(a){mapLayer.position.y=baseOXYGridHelper.position.y+a}function updateMapLayerType(a){};
