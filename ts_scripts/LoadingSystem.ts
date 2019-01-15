/* =========================================================================
 *
 *  LoadingSystem.ts
 *  game loading
 *
 * ========================================================================= */
/// <reference path="./Entity.ts" />
/// <reference path="./Component.ts" />
/// <reference path="./System.ts" />
/// <reference path="./EventSystem.ts" />
/// <reference path="./ThreeJsSystem.ts" />
/// <reference path="./MainSystem.ts" />
/// <reference path="./LoadData.ts" />
/// <reference path="./HashSet.ts" />
/// <reference path="./Utils.ts" />
module ECS {
    declare var THREE: any;

    export class LoadingSystem extends System {

        entities: Utils.HashSet<Entity>;
        constructor(entities: Utils.HashSet<Entity>) {
            super("loading");
            this.entities = entities;
        }

        InitDataStructure(data: any, cityCode: any) {
            var data_2008_value = data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
            var MovementBeforeNode = cityCode.MovementBeforeNode.Value;
            var MoveAfterNode = cityCode.MoveAfterNode.Value;
            let MovementBeforeNodeList = new Utils.HashSet<JapanCityDataComponent>();
            for (let mb of MovementBeforeNode) {
                MovementBeforeNodeList.set(mb.id, new JapanCityDataComponent(mb.id, +mb.lon, +mb.lat));
            }
            let MoveAfterNodeList = new Utils.HashSet<JapanCityDataComponent>();
            for (let ma of MoveAfterNode) {
                MoveAfterNodeList.set(ma.id, new JapanCityDataComponent(ma.id, +ma.lon, +ma.lat));
            }

            let BeforeNotAllowedList = new Utils.HashSet<string>();
            BeforeNotAllowedList.set("00999", "00999");
            BeforeNotAllowedList.set("48000", "48000");
            BeforeNotAllowedList.set("49000", "49000");
            BeforeNotAllowedList.set("50000", "50000");
            BeforeNotAllowedList.set("00413", "00413");
            BeforeNotAllowedList.set("99000", "99000");
            BeforeNotAllowedList.set("99100", "99100");

            let AfterNotAllowedList = new Utils.HashSet<string>();
            AfterNotAllowedList.set("001", "001");
            AfterNotAllowedList.set("049", "049");
            AfterNotAllowedList.set("050", "050");
            AfterNotAllowedList.set("051", "051");
            AfterNotAllowedList.set("052", "052");



            let ConflictList = new Utils.HashSet<string>();
            let MovementArray = new Array<Entity>();
            for (let d of data_2008_value) {
                var b = d["@area"];
                var a = d["@cat01"];
                var n = d["$"];

                //console.log(n);

                //select data load (014 Tokyo)
                //if (b != "014") continue;

                //not need data
                if (BeforeNotAllowedList.get(b) != undefined) continue;
                if (AfterNotAllowedList.get(a) != undefined) continue;
                if (n == "-") continue;


                let before_data = MovementBeforeNodeList.get(b);
                let after_data = MoveAfterNodeList.get(a);


                if (before_data == undefined) {
                    if (ConflictList.get(b) == undefined) {
                        ConflictList.set(b, b);
                    }
                    continue;
                }

                if (after_data == undefined) {
                    if (ConflictList.get(a) == undefined) {
                        ConflictList.set(a, a);
                    }
                    continue;
                }





                let entity_move = new Entity("move_entity");
                entity_move.addComponent(new HumanMovementDataComponent(before_data.id, before_data.lon, before_data.lat, after_data.id, after_data.lon, after_data.lat, n));
                MovementArray.push(entity_move);
                //console.log("before cood:"+before_data.lon+","+before_data.lat);
                //console.log("after cood:"+after_data.lon+","+after_data.lat);
            }

            ConflictList.forEach(function (f: string) {
                //console.log("please check city code!need code:" + f);
            });

            return MovementArray;
        }

        ExecuteSystem() {
            //get loaded json data
            var cityCode = JSON.parse((<ECS.JsonDataComponent>this.entities.get("citycode_entity").components.get("jsondata")).data);
            var cityMapping = JSON.parse((<ECS.JsonDataComponent>this.entities.get("citymapping_entity").components.get("jsondata")).data);

            var data_2008 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2008").components.get("jsondata")).data);
            var data_2009 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2009").components.get("jsondata")).data);
            var data_2010 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2010").components.get("jsondata")).data);
            var data_2011 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2011").components.get("jsondata")).data);
            var data_2012 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2012").components.get("jsondata")).data);
            var data_2013 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2013").components.get("jsondata")).data);
            var data_2014 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2014").components.get("jsondata")).data);
            var data_2015 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2015").components.get("jsondata")).data);
            var data_2016 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2016").components.get("jsondata")).data);
            var data_2017 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2017").components.get("jsondata")).data);

            //get loaded texture data
            var earth_texture = (<ECS.TextureComponent>this.entities.get("earthtexture_entity").components.get("texture")).texture;

            //init migration data by year
            var moveData_2008 = this.InitDataStructure(data_2008, cityCode);
            var moveData_2009 = this.InitDataStructure(data_2009, cityCode);
            var moveData_2010 = this.InitDataStructure(data_2010, cityCode);
            var moveData_2011 = this.InitDataStructure(data_2011, cityCode);
            var moveData_2012 = this.InitDataStructure(data_2012, cityCode);
            var moveData_2013 = this.InitDataStructure(data_2013, cityCode);
            var moveData_2014 = this.InitDataStructure(data_2014, cityCode);
            var moveData_2015 = this.InitDataStructure(data_2015, cityCode);
            var moveData_2016 = this.InitDataStructure(data_2016, cityCode);
            var moveData_2017 = this.InitDataStructure(data_2017, cityCode);

            //set migration data to gobal variable
            let entity_GlobalData = new ECS.Entity("global_entity");
            let global_data = new Utils.HashSet<any>();
            global_data.set("moveData2008", moveData_2008);
            global_data.set("moveData2009", moveData_2009);
            global_data.set("moveData2010", moveData_2010);
            global_data.set("moveData2011", moveData_2011);
            global_data.set("moveData2012", moveData_2012);
            global_data.set("moveData2013", moveData_2013);
            global_data.set("moveData2014", moveData_2014);
            global_data.set("moveData2015", moveData_2015);
            global_data.set("moveData2016", moveData_2016);
            global_data.set("moveData2017", moveData_2017);

            global_data.set("citynames", cityMapping.CityNames.Value);
            global_data.set("citystartcodemap", cityMapping.CityStartCodeMap.Value);
            global_data.set("cityendcodemap", cityMapping.CityEndCodeMap.Value);
            global_data.set("areacitycodemap", cityMapping.AreaCityCodeMap.Value);
            global_data.set("cityshowmap", cityMapping.CityShowMap.Value);
            global_data.set("earthtexture", earth_texture);
            entity_GlobalData.addComponent(new ECS.GlobalComponent(global_data));

            //init system
            let threejs_system = new ECS.ThreeJsSystem();
            let eventlistener_system = new ECS.EventListenerSystem();
            let other_systems = new Utils.HashSet<System>();
            other_systems.set(threejs_system.name, threejs_system);
            other_systems.set(eventlistener_system.name, eventlistener_system);
            let main_system = new ECS.MainSystem(entity_GlobalData, other_systems);
            main_system.Execute();
        }

        Execute() {
            super.Execute();

            const ENTITY_NUMBER = this.entities.len();
            let data_load_progress = 0;
            this.entities.forEach((k, v: ECS.Entity) => {



                //load entities' json file
                let json_data = <ECS.JsonDataComponent>v.components.get("jsondata");
                if (json_data != undefined) {
                    Utils.loadData(json_data.file_path, json_data, () => {

                        data_load_progress += 1;

                        //if all of the json data were loaded, execute main system
                        if (data_load_progress == ENTITY_NUMBER) {
                            this.ExecuteSystem();
                        }
                    });
                }

                //load texture 
                let texture_data = <ECS.TextureComponent>v.components.get("texture");
                if (texture_data != undefined) {
                    var texture_loader = new THREE.TextureLoader();
                    texture_loader.load(
                        texture_data.file_path,
                        (texture) => {
                            texture_data.texture = texture;


                            data_load_progress += 1;

                            //if all of the json data were loaded, execute main system
                            if (data_load_progress == ENTITY_NUMBER) {
                                this.ExecuteSystem();
                            }
                        },
                        // onProgress callback currently not supported
                        undefined,
                        // onError callback
                        (err) => {
                            console.error('Loading Texture Error!');
                        }
                    );
                }
            })
        }
    }
}