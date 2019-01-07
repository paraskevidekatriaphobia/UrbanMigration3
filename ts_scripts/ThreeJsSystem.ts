/* =========================================================================
 *
 *  ThreeJsSystem.ts
 *  game execute logical
 *
 * ========================================================================= */
/// <reference path="./Entity.ts" />
/// <reference path="./Component.ts" />
/// <reference path="./System.ts" />
/// <reference path="./EventSystem.ts" />
/// <reference path="./MainSystem.ts" />
/// <reference path="./HashSet.ts" />
/// <reference path="./Utils.ts" />
module ECS {
    declare var THREE: any;
    declare var $: any;
    declare var Math: any;
    declare var Stats: any;
    declare var dat: any;
    // declare var d3Graphs:any;

    let citylistname: string[] = new Array("Hokaido", "Aomori", "Iwate", "Miyagi", "Akita",
        "Yamakata", "Fukushima", "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata",
        "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi", "Mie",
        "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima",
        "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kouchi", "Fukuoka", "Saga", "Nagasaki",
        "Kumamoto", "Ooita", "Miyazaki", "Kagoshima", "Okinawa");

    export class ThreeJsSystem extends System {
        GlobalParams: Utils.HashSet<any>;
        CityEndCodeMap: any;
        CityShowMap: any;
        AreaCityCodeMap : any;
        CityStartCodeMap:any;
        StartEndCodeMap:any;

        constructor() {
            super("threejs");
            this.GlobalParams = new Utils.HashSet<any>();
            this.CityEndCodeMap = {
                Hokaido: "01000",
                Aomori: "02000",
                Iwate: "03000",
                Miyagi: "04000",
                Akita: "05000",
                Yamakata: "06000",
                Fukushima: "07000",
                Ibaraki: "08000",
                Tochigi: "09000",
                Gunma: "10000",
                Saitama: "11000",
                Chiba: "12000",
                Tokyo: "13000",
                Kanagawa: "14000",
                Niigata: "15000",
                Toyama: "16000",
                Ishikawa: "17000",
                Fukui: "18000",
                Yamanashi: "19000",
                Nagano: "20000",
                Gifu: "21000",
                Shizuoka: "22000",
                Aichi: "23000",
                Mie: "24000",
                Shiga: "25000",
                Kyoto: "26000",
                Osaka: "27000",
                Hyogo: "28000",
                Nara: "29000",
                Wakayama: "30000",
                Tottori: "31000",
                Shimane: "32000",
                Okayama: "33000",
                Hiroshima: "34000",
                Yamaguchi: "35000",
                Tokushima: "36000",
                Kagawa: "37000",
                Ehime: "38000",
                Kouchi: "39000",
                Fukuoka: "40000",
                Saga: "41000",
                Nagasaki: "42000",
                Kumamoto: "43000",
                Ooita: "44000",
                Miyazaki: "45000",
                Kagoshima: "46000",
                Okinawa: "47000"
            };

            this.CityStartCodeMap ={
                Hokaido: "002",
                Aomori: "003",
                Iwate: "004",
                Miyagi: "005",
                Akita: "006",
                Yamakata: "007",
                Fukushima: "008",
                Ibaraki: "009",
                Tochigi: "010",
                Gunma: "011",
                Saitama: "012",
                Chiba: "013",
                Tokyo: "014",
                Kanagawa: "015",
                Niigata: "016",
                Toyama: "017",
                Ishikawa: "018",
                Fukui: "019",
                Yamanashi: "020",
                Nagano: "021",
                Gifu: "022",
                Shizuoka: "023",
                Aichi: "024",
                Mie: "025",
                Shiga: "026",
                Kyoto: "027",
                Osaka: "028",
                Hyogo: "029",
                Nara: "030",
                Wakayama: "031",
                Tottori: "032",
                Shimane: "033",
                Okayama: "034",
                Hiroshima: "035",
                Yamaguchi: "036",
                Tokushima: "037",
                Kagawa: "038",
                Ehime: "039",
                Kouchi: "040",
                Fukuoka: "041",
                Saga: "042",
                Nagasaki: "043",
                Kumamoto: "044",
                Ooita: "045",
                Miyazaki: "046",
                Kagoshima: "047",
                Okinawa: "048"
            }

            this.AreaCityCodeMap = {
                北海道:"Hokaido",
                東北:"Aomori,Iwate,Miyagi,Akita,Yamakata,Fukushima",
                関東:"Ibaraki,Tochigi,Gunma,Saitama,Chiba,Tokyo,Kanagawa",
                中部:"Niigata,Toyama,Ishikawa,Fukui,Yamanashi,Nagano,Gifu,Shizuoka,Aichi,Mie",
                関西:"Shiga,Kyoto,Osaka,Hyogo,Nara,Wakayama",
                中国:"Tottori,Shimane,Okayama,Hiroshima,Yamaguchi",
                四国:"Tokushima,Kagawa,Ehime,Kouchi",
                九州:"Fukuoka,Saga,Nagasaki,Kumamoto,Ooita,Miyazaki,Kagoshima,Okinawa",
                //大都市:""
            }

            this.CityShowMap = {
                Hokaido: true,
                Aomori: true,
                Iwate: true,
                Miyagi: true,
                Akita: true,
                Yamakata: true,
                Fukushima: true,
                Ibaraki: true,
                Tochigi: true,
                Gunma: true,
                Saitama: true,
                Chiba: true,
                Tokyo: false,
                Kanagawa: true,
                Niigata: true,
                Toyama: true,
                Ishikawa: true,
                Fukui: true,
                Yamanashi: true,
                Nagano: true,
                Gifu: true,
                Shizuoka: true,
                Aichi: true,
                Mie: true,
                Shiga: true,
                Kyoto: true,
                Osaka: true,
                Hyogo: true,
                Nara: true,
                Wakayama: true,
                Tottori: true,
                Shimane: true,
                Okayama: true,
                Hiroshima: true,
                Yamaguchi: true,
                Tokushima: true,
                Kagawa: true,
                Ehime: true,
                Kouchi: true,
                Fukuoka: true,
                Saga: true,
                Nagasaki: true,
                Kumamoto: true,
                Ooita: true,
                Miyazaki: true,
                Kagoshima: true,
                Okinawa: true
            };

        }

        wrap(value: any, min: any, rangeSize: any) {
            rangeSize -= min;
            while (value < min) {
                value += rangeSize;
            }
            return value % rangeSize;
        }

        GetVisualizedMesh(lineArray: Utils.HashSet<any>, numberArray:Utils.HashSet<any>) {


            var LineMeshArray = [];
            var randomColor = [0x6C6C6C];//[0x1A62A5, 0x6C6C6C, 0xAEB21A, 0x1DB2C4, 0xB68982, 0x9FBAE3, 0xFD690F, 0xFEAE65, 0xDA5CB6, 0x279221, 0xD2D479, 0x89DC78, 0xBBBBBB, 0xCA0F1E, 0x814EAF, 0xB89FCB, 0x78433B];


            //	go through the data from year, and find all relevant geometries
            lineArray.forEach((k,v)=>{

                var particlesGeo = new THREE.BufferGeometry();
                var particlePositions = [];
                var particleSizes = [];
                var particleColors = [];
                particlesGeo.vertices = [];
                var randomIndex = Utils.randomInt(0, 15);
                var lineColor = new THREE.Color();
                var particleCol = new THREE.Color();

                var lastColor;

                var linePositions = [];
                var lineColors = [];
                //	grab the colors from the vertices
                for (let s of v.vertices) {
                    //console.log(s.x);
                    linePositions.push(s.x, s.y, s.z);
                    lineColor.setHSL(0, 1.0, 0.5);
                    lineColors.push(lineColor.r,lineColor.g,lineColor.b);
                    lastColor = lineColor;
                    particleCol.setHSL(0.5,1.0,0.5);
                }
                
                var linesGeo = new THREE.LineGeometry();
                linesGeo.setPositions(linePositions);
                linesGeo.setColors(lineColors);



                //get current number
                var n = numberArray.get(k);
                n = n * 0.00001;

                //define line material
                var matLine = new THREE.LineMaterial({

                    color: 0xffffff,
                    linewidth: n, // in pixels
                    vertexColors: THREE.VertexColors,
                    //resolution:  // to be set by renderer, eventually
                    dashed: false
    
                });
                var splineOutline = new THREE.Line2(linesGeo, matLine);

                //particle
                 var particleColor = particleCol.clone();
                var points = v.vertices;
                var particleCount = 1;
                var particleSize = v.size * this.GlobalParams.get("dpr");

                for (var rIndex = 0; rIndex < points.length - 1; rIndex++) {
                    for (var s = 0; s < particleCount; s++) {
                        var point = points[rIndex];
                        var particle = point.clone();
                        particle.moveIndex = rIndex;
                        particle.nextIndex = rIndex + 1;
                        if (particle.nextIndex >= points.length)
                            particle.nextIndex = 0;
                        particle.lerpN = 0;
                        particle.path = points;
                        particlesGeo.vertices.push(particle);
                        particle.size = particleSize;

                        particlePositions.push(particle.x, particle.y, particle.z);
                        particleSizes.push(particleSize);
                        particleColors.push(particleColor.r, particleColor.g, particleColor.b);
                    }
                }

                particlesGeo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(particlePositions), 3));
                particlesGeo.addAttribute('size', new THREE.BufferAttribute(new Float32Array(particleSizes), 1));
                particlesGeo.addAttribute('customColor', new THREE.BufferAttribute(new Float32Array(particleColors), 3));

                var uniforms = {
                    amplitude: { type: "f", value: 1.0 },
                    color: { type: "c", value: new THREE.Color(0xffffff) },
                    texture: { type: "t", value: new THREE.TextureLoader().load("./images/particleA.png") },
                };

                var shaderMaterial = new THREE.ShaderMaterial({

                    uniforms: uniforms,
                    vertexShader: document.getElementById('vertexshader').textContent,
                    fragmentShader: document.getElementById('fragmentshader').textContent,

                    blending: THREE.AdditiveBlending,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                    // sizeAttenuation: true,
                });



                var pSystem = new THREE.Points(particlesGeo, shaderMaterial);
                pSystem.dynamic = true;
                splineOutline.add(pSystem);

                pSystem.update = function () {
                    // var time = Date.now();
                    var positionArray = this.geometry.attributes.position.array;
                    var index = 0;
                    for (var i in this.geometry.vertices) {
                        var particle = this.geometry.vertices[i];
                        var path = particle.path;
                        var moveLength = path.length;

                        particle.lerpN += 0.05;
                        if (particle.lerpN > 1) {
                            particle.lerpN = 0;
                            particle.moveIndex = particle.nextIndex;
                            particle.nextIndex++;
                            if (particle.nextIndex >= path.length) {
                                particle.moveIndex = 0;
                                particle.nextIndex = 1;
                            }
                        }

                        var currentPoint = path[particle.moveIndex];
                        var nextPoint = path[particle.nextIndex];


                        particle.copy(currentPoint);
                        particle.lerp(nextPoint, particle.lerpN);

                        positionArray[index++] = particle.x;
                        positionArray[index++] = particle.y;
                        positionArray[index++] = particle.z;
                    }
                    this.geometry.attributes.position.needsUpdate = true;
                };
                LineMeshArray.push(splineOutline);
            }) 




            return LineMeshArray;
        }

  
        VisualizationLine(lineArray: Utils.HashSet<any>,numberArray: Utils.HashSet<any>) {
            var visualizationMesh = this.GlobalParams.get("visualizationMesh");
            //	clear children
            while (visualizationMesh.children.length > 0) {
                var c = visualizationMesh.children[0];
                visualizationMesh.remove(c);
            }


            //	build the mesh
            var mesh = this.GetVisualizedMesh(lineArray,numberArray);

            //	add it to scene graph
            for (var i = 0; i < mesh.length; i++) {
                visualizationMesh.add(mesh[i]);
            }



            this.GlobalParams.set("visualizationMesh", visualizationMesh);
        }

        UpdateOSMTile(p_lon: any, p_lat: any, zoom: any) {

            var xtile = Utils.long2tile(p_lon, zoom);
            var ytile = Utils.lat2tile(p_lat, zoom);
            var osmSwitch = this.GlobalParams.get("osmSwitch");

            var tiles = {};
            var nextMinXtile, nextMaxXtile;
            var rotating = this.GlobalParams.get("rotating");
            var tileGroup = this.GlobalParams.get("tileGroup");
            var tileGroups = this.GlobalParams.get("tileGroups");
            var ZOOM_MIN = this.GlobalParams.get("ZOOM_MIN");
            var ZOOM_SHIFT_SIZE = this.GlobalParams.get("ZOOM_SHIFT_SIZE");
            var MAX_TILEMESH = this.GlobalParams.get("MAX_TILEMESH");
            var TILE_PROVIDER = this.GlobalParams.get("TILE_PROVIDER");
            var radius = this.GlobalParams.get("radius");

            rotating.remove(tileGroups);
            tileGroups = new THREE.Object3D(); //create an empty container
            rotating.add(tileGroups);
            //console.log('zoom_ start:', Math.max(zoom, ZOOM_MIN));
            //console.log('zoom_ end:', Math.max(zoom - ZOOM_SHIFT_SIZE, ZOOM_MIN) + 1);

            if (osmSwitch) {
                for (var zoom_ = Math.max(zoom, ZOOM_MIN); zoom_ > Math.max(zoom - ZOOM_SHIFT_SIZE, ZOOM_MIN); zoom_--) {
                    var zShift = zoom - zoom_;
                    tileGroup[zShift] = new THREE.Object3D();
                    tileGroups.add(tileGroup[zShift]);
                    // var zoom_ = zoom - zShift;
                    if (zoom_ < 0 && zShift > 0) {
                        continue;
                    }

                    var size = 2;
                    var factor = Math.pow(2, zShift);
                    var xtile_ = Math.floor(xtile / factor);
                    var ytile_ = Math.floor(ytile / factor);

                    if (zoom < 8) {
                        var size = 2;
                    } else if (zoom < 10) {
                        var size = 2;
                    } else {
                        size = 1;
                    }
                    var minXtile = Math.floor((xtile_ - (Math.pow(2, (size - 1)) - 1)) / 2) * 2;
                    var maxXtile = Math.floor((xtile_ + (Math.pow(2, (size - 1)) - 1)) / 2) * 2 + 1;
                    var minYtile = Math.floor((ytile_ - (Math.pow(2, (size - 1)) - 1)) / 2) * 2;
                    var maxYtile = Math.floor((ytile_ + (Math.pow(2, (size - 1)) - 1)) / 2) * 2 + 1;

                    if (minXtile < 0 && maxXtile >= 0) {
                        var minXOffset = Math.abs(minXtile) % 32;
                        var realMinX = 32 - minXOffset;
                        var realMaxX = 32 + maxXtile;
                        minXtile = realMinX;
                        maxXtile = realMaxX;
                    } else if (minXtile < 0 && maxXtile < 0) {
                        var minXOffset = Math.abs(minXtile) % 32;
                        var realMinX = 32 - minXOffset;
                        var maxXOffset = Math.abs(maxXtile) % 32;
                        var realMaxX = 32 - maxXOffset;
                        minXtile = realMinX;
                        maxXtile = realMaxX;
                    }

                    // console.log({
                    //     'zoom_': zoom_,
                    //     'xtile_': xtile_,
                    //     'ytile_': ytile_,
                    //     'minXtile': minXtile,
                    //     'maxXtile': maxXtile,
                    //     'minYtile': minYtile,
                    //     'maxYtile': maxYtile,
                    //     'lon':p_lon,
                    //     'p_lat':p_lat
                    // })


                    var modulus = (zoom_ > 0) ? Math.pow(2, zoom_) : 0;

                    for (var atile = minXtile; atile <= maxXtile; atile++) {
                        for (var btile = minYtile; btile <= maxYtile; btile++) {
                            var lon1 = Utils.tile2long(atile, zoom_);
                            var lat1 = Utils.tile2lat(btile, zoom_);
                            var lon2 = Utils.tile2long(atile + 1, zoom_);
                            var lat2 = Utils.tile2lat(btile + 1, zoom_);
                            var lat = (lat1 + lat2) / 2;
                            var lon = (lon1 + lon2) / 2;

                            var widthUp = Utils.measure(radius, lat1, lon1, lat1, lon2);
                            var widthDown = Utils.measure(radius, lat2, lon1, lat2, lon2);
                            var widthSide = Utils.measure(radius, lat1, lon1, lat2, lon1);

                            var id = 'z_' + zoom_ + '_' + atile + "_" + btile;
                            for (var zzz = 1; zzz <= 2; zzz++) {
                                var idNext = 'z_' + (zoom_ - zzz) + '_' + Math.floor(atile / Math.pow(2, zzz)) + "_" + Math.floor(btile / Math.pow(2, zzz));
                                tiles[idNext] = {};
                            }
                            if (!tiles.hasOwnProperty(id)) {

                                var tileEarth = new THREE.Object3D(); //create an empty container
                                tileEarth.rotation.set(0, (lon1 + 180) * Math.PI / 180, 0);
                                tileGroup[zShift].add(tileEarth);
                                var tileMesh = Utils.getTileMesh(radius, zoom_, btile, MAX_TILEMESH);
                                tileEarth.add(tileMesh);


                                (function (yourTileMesh, yourZoom, yourXtile, yourYtile) {


                                    var onLoaded = function (texture) {
                                        // MeshFaceMaterial
                                        yourTileMesh.material = new THREE.MeshBasicMaterial({
                                            map: texture
                                        });
                                    };
                                    Utils.textureFactory(TILE_PROVIDER, MAX_TILEMESH, yourZoom, yourXtile, yourYtile, onLoaded);
                                })(tileMesh, zoom_, atile % modulus, btile % modulus);
                            }
                        }
                    }
                }
            }


            this.GlobalParams.set("xtile", xtile);
            this.GlobalParams.set("ytile", ytile);
            this.GlobalParams.set("rotating", rotating);
            this.GlobalParams.set("tileGroups", tileGroups);
            this.GlobalParams.set("tileGroup", tileGroup);
        }

        initUi() {

            //init user UI
            var GlobalParams = this.GlobalParams;
            var osmSwitch = GlobalParams.get("osmSwitch");


            //********** */
            var startParam = new Object();
            for (var i = 0; i < citylistname.length; i++) {
                startParam[citylistname[i]] = false;
            }
            
            var endParam = new Object();
            for (var i = 0; i < citylistname.length; i++) {
                endParam[citylistname[i]] = false;
            }

            //GlobalParams.set("earthParam", earthParam);


            //GUI


            var gui_end = new dat.GUI();
            var gui_start = new dat.GUI();
            var gui_year = new dat.GUI();

            var gui_year_text = {
                'year' : 2008,
                'width(px)' : 0.002
            }
            var yearbar = gui_year.add(gui_year_text,'year',2008,2017);
            /*
            yearbar.onFinshChange(function(value){
                
            });*/



            var startArea = new Array();
            var endArea = new Array();


            //init ui and data through mapping table
            Object.keys(this.AreaCityCodeMap).forEach((area_name)=> {
                var StartLayer = gui_start.addFolder(area_name);
                var EndLayer = gui_end.addFolder(area_name);

                var AreaList = this.AreaCityCodeMap[area_name].split(',');
                AreaList.forEach( city_name=> {
                    var ceid = this.CityEndCodeMap[city_name];
                    var csid = this.CityStartCodeMap[city_name];
                    //console.log(cid);
                    var current_start_city = new Object();
                    var current_end_city = new Object();
                    //add properity
                    current_start_city["name"] = city_name;
                    current_start_city["id"] = csid;

                    current_end_city["name"] = city_name;
                    current_end_city["id"] = ceid;

                    //add listener function
                    current_start_city["listen"] = StartLayer.add(startParam,city_name).listen();
                    current_end_city["listen"] = EndLayer.add(endParam,city_name).listen();
                    
                    startArea.push(current_start_city);
                    endArea.push(current_end_city);
                });
            });


            var startSelectedList = new Utils.HashSet<string>();
            var endSelectedList = new Utils.HashSet<string>();

            //listen user operation(select 'start' or 'end')
            startArea.forEach((startCityObj)=>{
                startCityObj.listen.onChange((val) => {
                    var lineArray = new Array();
                    var moveDataForSphere = this.GlobalParams.get("moveDataForSphere");
                    //console.log(moveDataForSphere);
                    //console.log("start pos,name:"+startCityObj.name+",id:"+startCityObj.id);
                    if(val){
                        startSelectedList.set(startCityObj.name,startCityObj.id);
                    }else{
                        startSelectedList.delete(startCityObj.name);
                    }

                    //render line
                    startSelectedList.forEach((sk,sv)=>{
                        endSelectedList.forEach((ek,ev)=>{
                            console.log("start:"+sk+",end:"+ek);
                            if(sk != ek){
                                //data visual
                                lineArray.push(Utils.BuildShpereDataVizGeometry(moveDataForSphere,sv+ev));
                            }
                        });
                    });

                    //this.VisualizationLine(lineArray);

                }); 
            });

            endArea.forEach((endCityObj)=>{
                endCityObj.listen.onChange((val) => {
                    var lineArray = new Utils.HashSet<any>();
                    var moveDataForSphere = this.GlobalParams.get("moveDataForSphere");
                    
                    //console.log("end pos,name:"+endCityObj.name+",id:"+endCityObj.id);
                    if(val){
                        endSelectedList.set(endCityObj.name,endCityObj.id);
                    }else{
                        endSelectedList.delete(endCityObj.name);
                    }

                    //console.log("/*---------population------------*/")
                    var visual_line_array = new Utils.HashSet<number>();
                    //render line
                    startSelectedList.forEach((sk,sv)=>{
                        endSelectedList.forEach((ek,ev)=>{
                            //console.log("start:"+sk+",end:"+ek);
                            if(sk != ek){
                                //data visual
                                //console.log(moveDataForSphere);
                                //console.log(sk+ek);

                                //add population to array
                                //console.log(moveDataForSphere.get(sv+ev).num);
                                visual_line_array.set(sv+ev,parseInt(moveDataForSphere.get(sv+ev).num));
                                //console.log(moveDataForSphere.get(sv+ev).num);
                                lineArray.set(sv+ev,Utils.BuildShpereDataVizGeometry(moveDataForSphere,sv+ev));
                            }
                        });
                    });

                    //calculate line width
                    //example average
                    // var v_average = 0;
                    // visual_line_array.forEach(v=>{
                    //     v_average+=v;

                    // });
                    // console.log("Selected Routes Average value:"+ v_average/visual_line_array.length);
                    


                    this.VisualizationLine(lineArray,visual_line_array);
                }); 
            });


            

            //------------------------------------------------------------------------------------------------------------------
            // function guiChanged() {

            //     var camera = GlobalParams.get("camera");
            //     var renderer = GlobalParams.get("renderer");
            //     var scene = GlobalParams.get("scene");
            //     var nighttexture = GlobalParams.get("earthParam").NightView;
            //     var osmSwitchNow = GlobalParams.get("earthParam").LoadOSM;
            //     var earthSphere = GlobalParams.get("earthSphere");

            //     if (nighttexture) {
            //         earthSphere.material.map = new THREE.TextureLoader().load('./images/nightearth2016.jpg');
            //         earthSphere.material.needsUpdate = true;
            //     } else {
            //         earthSphere.material.map = new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg');
            //         earthSphere.material.needsUpdate = true;
            //     }

            //     if (osmSwitchNow) GlobalParams.set("osmSwitch", true);
            //     else GlobalParams.set("osmSwitch", false);

            //     GlobalParams.set("earthSphere", earthSphere);
            //     renderer.render(scene, camera);

            // }

     
            // guiChanged();
        }

        InitThreeJs() {

            var glContainer = document.getElementById('glContainer');
            var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
            this.GlobalParams.set("dpr", dpr);
            this.GlobalParams.set("selectedTest", null);

            var selectableTests = [];
            //osm tile groups
            var TILE_PROVIDER = 'https://a.tile.openstreetmap.org';
            var ZOOM_SHIFT_SIZE = 10;
            var ZOOM_MIN = 5;
            var MAX_TILEMESH = 500;
            var tileGroup = [];
            var tileGroups;

            //Global Data
            var global_data = (<GlobalComponent>this.GlobalDatas.components.get("global")).data;
            var moveData2008 = global_data.get("moveData2008");

            var scene = new THREE.Scene();
            scene.matrixAutoUpdate = false;
            scene.add(new THREE.AmbientLight(0x505050));


            var light1 = new THREE.SpotLight(0xeeeeee, 2);
            light1.position.x = 1730;
            light1.position.y = 1520;
            light1.position.z = 626;
            light1.castShadow = true;
            scene.add(light1);

            var light2 = new THREE.PointLight(0x222222, 14);
            light2.position.x = -640;
            light2.position.y = -500;
            light2.position.z = -1000;
            scene.add(light2);

            var rotating = new THREE.Object3D();
            scene.add(rotating);

            var mapMaterial = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg'),
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            });

            // var mapMaterial = new THREE.MeshPhongMaterial({
            //     map: new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg'),
            //     bumpMap: new THREE.TextureLoader().load('./images/elev_bump_4k.jpg'),
            //     bumpScale: 0.005,
            //     specularMap: new THREE.TextureLoader().load('./images/water_4k.png'),
            //     specular: new THREE.Color('grey'),
            //     polygonOffset: true,
            //     polygonOffsetFactor: 1,
            //     polygonOffsetUnits: 1
            // })

            var radius = 100;
            var segments = 40;

            var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius - 1, segments, segments), mapMaterial);
            sphere.doubleSided = false;
            sphere.rotation.x = Math.PI;
            sphere.rotation.y = -Math.PI / 2;
            sphere.rotation.z = Math.PI;
            sphere.id = "base";
            rotating.add(sphere);

            //map index
            var lookupCanvas = document.createElement('canvas');
            lookupCanvas.width = 256;
            lookupCanvas.height = 1;

            var lookupTexture = new THREE.Texture(lookupCanvas);
            lookupTexture.magFilter = THREE.NearestFilter;
            lookupTexture.minFilter = THREE.NearestFilter;
            lookupTexture.needsUpdate = true;

            var indexedMapTexture = new THREE.TextureLoader().load('./images/map_indexed.png');

            indexedMapTexture.needsUpdate = true;
            indexedMapTexture.magFilter = THREE.NearestFilter;
            indexedMapTexture.minFilter = THREE.NearestFilter;

            //clouds

            var cloudsMesh = new THREE.Mesh(
                new THREE.SphereGeometry(radius + 1, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: new THREE.TextureLoader().load(/*'./images/fair_clouds_4k.png'*/),
                    transparent: true
                })
            );
            rotating.add(cloudsMesh)


            var atmosphereMaterial = new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
                fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent,
                side: THREE.BackSide
            });

            var atmosphere = new THREE.Mesh(sphere.geometry.clone(), atmosphereMaterial);
            atmosphere.scale.x = atmosphere.scale.y = atmosphere.scale.z = 1.8;
            rotating.add(atmosphere);


            //country coordinates
            //var facilityData = Utils.loadGeoData(latlonData);

            //convert gis data to 3d sphere data
            var moveDataForSphere = new Utils.HashSet<ThreeJsMoveEntity>();

            //load data from dataset
            for (let m of moveData2008) {
                var current_humanmove = <HumanMovementDataComponent>m.components.get("humanmove");
                //console.log("b:" + (<HumanMovementDataComponent>m.components.get("humanmove")).b_id + ",a:" + (<HumanMovementDataComponent>m.components.get("humanmove")).a_id);

                for (var key in this.CityEndCodeMap) {
                    if (this.CityEndCodeMap[key] == current_humanmove.a_id) {
                        var start_lon = current_humanmove.b_lon;
                        var start_lat = current_humanmove.b_lat;
                        var end_lon = current_humanmove.a_lon;
                        var end_lat = current_humanmove.a_lat;
                        var num = current_humanmove.num;
                        var start_pos = Utils.ConvertGISDataTo3DSphere(start_lon, start_lat);
                        var end_pos = Utils.ConvertGISDataTo3DSphere(end_lon, end_lat);
                        moveDataForSphere.set(current_humanmove.b_id+current_humanmove.a_id,new ThreeJsMoveEntity(current_humanmove.b_id,current_humanmove.a_id,[start_pos.x, start_pos.y, start_pos.z], [end_pos.x, end_pos.y, end_pos.z], num));
                    }
                }
            }

            var visualizationMesh = new THREE.Object3D();
            this.GlobalParams.set("visualizationMesh", visualizationMesh);
            rotating.add(visualizationMesh);
            this.GlobalParams.set("rotating", rotating);
            this.GlobalParams.set("moveDataForSphere",moveDataForSphere);

            // //data visual
            //var lineArray = Utils.BuildSphereDataVizGeometries(moveDataForSphere);

            // var visualizationMesh = new THREE.Object3D();
            // this.GlobalParams.set("visualizationMesh", visualizationMesh);
            // visualizationMesh.name = "lineMesh";
            // rotating.add(visualizationMesh);

            //this.VisualizationLine(lineArray);



            //	-----------------------------------------------------------------------------
            //	Setup renderer
            var renderer = new THREE.WebGLRenderer({ antialias: false });
            renderer.setPixelRatio(dpr);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = false;

            renderer.sortObjects = false;
            renderer.generateMipmaps = false;




            //event listener
            //(<EventListenerSystem>(<MainSystem>this.MainSystem).OtherSystems.get("eventlistener")).InitEventListener();


            //	-----------------------------------------------------------------------------
            //	Setup camera
            var aspect = window.innerWidth / window.innerHeight;
            var camera = new THREE.PerspectiveCamera(12 / Math.min(aspect, 1), aspect, 1, 20000);

            camera.up.set(0, 0, 1);
            camera.position.z = 800;
            camera.position.y = 0;
            camera.lookAt(scene.position);
            camera.zoom = 0.5;
            scene.add(camera);


            var controls = new THREE.EarthControls(camera, renderer.domElement);
            glContainer.appendChild(renderer.domElement);
            var stats = new Stats();
            glContainer.appendChild(stats.dom);

            this.GlobalParams.set("scene", scene);
            this.GlobalParams.set("zoom", 0);
            this.GlobalParams.set("controls", controls);
            this.GlobalParams.set("lonStamp", 0);
            this.GlobalParams.set("latStamp", 0);
            this.GlobalParams.set("camera", camera);
            this.GlobalParams.set("renderer", renderer);
            this.GlobalParams.set("cloudsMesh", cloudsMesh);
            this.GlobalParams.set("tileGroup", tileGroup);
            this.GlobalParams.set("tileGroups", tileGroups);
            this.GlobalParams.set("ZOOM_SHIFT_SIZE", ZOOM_SHIFT_SIZE);
            this.GlobalParams.set("ZOOM_MIN", ZOOM_MIN);
            this.GlobalParams.set("MAX_TILEMESH", MAX_TILEMESH);
            this.GlobalParams.set("TILE_PROVIDER", TILE_PROVIDER);
            this.GlobalParams.set("radius", radius);
            this.GlobalParams.set("earthSphere", sphere);
            this.GlobalParams.set("osmSwitch", false);
            this.GlobalParams.set("stats", stats);
            this.GlobalParams.set("timeLast", Date.now());
        }

        render() {
            this.GlobalParams.get("renderer").clear();
            this.GlobalParams.get("renderer").render(this.GlobalParams.get("scene"), this.GlobalParams.get("camera"));
        }

        AnimeUpdate() {
            var camera = this.GlobalParams.get("camera");
            var renderer = this.GlobalParams.get("renderer");
            var scene = this.GlobalParams.get("scene");
            var cloudMesh = this.GlobalParams.get("cloudsMesh");
            var EventListenerGlobalParams = (<EventListenerSystem>(<MainSystem>this.MainSystem).OtherSystems.get("eventlistener")).GlobalParams;
            var rotateVX = EventListenerGlobalParams.get("rotateVX");
            var rotateVY = EventListenerGlobalParams.get("rotateVY");
            var rotateX = EventListenerGlobalParams.get("rotateX");
            var rotateY = EventListenerGlobalParams.get("rotateY");
            var rotateTargetX = EventListenerGlobalParams.get("rotateTargetX");
            var rotateTargetY = EventListenerGlobalParams.get("rotateTargetY");
            var dragging = EventListenerGlobalParams.get("dragging");
            var rotateXMax = EventListenerGlobalParams.get("rotateXMax");
            var tiltTarget = EventListenerGlobalParams.get("tiltTarget");
            var tilt = EventListenerGlobalParams.get("tilt");
            var scaleTarget = EventListenerGlobalParams.get("scaleTarget");
            var rotating = this.GlobalParams.get("rotating");
            var osmTile = this.GlobalParams.get("osmTile");
            var ZOOM_MIN = this.GlobalParams.get("ZOOM_MIN");
            var ZOOM_SHIFT_SIZE = this.GlobalParams.get("ZOOM_SHIFT_SIZE");
            var oldZoom = this.GlobalParams.get("zoom");
            var zoom = this.GlobalParams.get("zoom");
            var controls = this.GlobalParams.get("controls");
            var targetPos = this.GlobalParams.get("targetPos");


            this.GlobalParams.set("timeNow", Date.now());
            cloudMesh.rotation.y += (1 / 16 * (this.GlobalParams.get("timeNow") - this.GlobalParams.get("timeLast"))) / 1000;


            var dist = new THREE.Vector3().copy(controls.object.position).sub(controls.target).length();

            var zoom = Math.floor(Math.max(Math.min(Math.floor(15 - Math.log2(dist)), ZOOM_MIN + ZOOM_SHIFT_SIZE), ZOOM_MIN));

            var latStamp = this.GlobalParams.get("latStamp");
            var lonStamp = this.GlobalParams.get("lonStamp");
            var xtile = this.GlobalParams.get("xtile");
            var ytile = this.GlobalParams.get("ytile");

            if (lonStamp != controls.getLongitude() || latStamp != controls.getLatitude()) {
                lonStamp = controls.getLongitude();
                latStamp = controls.getLatitude();

                rotating.rotation.set(
                    latStamp * Math.PI / 180,
                    (-lonStamp) * Math.PI / 180,
                    0);
                var oldXtile = xtile;
                var oldYtile = ytile;
                xtile = Utils.long2tile(lonStamp, zoom);
                ytile = Utils.lat2tile(latStamp, zoom);
                if (Math.abs(oldXtile - xtile) >= 1 ||
                    Math.abs(oldYtile - ytile) >= 1) {
                    this.UpdateOSMTile(lonStamp, latStamp, zoom);
                }
            } else if (Math.abs(zoom - oldZoom) >= 1) {

                this.UpdateOSMTile(lonStamp, latStamp, zoom);
            }

            this.GlobalParams.set("zoom", zoom);
            this.GlobalParams.set("latStamp", latStamp);
            this.GlobalParams.set("lonStamp", lonStamp);
            this.GlobalParams.set("xtile", xtile);
            this.GlobalParams.set("ytile", ytile);
            this.GlobalParams.set("timeLast", Date.now());


            EventListenerGlobalParams.set("rotateTargetX", rotateTargetX);
            EventListenerGlobalParams.set("rotateTargetY", rotateTargetY);
            EventListenerGlobalParams.set("rotateX", rotateX);
            EventListenerGlobalParams.set("rotateY", rotateY);
            EventListenerGlobalParams.set("rotateVY", rotateVY);
            EventListenerGlobalParams.set("rotateVX", rotateVX);
            EventListenerGlobalParams.set("tilt", tilt);
            EventListenerGlobalParams.set("tiltTarget", tiltTarget);
            EventListenerGlobalParams.set("scaleTarget", scaleTarget);
            this.GlobalParams.set("controls", controls);
            this.GlobalParams.set("rotating", rotating);
            this.GlobalParams.set("osmTile", osmTile);
            this.GlobalParams.set("camera", camera);
        }

        animate = () => {

            this.AnimeUpdate();

            this.render();

            requestAnimationFrame(this.animate);

            var stats = this.GlobalParams.get("stats");
            stats.update();

            this.GlobalParams.get("rotating").traverse(function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            });
        }

        Execute() {
            super.Execute();
            this.InitThreeJs();
            this.initUi();
            this.animate();
        }
    }

}