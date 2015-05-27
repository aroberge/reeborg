/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.objects = {};
RUR.objects.known_objects = []


RUR.objects.token = {};
RUR.objects.token.image = new Image();
RUR.objects.token.image.src = 'src/images/token.png';  // adapted from openclipart
RUR.objects.token.image_goal = new Image();
RUR.objects.token.image_goal.src = 'src/images/token_goal.png';  // modified from above
RUR.objects.token.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.token.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("token");


RUR.objects.star = {};
RUR.objects.star.image = new Image();
RUR.objects.star.image.src = 'src/images/star.png';  // adapted from openclipart
RUR.objects.star.image_goal = new Image();
RUR.objects.star.image_goal.src = 'src/images/star_goal.png';  // modified from above
RUR.objects.star.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.star.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("star");

RUR.objects.triangle = {};
RUR.objects.triangle.image = new Image();
RUR.objects.triangle.image.src = 'src/images/triangle.png';  // adapted from openclipart
RUR.objects.triangle.image_goal = new Image();
RUR.objects.triangle.image_goal.src = 'src/images/triangle_goal.png';  // modified from above
RUR.objects.triangle.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.triangle.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("triangle");


RUR.objects.square = {};
RUR.objects.square.image = new Image();
RUR.objects.square.image.src = 'src/images/square.png';
RUR.objects.square.image_goal = new Image();
RUR.objects.square.image_goal.src = 'src/images/square_goal.png';  // modified from above
RUR.objects.square.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.square.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("square");
