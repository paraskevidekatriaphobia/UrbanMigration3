/* =========================================================================
 *
 *  EventSystem.ts
 *  listen user's operation
 *
 * ========================================================================= */
/// <reference path="./System.ts" />
/// <reference path="./Utils.ts" />
module ECS {
    declare var THREE: any;

    export class EventListenerSystem extends System {
        GlobalParams: Utils.HashSet<any>;
        constructor() {
            super("eventlistener");
            this.GlobalParams = new Utils.HashSet<any>();
            var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
            var pressX = 0, pressY = 0;
            var pscale = 0;
            this.GlobalParams.set("mouseX", mouseX);
            this.GlobalParams.set("mouseY", mouseY);
            this.GlobalParams.set("pmouseX", pmouseX);
            this.GlobalParams.set("pmouseY", pmouseY);
            this.GlobalParams.set("pressX", pressX);
            this.GlobalParams.set("pressY", pressY);
            this.GlobalParams.set("pscale", pscale);

            var dragging = false;
            var touchEndTime = 0;
            this.GlobalParams.set("dragging", dragging);
            this.GlobalParams.set("touchEndTime", touchEndTime);

            var rotateX = 0, rotateY = 0;
            var rotateVX = 0, rotateVY = 0;
            var rotateXMax = 90 * Math.PI / 180;
            this.GlobalParams.set("rotateX", rotateX);
            this.GlobalParams.set("rotateY", rotateY);
            this.GlobalParams.set("rotateVX", rotateVX);
            this.GlobalParams.set("rotateVY", rotateVY);
            this.GlobalParams.set("rotateXMax", rotateXMax);

            var rotateTargetX = undefined;
            var rotateTargetY = undefined;
            this.GlobalParams.set("rotateTargetX", rotateTargetX);
            this.GlobalParams.set("rotateTargetY", rotateTargetY);

            var tilt = 0;
            var tiltTarget = undefined;
            var scaleTarget = undefined;
            this.GlobalParams.set("tilt", tilt);
            this.GlobalParams.set("tiltTarget", tiltTarget);
            this.GlobalParams.set("scaleTarget", scaleTarget);

        }
        constrain(v, min, max) {
            if (v < min)
                v = min;
            else
                if (v > max)
                    v = max;
            return v;
        }

        handleMWheel(delta) {
            var camera = (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.get("camera");
            camera.zoom += delta * 0.1;
            camera.zoom = this.constrain(camera.zoom, 0.5, 5.0);
            camera.updateProjectionMatrix();
            (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.set("camera", camera);

            this.GlobalParams.set("scaleTarget", undefined);
        }

        onMouseWheel(event) {
            event.preventDefault();
            var delta = 0;

            if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta / 120;
            } else if (event.detail) { // firefox
                delta = -event.detail / 3;
            }

            if (delta) {
                this.handleMWheel(delta);
            }

            event.returnValue = false;
        }
        handleTiltWheel(delta) {
            var camera = (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.get("camera");

            var tilt = this.GlobalParams.get("tilt");
            tilt -= delta * 0.1;
            tilt = this.constrain(tilt, 0, Math.PI / 2);
            this.GlobalParams.set("tilt", tilt);

            camera.position.y = 300 * Math.sin(-tilt);
            camera.position.z = 100 + 300 * Math.cos(-tilt);
            camera.lookAt(new THREE.Vector3(0, 0, 100));
            (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.set("camera", camera);

            this.GlobalParams.set("tiltTarget", undefined);
        }
        InitEventListener() {

        }
        Execute() {
            super.Execute();
        }
    }
}