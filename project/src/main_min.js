var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};Detector.webgl||Detector.addGetWebGLMessage();init();animate();
function init(){var a=document.getElementById("container");document.body.appendChild(a);WebGLRenderer=new THREE.CanvasRenderer({alpha:!0,antialias:!0});WebGLRenderer.setClearColor(15790320);WebGLRenderer.setPixelRatio(window.devicePixelRatio);WebGLRenderer.setSize(window.innerWidth,window.innerHeight);WebGLRenderer.domElement.style.top=0;WebGLRenderer.domElement.style.zIndex=1;a.appendChild(WebGLRenderer.domElement);cssRenderer=new THREE.CSS3DRenderer;cssRenderer.setSize(window.innerWidth,window.innerHeight);
cssRenderer.domElement.style.position="absolute";cssRenderer.domElement.style.top=0;cssRenderer.domElement.style.margin=0;cssRenderer.domElement.style.padding=0;WebGLRenderer.domElement.style.zIndex=0;a.appendChild(cssRenderer.domElement);labelOrigin=makeTextSprite("Origin");labelOrigin.position.copy(LABEL_ORIGIN_SPAWN);WebGLScene.add(labelOrigin);labelT=makeTextSprite("Time");labelT.position.copy(LABEL_TIME_SPAWN);WebGLScene.add(labelT);labelLng=makeTextSprite("Lng");labelLng.position.copy(LABEL_LNG_SPAWN);
WebGLScene.add(labelLng);labelLat=makeTextSprite("Lat");labelLat.position.copy(LABEL_LAT_SPAWN);WebGLScene.add(labelLat);textureGeoLoader=new THREE.TextureLoader;var b=textureGeoLoader.load("./data/nyc_location_map_raster.png");b.minFilter=THREE.LinearFilter;mapMat=new THREE.MeshPhongMaterial({map:b});mapMat.needsUpdate=!0;b.wrapS=THREE.RepeatWrapping;b.wrapT=THREE.RepeatWrapping;b=new THREE.PlaneGeometry(sizeLat,sizeLng);mapMesh=new THREE.Mesh(b,mapMat);mapMesh.rotation.x=-(Math.PI/2);mapMesh.position.x=
baseOXYGridHelper.position.x;mapMesh.position.z=baseOXYGridHelper.position.z;mapMesh.position.y=baseOXYGridHelper.position.y-.5;mapMesh.scale.x=sizeLng/size;mapMesh.scale.y=sizeLat/size;mapMesh.renderOrder=0;mapMesh.visible=!1;WebGLScene.add(mapMesh);b=OSMFrame.replace("MAPTYPE",maptype).replace("LOCATION",loc);console.log(b);mapLayer=createCSS3DObject(b);mapLayer.rotation.copy(mapMesh.rotation);mapLayer.position.copy(baseOXYGridHelper.position);mapLayer.scale.copy(baseOXYGridHelper.scale);updateMapScaleXFilter(.582245*
mapScaleOffsetX);updateMapScaleYFilter(.561175*mapScaleOffsetY);updateMapOffsetX(-1);updateMapOffsetZ(0);mapLayer.renderOrder=0;cssScene.add(mapLayer);for(var b=$jscomp.makeIterator(processedData),c=b.next();!c.done;c=b.next())c=c.value,c=new CUnit(c.cell_x,c.cell_y,c.time_step,c.zscore,c.pvalue),CUnitCluster.add(c),WebGLScene.add(c.getMesh());b=new THREE.AmbientLight(16777215,.2);WebGLScene.add(b);stats=new Stats;a.appendChild(stats.dom);camera=perspectiveCamera;controls=new THREE.OrbitControls(camera,
cssRenderer.domElement);controls.addEventListener("change",render);controls.enableZoom=!0;document.addEventListener("mousemove",onDocumentMouseMove,!1);document.addEventListener("contextmenu",onDocumentLMB,!1);document.addEventListener("mouseup",onDocumentMouseReset,!1);document.addEventListener("wheel",onDocumentMouseWheel,!0);window.addEventListener("resize",onWindowResize,!1);THREEx.WindowResize(cssRenderer,camera);THREEx.WindowResize(WebGLRenderer,camera)}
function animate(){requestAnimationFrame(animate);update();render()}
function update(){raycaster.setFromCamera(mouse,camera);var a=raycaster.intersectObjects(WebGLScene.children);0<a.length?INTERSECTED!=a[0].object&&null!=a[0].object.material.emissive&&(INTERSECTED&&INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=a[0].object,INTERSECTED.currentHex=INTERSECTED.material.emissive.getHex(),INTERSECTED.material.emissive.setHex(15790320),a[0].object.name&&(document.getElementById("cunit_info").innerHTML="Information: "+a[0].object.name)):(INTERSECTED&&
INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=null);controls.update();stats.update()}function render(){cssRenderer.render(cssScene,camera);WebGLRenderer.render(WebGLScene,camera)};
