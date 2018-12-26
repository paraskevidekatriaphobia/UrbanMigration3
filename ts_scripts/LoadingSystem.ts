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
            BeforeNotAllowedList.set("001", "001");
            BeforeNotAllowedList.set("049", "049");
            BeforeNotAllowedList.set("050", "050");
            BeforeNotAllowedList.set("051", "051");
            BeforeNotAllowedList.set("052", "052");
            let AfterNotAllowedList = new Utils.HashSet<string>();
            AfterNotAllowedList.set("00999", "00999");
            AfterNotAllowedList.set("48000", "48000");
            AfterNotAllowedList.set("49000", "49000");
            AfterNotAllowedList.set("50000", "50000");
            AfterNotAllowedList.set("00413", "00413");
            AfterNotAllowedList.set("99000", "99000");
            AfterNotAllowedList.set("99100", "99100");


            let ConflictList = new Utils.HashSet<string>();
            let MovementArray = new Array<Entity>();
            for (let d of data_2008_value) {
                var b = d["@cat01"];
                var a = d["@area"];
                var n = d["$"];

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
                entity_move.addComponent(new HumanMovementDataComponent(before_data.id, before_data.lon, before_data.lat, after_data.id, after_data.lon, after_data.lat));
                MovementArray.push(entity_move);
                //console.log("before cood:"+before_data.lon+","+before_data.lat);
                //console.log("after cood:"+after_data.lon+","+after_data.lat);
            }

            // for(let m of MovementArray){
            //     console.log("b:"+(<HumanMovementDataComponent>m.components.get("humanmove")).b_id+",a:"+(<HumanMovementDataComponent>m.components.get("humanmove")).a_id);
            // }

            ConflictList.forEach(function (f: string) {
                console.log("please check city code!need code:" + f);
            });

            return MovementArray;
        }
        Execute() {
            super.Execute();

            const ENTITY_NUMBER = this.entities.len();
            let data_load_progress = 0;
            this.entities.forEach((k,v:ECS.Entity)=>{
                let json_data = <ECS.JsonDataComponent>v.components.get("jsondata");
                Utils.loadData(json_data.file_path,json_data,() => {
                    
                    data_load_progress+=1;
                    
                    //if all of the json data were loaded, execute main system
                    if(data_load_progress == ENTITY_NUMBER){
                        //get loaded json data
                        var cityCode = JSON.parse((<ECS.JsonDataComponent>this.entities.get("citycode_entity").components.get("jsondata")).data);
                        var data_2008 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2008").components.get("jsondata")).data);
                        var data_2009 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("entity_year_2009").components.get("jsondata")).data);
                        
                        //init migration data by year
                        var moveData_2008 = this.InitDataStructure(data_2008, cityCode);
                        var moveData_2009 = this.InitDataStructure(data_2009, cityCode);
                        
                        //set migration data to gobal variable
                        let entity_GlobalData = new ECS.Entity("global_entity");
                        let global_data = new Utils.HashSet<any>();
                        global_data.set("moveData2008", moveData_2008);
                        global_data.set("moveData2009", moveData_2009);
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
                });
            })
        }
    }
}