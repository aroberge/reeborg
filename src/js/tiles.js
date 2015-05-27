/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.tiles = {};

RUR.tiles.mud = {};
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.info = RUR.translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.")
RUR.tiles.mud.image = new Image();
RUR.tiles.mud.image.src = 'src/images/mud.png';
RUR.tiles.mud.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.ice = {};
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.info = RUR.translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.")
RUR.tiles.ice.image = new Image();
RUR.tiles.ice.image.src = 'src/images/ice.png';
RUR.tiles.ice.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.grass = {};
RUR.tiles.grass.image = new Image();
RUR.tiles.grass.image.src = 'src/images/grass.png';
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.")
RUR.tiles.grass.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.gravel = {};
RUR.tiles.gravel.image = new Image();
RUR.tiles.gravel.image.src = 'src/images/gravel.png';
RUR.tiles.gravel.info = RUR.translate("Gravel: usually safe.")
RUR.tiles.gravel.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.water = {};
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.info = RUR.translate("Water: Reeborg <b>can</b> detect this but will drawn if it moves to this location.")
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = 'src/images/water.png';
RUR.tiles.water.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};