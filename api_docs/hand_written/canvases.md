With many different possible types of "objects" that need to be drawn (background tiles, goals, decorative objects, objects that can be picked up, robots, etc.), it has been found useful to use multiple canvases for each type of objects, with each canvas sitting at a certain "depth", thus ensuring that objects that are drawn on a given canvas appear on top of objects drawn on canvases "below". This has also made it possible to create interactions with different "classes" of objects in a predictable way.

Drawing on all the canvases is done periodically, at a fixed time interval which can be changed by the function `think()`. However, this approach has been found to be too limiting when introducing animated objects which are drawn on a different schedule. While it would have been possible to use the same canvases for both static and animated objects, we have decided instead to introduce a second set of canvases, intended for animated images only. For a given class of objects, these secondary canvases typically sit on top of the corresponding "static" one, thus giving visual precedence to the animated objects. The drawing schedule for all the animated objects is determined by the global variable `RUR.ANIMATION_TIME`.

In addition to the different time scale, there is another big difference between the way drawing updates are performed.  When a program is executed, a series of frames are recorded.  Embedded in each frame, there can be some variables (frame_delay, pause, etc.) which can determine the time delay before the next frame is drawn. Thus, one can use `think()` or `pause()` within a program to control how the display will be updated. However, for the animated images, `RUR.ANIMATION_TIME` is a variable whose value at the end of the program's execution will stay constant throughout the display (playback) of the frames that have been recorded.

  - add example

## The layers

When designing a world, you should not have to worry about the order in which objects are drawn. The important design consideration should be about the role of each class of objects, and the potential interaction between each class.
Nonetheless, for completeness, here is the ordering of the canvases, from top to bottom:

1. overlay animation layer [not implemented yet]
2. overlay layer [not implemented yet]
3. robot animation [not implemented yet]
4. robots
5. wall
6. animated pushable object
7. (static) pushable object
8. trace left by robot.
9. animated objects (which can be picked up)
10. (static) objects (which can be picked up)
11. animated goal
12. (static) goal: objects, walls, final position, pushable [goals].
13. animated obstacles
14. (static) obstacles
15. animated decorative objects
16. (static) decorative objects
17. animated bridge layer
18. (static) bridge layer
19. animated background tiles
20. (static) background tiles
21. static background image, covering the entire world's surface, which has no effect on the behaviour of Reeborg.

## Interaction between layers

Other than the overlay layer, which is intended for special effects, robots should never be hidden by other artefacts: thus they are drawn near the very top of the stack of layers (canvases). This is also the case for walls. Below the walls, pushable objects can be used to hide other artefacts. However, a pushable object cannot be pushed onto a tile where a solid object is found (on the obstacle layers), nor can it be pushed on a tile where another robot is located nor can it be pushed through a wall: all of these will result in a fatal collision for Reeborg.

  - add example

"Obstacles" can be solid (acting like a wall for Reeborg) or "safe" (thus allowing Reeborg to step onto that location, regardless of the type of background tile below).

  - add example

Pushable objects, when pushed onto a given tile (background or obstacle), can transform into some obstacle or disappear altogether. This is determined by the property of the object and is handled automatically.

  - add example: box+water = bridge; box+fire=fire (box disappear)  (Maybe make the fire temporarily bigger).

## Controlling the frame update

Each world change (addition or removal of object, movement of robot, etc.) normally results in a frame being recorded, so that only one thing changes from one frame to the next.  Sometimes, this might not be desirable. For example, with the default objects, if Reeborg moves (frame recorded) pushing a box (remove the box from one location: frame recorded; add to another location: frame recorded) onto a water tile (remove the box: frame recorded; add a bridge: frame recorded) ... the display would not look right. Instead, we want to have all these appear to be done simultaneously.  For your own code, this can be done with the `recording()` function call. In pseudo-code, the above example would be done as follows:

    recording(False)
      move the robot  (remove from one location, add to the next)
      remove the box
      attempt to add box to next tile (water)
      add bridge as obstacle on next tile instead
    recording(True)
    call record_frame() explicitly

