# Todo

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
