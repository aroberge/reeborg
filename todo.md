# Guide to difficulty level

This will need to be included either in the Teacher's Guide, or the
tutorial, or both.

## Numbering convention for worlds

The following excludes worlds Home 1 to 4, and is to be used in the
basic tutorial.

### Number 0

If a world has number 0, it means that it can be solved using only basic
functions and not `if` or `while` statements. As such, it is a good
introduction to a family of challenges and can be used to introduce
a function, such as `build_wall()` or `toss()`.  The difficulty level
should be DIFFICULTY1.

The goal should be that almost every function is introduced by such a world.

* `take()`
* `put()`
* `toss()`
* `build_wall()`
* `paint_square()`

### Number 1

Number 1 worlds should require a single level `if` or `while` test.
Usually, they will have some randomness built-in to make the test more effective.
These worlds should be at DIFFICULTY2 or DIFFICULTY3.

Tests:

* `at_goal()`
* `carries_object()`
* `color_here()`
* `front_is_clear()`
* `object_here()`
* `is_facing_north()`
* `right_is_clear()`
* `wall_in_front()`
* `wall_on_right()`

Functions:

* `done()`  [only makes sense with a test]
* `position_here()`  [advanced tutorial?]
* `position_in_front()` [advanced tutorial?]
* `think()`
* `pause()`
* `sound()`
* `print()`


# Old Todo

The following list has not been updated in quite some time.  Many of the items listed have been taken care of.

Keeping track of advanced editing api

|    artefact    | implement | doc | unittest | functest | example |
|----------------|-----------|-----|----------|----------|---------|
| set walls      | yes       | yes | yes      | yes      |         |
| get walls      | yes       | yes | yes      | yes      |         |
| set goal wall  | yes       | yes | yes      | yes      |         |
| get goal wall  | yes       | yes | yes      | yes      |         |
| set obj        |           |     |          |          |         |
| get obj        |           |     |          |          |         |
| set goal obj   |           |     |          |          |         |
| get goal obj   |           |     |          |          |         |
| set deco obj   |           |     |          |          |         |
| get deco obj   |           |     |          |          |         |
| set obstacle   |           |     |          |          |         |
| get obstacle   |           |     |          |          |         |
| set overlay    |           |     |          |          |         |
| get overlay    |           |     |          |          |         |
| set back tile  |           |     |          |          |         |
| get back tile  |           |     |          |          |         |
| set background |           |     |          |          |         |
| new robot      |           |     |          |          |         |


  * Include a function to set world size.
  * Include a function to automatically check goal.
  * Write some examples where a different world is chosen when a program is run successfully.

  * remove existing permalink creation and include replacement
  * See if dirty canvases can be implemented.
  * consider adding set_final_position
  * Need to set no object left in world as goal.
  * include maze generating algorithm in Javascript.  (Actually, show it as an example of loading a module)
  * Ask for A* algorithm demonstration.
  * Ask for depth-first vs breath first algorith demonstration.  (or implement from http://www.redblobgames.com/pathfinding/a-star/introduction.html)
      - include writable tile
  * Add object_type which are fatal to take.
  * Remind writers that adding an obstacle just means that it is drawn on a given canvas; if its properties are safe. Dangerous tiles are checked either as background tiles or as obtacles.  Unsafe objects to take are only checked when picked up and must be drawn on the object canvas.  Limit nb of objects type on tile, decorative, obstacle and wall to 1 for each type. Allow unlimited number on object canvas.  Define function combine pushable object + tile into new tile with drawing.  Use this for more generic combinations.
  * challenge: redraw the world on an isometric tiling ... with adjustable viewing angle instead of the traditional fixed 45^o
  * Draw fence on obstacle canvas: Reeborg cannnot cross; draw fence as decorative objects: Reeborg can cross them. Visually, we cannot tell the difference but Reeborg can. World: find hole in the fence.
  * Add mud detector and use this for composition of classes.
  * add robot.coordinates() and robot.coordinates_in_front(); do this only for OOP. Use this for mud detector.
  * if "obstacles" are added elsewhere than on the background layer or the obstacle layer, they have no effect. Give an example with a water stream that becomes shallow enough to be crossed, or a fence that is broken and allow Reeborg to go through (do this by drawing it as decorative object at a select location).
  * add method to get tile from name.
