/// <reference path="./Component.ts" />
/// <reference path="./LoadingSystem.ts" />
/// <reference path="./Entity.ts" />
/// <reference path="./HashSet.ts" />

declare var Detector: any;

//declare entities
let entity_citycode = new ECS.Entity("citycode_entity");
entity_citycode.addComponent(new ECS.JsonDataComponent("./data/citycode_v2.0.json"));

//city name list
let entity_citymapping = new ECS.Entity("citymapping_entity");
entity_citymapping.addComponent(new ECS.JsonDataComponent("./data/citymapping.json"));

//texture 
let entity_earthtexture = new ECS.Entity("earthtexture_entity");
entity_earthtexture.addComponent(new ECS.TextureComponent("./images/2_no_clouds_16k.jpg"));

//declare urban migration data from json file(Year)
let year_list = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
let entity_year_list = [];

for (let index = 0; index < year_list.length; index++) {
    const _year = year_list[index];
    let entity_year = new ECS.Entity("entity_year_" + _year);
    entity_year.addComponent(new ECS.JsonDataComponent("./data/" + _year + ".json"));
    entity_year_list.push(entity_year);
}


let entities = new Utils.HashSet<ECS.Entity>();
entities.set(entity_citycode.name, entity_citycode);
entities.set(entity_citymapping.name, entity_citymapping);
entities.set(entity_earthtexture.name, entity_earthtexture);

//add year entity data
for (let index = 0; index < entity_year_list.length; index++) {
    const entity_year_data = entity_year_list[index];
    entities.set(entity_year_data.name, entity_year_data);
}


let load_system = new ECS.LoadingSystem(entities);

var load = function () {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    } else {
        load_system.Execute();
    };
}