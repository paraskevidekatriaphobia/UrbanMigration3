/* =========================================================================
 *
 *  Entity.js
 *  Each entity has an unique ID
 *
 * ========================================================================= */
/// <reference path="./Component.ts" />
/// <reference path="./HashSet.ts" />
module ECS {
    export class Entity {
        name: string;
        id: string;
        count: number;
        components: Utils.HashSet<Component>;
        constructor(name: string) {
            this.name = name;
            this.id = (+new Date()).toString(16) +
                (Math.random() * 100000000 | 0).toString(16) +
                this.count;
            this.count++;
            this.components = new Utils.HashSet<Component>();
        }
        addComponent(component: Component) {
            this.components.set(component.name, component);
            //console.log("add ["+component.name+"] component");
        }
        removeComponent(component: Component) {
            var name = component.name;
            var deletOrNot = this.components.delete(name);
            if (deletOrNot) {
                console.log("delete [" + name + "] success!");
            } else {
                console.log("delete [" + name + "] fail! not exist!");
            }
        }
    }


    export class ThreeJsMoveEntity {
        startPos: [number, number, number];
        endPos: [number, number, number];
        start_id: any;
        end_id: any;

        num: number;
        constructor(start_id: any, end_id: any, startPos: [number, number, number], endPos: [number, number, number], num: number) {
            this.startPos = startPos;
            this.endPos = endPos;
            this.start_id = start_id;
            this.end_id = end_id;
            this.num = num;
        }
    }
}

