/* =========================================================================
 *
 *  Component.ts
 *  Each entity can obtain many components
 *
 * ========================================================================= */
/// <reference path="./HashSet.ts" />
module ECS {
    export class Component {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    export class JsonDataComponent extends Component {
        data: string;
        file_path: string;
        constructor(path: string, value: string = "") {
            super("jsondata");
            this.data = value;
            this.file_path = path;
        }
    }

    export class TextureComponent extends Component {
        texture: any;
        file_path: string;
        constructor(path: string) {
            super("texture");
            this.file_path = path;
        }
    }

    export class JapanCityDataComponent extends Component {
        id: string;
        lon: number;
        lat: number;
        constructor(id: string, lon: number, lat: number) {
            super("japancity");
            this.id = id;
            this.lon = lon;
            this.lat = lat;
        }
    }

    export class HumanMovementDataComponent extends Component {
        b_id: string;
        b_lon: number;
        b_lat: number;
        a_id: string;
        a_lon: number;
        a_lat: number;

        num: number;
        constructor(b_id: string, b_lon: number, b_lat: number, a_id: string, a_lon: number, a_lat: number, num: number) {
            super("humanmove");
            this.b_id = b_id;
            this.b_lon = b_lon;
            this.b_lat = b_lat;
            this.a_id = a_id;
            this.a_lon = a_lon;
            this.a_lat = a_lat;
            this.num = num;
        }
    }

    export class GlobalComponent extends Component {
        data: Utils.HashSet<any>;
        constructor(data: Utils.HashSet<any>) {
            super("global");
            this.data = data;
        }
    }
}
