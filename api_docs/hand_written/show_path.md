
Here is a solution for the world **Around 3**:

![path_sol][path_sol]

[path_sol]: ../../src/images/around3_sol.gif

By looking at this animated image, a user can figure out:

1. when Reeborg turns, and with what sequence of orientation,
   since different images are used for each orientation;
2. when Reeborg turns, since the path drawn is slighly off-centered which
   makes it easy to distinguish when a right turn is accomplished as three
   consecutive left turns;
3. when an object is dropped, since one can see the object **and** one can
   see that a number appears next to the object; this is both to give
   information as to the number of objects at a given location, as well
   as to distinguish between decorative objects and objects that can be
   picked up, as indicated below:

![object number][object_number]

[object_number]: ../../src/images/background5.png

### Getting a path with fewer hints

It is possible to get a path with fewer hint, as shown below:

![path][]

[path]: ../../src/images/around3.gif

1.  We can use a completely transparent image for each of the robot orientation:

    ```python
    # using Python
    url="/src/images/transparent_tile.png"
    new_robot_images({"east": url, "west":url, "north":url, "south":url, "model":12})
    r = default_robot()
    r.set_model(12)
    ```
    Here, we have chosen `12` as the model number for no particular reason - but
    the model number must be the one specified in `new_robot_images`.
    `new_robot_images` is a Python function; you can use `help(new_robot_images)`
    to see its documentation.  Or, you can look at the more complete documentation
    for the Javascript equivalent {@link RUR#new_robot_images}.

2.  We can draw a thicker path which does not show any hint regarding left
    versus right turns.

    ```python
    set_trace_style("thick")
    ```

    Note that, for world **Around 3**, we had also set the path to black
    using `set_trace_color("black")`.

3.  We can also use the transparent image for the object.

    ```python
    RUR.add_new_thing({"name":"invisible", "url":url}) # same url as above
    RUR.give_object_to_robot("invisible", 1)
    put("invisible")   # instead of put() since Reeborg carries tokens as well
    ```
    [For more details about two of the function used, consult
    {@link RUR#add_new_thing} and {@link RUR#give_object_to_robot}.]

    Also, we use the following setting to not draw the number of object
    at a given location, thus giving no indication that Reeborg is putting
    down an object.

    ```python
    RUR.state.do_not_draw_info = True
    ```


At the end, we reset the model number to the default value,
`r.set_model(0)` so that we could show Reeborg reaching the final position.
