var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
var size=300,step=50,sizeX=237,sizeY=size,sizeZ=235,newSizeX=sizeX,newSizeY=sizeY,newSizeZ=sizeZ,offsetNX=0,offsetNY=0,offsetNZ=0,processedData,dataAmount,fileName="gistar_output_d.json",TIME_STEP_LOWER_BOUND,TIME_STEP_UPPER_BOUND,ZSCORE_LOWER_BOUND,ZSCORE_UPPER_BOUND,ZSCORE_SCALE,X_LOWER_BOUND,X_UPPER_BOUND,Y_LOWER_BOUND,Y_UPPER_BOUND,xLowerBound,xUpperBound,yLowerBound,yUpperBound,timeStepLowerBound,timeStepUpperBound,zScoreLowerBound,zScoreUpperBound,axisXScale,axisYScale,axisZScale,X_SCALE,Y_SCALE,
Z_SCALE,CSVLoader=new THREE.FileLoader;CSVLoader.setResponseType("text");
CSVLoader.load("./data/"+fileName,function(a){processedData=JSON.parse(a);dataAmount=processedData.length;TIME_STEP_LOWER_BOUND=processedData[0].time_step;TIME_STEP_UPPER_BOUND=processedData[processedData.length-1].time_step;ZSCORE_LOWER_BOUND=processedData[0].zscore;ZSCORE_UPPER_BOUND=processedData[processedData.length-1].zscore;X_LOWER_BOUND=processedData[0].cell_x;X_UPPER_BOUND=processedData[processedData.length-1].cell_x;Y_LOWER_BOUND=processedData[0].cell_y;Y_UPPER_BOUND=processedData[processedData.length-
1].cell_y;a=$jscomp.makeIterator(processedData);for(var b=a.next();!b.done;b=a.next())b=b.value,b.time_step<TIME_STEP_LOWER_BOUND&&(TIME_STEP_LOWER_BOUND=b.time_step),b.time_step>TIME_STEP_UPPER_BOUND&&(TIME_STEP_UPPER_BOUND=b.time_step),b.zscore<ZSCORE_LOWER_BOUND&&(ZSCORE_LOWER_BOUND=b.zscore),b.zscore>ZSCORE_UPPER_BOUND&&(ZSCORE_UPPER_BOUND=b.zscore),b.cell_x<X_LOWER_BOUND&&(X_LOWER_BOUND=b.cell_x),b.cell_x>X_UPPER_BOUND&&(X_UPPER_BOUND=b.cell_x),b.cell_y<Y_LOWER_BOUND&&(Y_LOWER_BOUND=b.cell_y),
b.cell_y>Y_UPPER_BOUND&&(X_UPPER_BOUND=b.cell_y);console.log("Time_step: "+TIME_STEP_LOWER_BOUND+" - "+TIME_STEP_UPPER_BOUND);console.log("zScore: "+ZSCORE_LOWER_BOUND+" - "+ZSCORE_UPPER_BOUND);console.log("cell_x: "+X_LOWER_BOUND+" - "+X_UPPER_BOUND);console.log("cell_y: "+Y_LOWER_BOUND+" - "+Y_UPPER_BOUND);timeStepLowerBound=TIME_STEP_LOWER_BOUND;timeStepUpperBound=TIME_STEP_UPPER_BOUND;zScoreLowerBound=ZSCORE_LOWER_BOUND;zScoreUpperBound=ZSCORE_UPPER_BOUND;xLowerBound=X_LOWER_BOUND;xUpperBound=
X_UPPER_BOUND;yLowerBound=Y_LOWER_BOUND;yUpperBound=Y_UPPER_BOUND;X_SCALE=X_UPPER_BOUND-X_LOWER_BOUND;Y_SCALE=TIME_STEP_UPPER_BOUND-TIME_STEP_LOWER_BOUND;Z_SCALE=Y_UPPER_BOUND-Y_LOWER_BOUND;axisXScale=X_SCALE>size?size/(X_SCALE+1):1;axisYScale=Y_SCALE>size?size/(Y_SCALE+1):(Y_SCALE+1)/size;axisZScale=Z_SCALE>size?size/(Z_SCALE+1):1;ZSCORE_SCALE=ZSCORE_UPPER_BOUND-ZSCORE_LOWER_BOUND;console.log("X Scale: "+axisXScale+" | "+X_SCALE);console.log("Z Scale: "+axisZScale+" | "+Z_SCALE);console.log("Y Scale: "+
axisYScale+" | "+Y_SCALE)});var stats,camera,controls,WebGLRenderer,cssRenderer,WebGLScene=new THREE.Scene,cssScene=new THREE.Scene,raycaster=new THREE.Raycaster,mouse=new THREE.Vector2,INTERSECTED,CUnitCluster=new THREE.Object3D,zoomAmount=1,zoomFactor=5,isLMB=!1,isRMB=!1,offsetZ=-size/2+size/step/2,offsetX=size/2-size/step/2,offsetY=size/2-size/step/2,mapMesh,mapMat,mapLayer,dimension=size/step,extrudeLayer=-1,mustExtrude=!1,mustScale=!1,baseOXYGridHelper=new THREE.GridHelper(size,step);
baseOXYGridHelper.position.z=(size-sizeZ)/2;baseOXYGridHelper.position.x=-(size-sizeX)/2;baseOXYGridHelper.position.y=-size/2;baseOXYGridHelper.scale.x=sizeX/size;baseOXYGridHelper.scale.z=sizeZ/size;baseOXYGridHelper.renderOrder=1;var baseOYZGridHelper=new THREE.GridHelper(size,step);baseOYZGridHelper.rotation.z=Math.PI/2;baseOYZGridHelper.rotation.y=Math.PI/2;baseOYZGridHelper.position.x=baseOXYGridHelper.position.x;baseOYZGridHelper.position.z=baseOXYGridHelper.position.z+size/2-(size-sizeZ)/2;
baseOYZGridHelper.position.y=baseOXYGridHelper.position.y+size/2;baseOYZGridHelper.scale.z=sizeX/size;baseOYZGridHelper.renderOrder=1;var baseOXZGridHelper=new THREE.GridHelper(size,step);baseOXZGridHelper.rotation.z=Math.PI/2;baseOXZGridHelper.position.x=baseOXYGridHelper.position.x-size/2+(size-sizeX)/2;baseOXZGridHelper.position.z=baseOXYGridHelper.position.z;baseOXZGridHelper.position.y=baseOXYGridHelper.position.y+size/2;baseOXZGridHelper.scale.z=sizeX/size;baseOXZGridHelper.renderOrder=1;
var GEO_PRISM=new THREE.CylinderGeometry(dimension,dimension,dimension,6,4),GEO_CUBE=new THREE.BoxGeometry(dimension,dimension,dimension),BRUSH_SIZE=1,CAMERA_SPAWN=new THREE.Vector3(size,size,size),LABEL_ORIGIN_SPAWN=new THREE.Vector3(baseOXYGridHelper.position.x-(size-sizeX/2),baseOXYGridHelper.position.y,baseOXYGridHelper.position.z+(size-sizeZ/2)),LABEL_TIME_SPAWN=new THREE.Vector3(baseOXZGridHelper.position.x,baseOXZGridHelper.position.y+(size-sizeY/2),baseOXZGridHelper.position.z+(size-sizeZ/
2)),LABEL_LAT_SPAWN=new THREE.Vector3(baseOXYGridHelper.position.x-(size-sizeX/2),baseOXYGridHelper.position.y-.1*size,-baseOXYGridHelper.position.z-(size-sizeZ/2)),LABEL_LNG_SPAWN=new THREE.Vector3(baseOXYGridHelper.position.x+(size-sizeX/2),baseOXYGridHelper.position.y-.1*size,baseOXYGridHelper.position.z+(size-sizeZ/2)),labelOrigin,labelT,labelLng,labelLat,OSMFrame='<div id="OSMLayerBlocker" style="position:fixed;width:100%;height:100%;"></div><iframe id="OSMLayer" width="661px" height="689px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://www.openstreetmap.org/export/embed.html?map=ZOOM&amp;bbox=LOCATION&amp;layers=MAPTYPE;" style="border: 1px solid black"></iframe>',
GMFrame='<div style="position:fixed;width:100%;height:100%;"></div><iframe src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d1213.93486794387!2d-74.25689642554477!3d40.548215515832084!2m2!1f5.6871391876627335!2f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMyJzUwLjAiTiA3NMKwMTUnMzIuNyJX!5e1!3m2!1sen!2sde!4v1496044141280" width="661" height="689" frameborder="0" style="border: 1px solid black"</iframe>',locations=[],LNG_MIN=-74.25909,LNG_MAX=-73.70009,LAT_MIN=40.477399,LAT_MAX=40.917577,
newLngMin=LNG_MIN,newLatMin=LAT_MIN,newLngMax=LNG_MAX,newLatMax=LAT_MAX,loc=encodeURIComponent(LNG_MIN+","+LAT_MIN+","+LNG_MAX+","+LAT_MAX),mapoption="",maptype="mapnik"+mapoption,sides=[],isInPerspectiveMode=!0,combinedCamera=new THREE.CombinedCamera(window.innerWidth,window.innerHeight,90,1,1E3,-500,1E3);combinedCamera.isPerspectiveCamera=!0;combinedCamera.isOrthographicCamera=!1;combinedCamera.position.copy(CAMERA_SPAWN);combinedCamera.lookAt(new THREE.Vector3(size/2,size/2,size/2));
var perspectiveCamera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,5E3);perspectiveCamera.position.set(500,350,750);
