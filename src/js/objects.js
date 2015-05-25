/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.objects = {};

RUR.objects.star = {};
RUR.objects.star.image = new Image();
RUR.objects.star.image.src = 'src/images/star.png';  // adapted from openclipart
RUR.objects.star.image_goal = new Image();
RUR.objects.star.image_goal.src = 'src/images/star_goal.png';  // modified from above
RUR.objects.star.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.objects.star.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};


RUR.objects.triangle = {};
RUR.objects.triangle.image = new Image();
RUR.objects.triangle.image.src = 'src/images/triangle.png';  // adapted from openclipart
RUR.objects.triangle.image_goal = new Image();
RUR.objects.triangle.image_goal.src = 'src/images/triangle_goal.png';  // modified from above
RUR.objects.triangle.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.objects.triangle.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};

RUR.objects.square = {};
RUR.objects.square.image = new Image();
RUR.objects.square.image.src = 'src/images/square.png';
RUR.objects.square.image_goal = new Image();
RUR.objects.square.image_goal.src = 'src/images/square_goal.png';  // modified from above
RUR.objects.square.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.objects.square.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};