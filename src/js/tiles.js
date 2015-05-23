/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.tiles = {};

RUR.tiles.mud = {};
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.image = new Image();
RUR.tiles.mud.image.src = 'src/images/mud.png';

RUR.tiles.ice = {};
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.image = new Image();
RUR.tiles.ice.image.src = 'src/images/ice.png';

RUR.tiles.grass = {};
RUR.tiles.grass.image = new Image();
RUR.tiles.grass.image.src = 'src/images/grass.png';

RUR.tiles.gravel = {};
RUR.tiles.gravel.image = new Image();
RUR.tiles.gravel.image.src = 'src/images/gravel.png';

RUR.tiles.water = {};
RUR.tiles.water.fatal = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = 'src/images/water.png';