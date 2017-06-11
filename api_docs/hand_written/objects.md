**Objects**, together with **walls** are the basic elements used to create interesting programming tasks. In this section, we show how to add objects using the Application Programming Interface (API) instead of using the menu-driven World editor. While it might be easier to use the World editor for objects included with Reeborg's World, using the API is required when it comes to adding your own objects.

## Adding a single object

You can add a single object as follows:

 ```
 RUR.add_object("token", 3, 4)
 ```

The result will look like this:

![Image of token with number][token]

[token]: ../../src/images/token_added.png

Note the number 1 in black, at the bottom left: this is the number of token at that location.  We can add more tokens at that location by repeated calls to this method. A better way is to use an optional argument to specify the additional number of tokens we wish to add.  Thus, executing the following program:

```
RUR.add_object("token", 3, 4)
RUR.add_object("token", 3, 4, {"number":6})
```

![Other image of token][token7]

[token7]: ../../src/images/token_added7.png

In the code above, I have written `"number"` as a string so that it could be used with either Python or Javascript.
[In Javascript, I could have simply written `{number: 6}` and it would have been valid.]

## Setting a goal

As a programming tasks, suppose we wish Reeborg to move these tokens to another location: we can specify this with the `goal` attribute.

  ```
  RUR.add_object("token", 3, 4, {"number":7})
  RUR.add_object("token", 4, 4, {"number":7, "goal":"true"})
  ```
Here again, in order to have a program that can work with either Python or Javascript, I have used a string, `"true"`, as the value of the `goal` attribute. If I knew before hand that I was only going to use this code in a Python program, for greater clarity, I would have used `True` as follows:

```python
RUR.add_object("token", 3, 4, {"number":7})
RUR.add_object("token", 4, 4, {"number":7, "goal":True})
```


Save for one exception, which we will explain in the next section, anything that is evaluated as "true" (i.e. which does not evaluate as "false") can be used as a value for `"goal"`, leading to the same result.  After executing the code, the result looks as follows:

![Image of token and token as goal][token_goal7]

[token_goal7]: ../../src/images/token_goal7.png

A few things to note:

  * As a convention, I have chosen to include grey-level version of the images used for the object to indicate a goal; while I would not recommend it, you could choose a different convention when adding your own objects, as will be shown later.
  * The number of objects to put as a goal is indicated at the bottom **right**.
  * The number of actual objects, at the bottom **left** is no longer written in black, but in red: this gives a visual clue.  By comparison, if we specify positions of objects such that the goal is already met:

```
RUR.add_object("token", 3, 4, {"number":7})
RUR.add_object("token", 3, 4, {"number":7, "goal":"true"})
```

![Image of token with goal met][token_goal_met]

[token_goal_met]: ../../src/images/token_goal_met.png

The number of objects is now indicated in green, giving a visual clue that the goal has been met. Admittedly, using red/green as visual clues will not be useful for all users. This can be changed using

```
RUR.configure_red_green("red replacement", "green replacement")
```

where the colour choice can be either HTML named colours, decimal colours (like "#123456"), rgb values, etc.  This colour preference is saved in the browser so it does not have to be redone each time Reeborg's World is loaded by the user on their computer.

## Aside: requiring to build a wall as a goal

Using a syntax similar to that of requiring that an object be placed at a certain location, one can require that a certain wall be built.

```
RUR.add_wall("north", 3, 3)
RUR.add_wall("east", 3, 3, {"goal":"true"})
```

A wall that needs to be built is indicated by a dashed line, instead of a solid rectangle for an existing wall.

![Image of wall as goal][wall_goal]

[wall_goal]: ../../src/images/wall_goal.png

## Adding multiple objects

If two different kinds of objects are put at the same location, the number is replaced by a question mark.

```
RUR.add_object("token", 3, 4, {"number":7})
RUR.add_object("tulip", 3, 4, {"number":5})
```

![Token and tulip at same location][token_tulip]

[token_tulip]: ../../src/images/token_tulip.png

However, the information about how many objects are found at that location is still available to the user.

![Animation showing how to get the number of each object][token_tulip_gif]

[token_tulip_gif]: ../../src/images/token_tulip.gif

The information provided by the "World Info" dialog will be covered later.


## You can add anything

While the menu-driven dialog restricts what you can add as objects, using the API you can add anything ... even it it does not make sense to do do.

![Adding gravel as an object][add_gravel_gif]

[add_gravel_gif]: ../../src/images/add_gravel.gif

Note the number 1 appearing at the bottom left, indicating the number of `"gravel"` as an object.  `"gravel"` is a **background tile** normally used to create more interesting looking backgrounds ... and not as an object to be picked up by Reeborg.