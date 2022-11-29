AFRAME.registerComponent('paintball', {
    init: function(){
        this.paint();
    },

    paint: function(){
        window.addEventListener('keydown', (e) => {
           if(e.key === 'z'){
               var bullet = document.querySelector('a-entity');
               bullet.setAttribute('geometry', {
                   primitive: 'sphere',
                   radius: 0.1
               });

               bullet.setAttribute("material", "color", "pink");

               var cam = document.querySelector('#camera');
               pos = cam.getAttribute('position');

               bullet.setAttribute('position', {
                   x: pos.x,
                   y: pos.y,
                   z: pos.z
               });

               var camera = document.querySelector('#camera').object3D;

               var direction = new THREE.Vector3();
               camera.getWorldDirection(direction);

               bullet.setAttribute("velocity", direction.multiplyScalar(-10));

               var scene = document.querySelector('#scene');

               bullet.setAttribute("dynamic-body", {
                   shape: "sphere",
                   mass: "0",
               });

               bullet.addEventListener("collide", this.removeBullet);

               scene.appendChild(bullet);

               this.shootSound();
            }
        });
    },

    shootSound: function(){
        var entity = document.querySelector('#sound1');
        entity.components.sound.playSound()
    }
});