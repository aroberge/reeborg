While walls can be used to create obstacles in Reeborg's path, using
other elements, such as certain background tiles and obstacles can achieve
the same purpose while being visually a lot more attractive.

**Note that the examples given below can be created much more easily using the menu-driven World editor.**
However, the methods we present can be used to create much more interesting worlds, which could not be done using the menu-driven editor as we will see later.

## Background tiles

Adding background tiles can be done as follows:

```
RUR.add_background_tile("grass", 2, 1)
RUR.add_background_tile("gravel", 3, 1)
```


![background1][background1]

[background1]: ../../src/images/background1.gif

Notice how each background tile is added one at a time: each time a change occurs in the world, a **frame** is recorded and shown separately. When creating a background, this will likely not be the desired behaviour. What we will want instead is to suspend the recording of changes being made, make multiple changes, and resume the recording so that changes can appear. We can control the recording behaviour with the `recording()` function as follows:

```
previous_recording_state = recording(0)
RUR.add_background_tile("grass", 2, 1)
RUR.add_background_tile("gravel", 3, 1)
recording(previous_recording_state)

pause(1000)
move()
move()
```

`recording` normally expects a boolean variable. Since we want to provide examples which work with both Python and Javascript, we use `0` instead of `False` or `false` which we would usually recommend when showing code to students using a single language. Furthermore, while we know in this example that we want to resume recording, it is a good practice to use the return value to save the previous recording state, and use it in a subsequent call to resume as before.  This can be useful when defining functions that are intended to suspend recording and can be called within other functions that do the same.

Since `pause()` does not change the content of the world, it does not trigger a recording; however, by using it, we can delay showing the next recorded frame which is triggered by a `move()`, so as to show all at once the changes (2 background tiles added and a new location for Reeborg).

![background2][background2]

[background2]: ../../src/images/background2.gif

French version: _En français, utilisez `enregistrement()` au lieu de `recording()`._

If we want to fill the entire world with a single tile, we can use something like the following:

```
RUR.fill_background("grass")
```

Some background tiles can not only make a world more visually interesting, but they can be used instead of wall to create obstacles. For example, `water` and `mud` are both fatal to Reeborg ... but only one of them (`water`) can be detected. Below is a Python program that illustrates this.

```python
previous_recording_state = recording(0)
RUR.add_wall("east", 3, 1)
RUR.add_background_tile("water", 3, 2)
RUR.add_background_tile("mud", 3, 3)
karel = UsedRobot(1, 2)
reeborg = UsedRobot(1, 3)
recording(previous_recording_state)

while front_is_clear():
    move()

while karel.front_is_clear():
    karel.move()

while reeborg.front_is_clear():
    reeborg.move()
```

![background3][background3]

[background3]: ../../src/images/background3.gif

To see which "things" included that are fatal, use `RUR.show_all_things("fatal")`; to see those that can be detected by Reeborg, use `RUR.show_all_things("detectable")`. As we have seen in the previous program, some things, like `water` are both fatal and detectable, whereas others (namely `mud`) are fatal but not detectable. There are also others (like `house`, use as a final destination) which are detectable but not fatal. As you will see later, it is possible to add your own "things" with your own choice of default properties.

## Obstacles

Obstacles are visual elements, usually `fatal`, which are drawn on top of the background tile layer, no matter which in which order the various "things" are added.  For example, the program

```
RUR.add_background_tile("grass", 2, 1)
RUR.add_obstacle("fence_left", 2, 1)
RUR.add_obstacle("fence_right", 3, 1)
RUR.add_background_tile("grass", 3, 1)
```
will result in the following
![background4][background4]

[background4]: ../../src/images/background4.png

## Decorative objects

Decorative objects are simply drawn for visual effects: by default, they cannot affect any interaction that Reeborg could have. As we have seen for objects that can be picked up by Reeborg, they appear together with a number indicating how many such objects are present at a given location. By contrast, decorative objects are shown by themselves, with no such number indicated.

![background5][background5]

[background5]: ../../src/images/background5.png

Visually, decorative objects appear between obstacles and background tiles,
while objects (that can be picked up) appear on top of obstacles and background tiles.

![background6][background6]

[background6]: ../../src/images/background6.png

By default, it would make little sense to put objects that need to be picked up on top of obstacles since Reeborg could never reach them. However, one could create worlds where obstacles would disappear if Reeborg were to accomplish a given task first.

## Beyond the menu-driven World editor

The menu-driven World editor limits choices as to what can be drawn as a background tile, an obstacle, a decorative object, etc. Using the API, one is not limited. As a possible interesting example, one can imagine drawing a "river" with consecutive `water` tiles as background tile except at one location where we draw it as a decorative object. Visually, it would appear to be the same everywhere. However, as a decorative object, `water` would be harmless so that Reeborg could cross it safely. One could make a story about finding the point where the river is shallow enough for Reeborg to cross it. This could be done by Reeborg using either `front_is_clear()` or `right_is_clear()`.
Here's a simple version of such a program, for demonstration:

```python
# Something like the first part of this code should normally go
# in the "pre" editor to create the world.
import random
pick = random.randint(1, 12)

recording(False)
RUR.add_final_position("house", 3, 1)
for y in range(1, 13):
    if y != pick:
        RUR.add_background_tile("water", 2, y)
recording(True)

pause(1000) # Just to see better what is going on
RUR.add_decorative_object("water", 2, pick)

# The second part of this code would be
# the "solution" written in the code editor.
def turn_right():
    for i in range(3):
        turn_left()

turn_left()
while not right_is_clear():
    move()
turn_right()
move()
move()
turn_right()
while not at_goal():
    move()
```


## Main tutorial guide

See {@tutorial how}.