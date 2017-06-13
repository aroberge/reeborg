
To create interesting worlds without using the menu-driven editor, at the very least you need to know:

  - The name of _things_
  - **If** a _thing_ of a particular _type_ can be found at a given location
  - How to **add** a _thing_ of a particular _type_ at a given location
  - How to **remove** a _thing_ of a particular _type_ at a given location.

The **_basic_** naming convention follows the following pattern:

  - `RUR.is_TYPE(name, x, y)`
  - `RUR.add_TYPE(name, x, y)`
  - `RUR.remove_TYPE(name, x, y)`

 The possible value for `TYPE` are the following:

   - `background_tile`
   - `bridge`
   - `decorative_object`
   - `final_position`
   - `object`
   - `obstacle`
   - `overlay`
   - `pushable`
   - `wall`

Thus, we could have:

  - `RUR.is_background_tile("grass", 3, 4)` would indicate whether or not a `"grass"` tile was used as a background tile at location `(3, 4)`.
  - `RUR.add_object("token", 2, 5)` adds a `"token"` as an object (that can be picked up) at location `(2, 5)`.
  - `RUR.remove_obstacle("vertical_fence", 1, 5)`; etc.

As a concrete example, the first example given at the beginning of this documentation was:

```
RUR.add_wall("east", 4, 2)
RUR.add_wall("north", 4, 2)
RUR.add_wall("west", 4, 2)
RUR.add_final_position("house", 4, 2)
```

## When 3 is not enough

In some cases, the basic three arguments, `name`, `x`, and `y`, are not sufficient.  To deal with such cases in a general way, a fourth argument can be added; this argument will be a Python **dict** or, if using Javascript, a simple object. Some specific examples are provided elsewhere.

## Available _things_ and general help

To view what _things_ are available, you can execute a program with a single line of code:

    RUR.show_all_things()

![Table showing all things][things_en]

[things_en]: ../../src/images/show_all_things_en.png

If you are using a non-English version, an extra column is shown using the translated name (if available); this translated name is the one that would be needed in a user-written program, e.g. `prend("feuille")` instead of `take("leaf")`.

![Table with translated names][things_fr]

[things_fr]: ../../src/images/show_all_things_fr.png

Instead of entering this line in the editor, you can use the Python REPL mode

![Picture of repl][things_repl]

[things_repl]: ../../src/images/show_all_things_repl.png


From either the editor or the Python REPL, you can also get some _help_:

  - To list all available Python functions, classes, etc, simply enter `help()`.
  - To get help about a particular function, for example `move`, enter `help(move)`
  - To get a complete, up to date version of every Python function available in the English version, enter
      ```python
      import reeborg_en
      help(reeborg_en)
      ```

  You can use `reeborg_fr` to get the corresponding French version. Note that this help system is specific to Python and does **not** include the available Javascript methods presented in this documentation.

![Example of using help][help_en]

[help_en]: ../../src/images/help_reeborg_en.png

## Note about the word "thing"

In Reeborg's World, the word _object_ has been used for many years to describe "things" with which Reeborg can interact and is used in some functions like `object_here()`. The word _type_ refers to a certain classification of "things" described above. The word _artefact_ is used in the code for many basic functions. If these were not already used, I would have chosen any one of them instead of using "thing", as in `show_all_objects()` instead of `show_all_things()`... If you have any suggestion for a better term than "thing", feel free to contact me.
