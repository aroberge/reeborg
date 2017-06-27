Having well-defined worlds is nice, but it is sometimes useful to be able to see if students can write programs general enough to address a whole range of situations. To this end, Reeborg's World easily support designing worlds with some randomly chosen values.

## Random number of objects

To specify a random number of objects at one location, one needs to use the attributes `min` and `max` as follows:

```
RUR.add_object("token", 2, 1, {"min":2, "max": 5})
```

Instead of a number, we see a "?" next to the token, indicating an unknown quantity. However, a user can see the range of possible values by using the "World Info" dialog.

![token][token]

[token]: ../../src/images/token_random.png

<p class="reeborg-important">This should only be used for _creating_ worlds and saving them as
a json file, or in the Onload editor.</p>

When a program is run, the first step is to identify values that should be chosen at random within a certain range,
and set them, after which the code entered is run.
If other random values are introduced afterwards, they may yield inconsistent states.

So, to create a world with random values, you have to run a program with these random values,
then save the world (as a json file) after all the instructions have been run, without
saving the program that created it as part of the world.


## Setting goals with random values

We have seen how to specify a goal requiring a specific number of objects to  be put at one location.  But how can we deal with situations where the total number of objects is set randomly?  One simple way is to use the value `"all"` as a goal, as follows:

```
RUR.add_object("token", 2, 1, {"min":2, "max": 5})
RUR.add_object("token", 3, 1, {"min":0, "max": 4})
RUR.add_object("token", 4, 1, {"goal":"all"})
```
After running this program, save the resulting world.
Then, use this new world as a starting point.

![all][all]

[all]: ../../src/images/goal_all.gif

As you can see in the above animation, each time a program is run, values are chosen randomly and the goal is adjusted automatically.


## Random initial and final position

In the very first example, in addition to building walls, we showed how to set up a final position as a goal:

```
RUR.add_wall("east", 4, 2)
RUR.add_wall("north", 4, 2)
RUR.add_wall("west", 4, 2)
RUR.add_final_position("house", 4, 2)
```

Repeated calls to this method, with different coordinates, result in a final position that will be chosen at random. The same can be done for the starting position.  For example, assuming we start with a robot at position `(1, 1)` we can set up additional possible initial position chosen randomly, and possible final position also chosen randomly, by something like the following and illustrated below.

```
RUR.add_initial_position(1, 2)

RUR.add_final_position("house", 3, 1)
RUR.add_final_position("house", 3, 2)
RUR.add_final_position("house", 3, 3)
```

![random][random]

[random]: ../../src/images/random.gif

To indicate that a choice will be made, the images (for the robot, or the final destination) are made partly transparent when there is more than one possible choice.
Later, when the program is executed with this world as a starting point, the very first step is to randomly make a selection among the possible values, as illustrated below.

![random2][random2]

[random2]: ../../src/images/random2.gif

## Main tutorial guide

See {@tutorial how}.