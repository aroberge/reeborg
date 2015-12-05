"""This module contains functions, classes and exceptions that can be
included in a Python program for Reeborg's World.
"""

# When generating documentation using sphinx, these modules are both
# unavailable and not needed
try:
    from browser import window
    RUR = window.RUR
except:
    print("\n --> Skipping importing from browser for sphinx.\n")

# The following is the only language specific function; it can be used in
# monde.html **only**, and not when imported from world.html or others
try:
    verify = RUR.verify
except:
    pass

# ==== actions


# RUR._x_ defined in commands.js

def move():
    """Move forward, by one grid position."""
    RUR._move_()


def turn_left():
    """Reeborg turns to its left."""
    RUR._turn_left_()


def put(obj=None):
    """Puts down an object.  If Reeborg carries more than one type of objects,
       the type must be specified as an argument, otherwise an exception
       will be raised.
    """
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)


def take(obj=None):
    """Takes an object.  If more than one type of objects is at Reeborg's location,
       the type must be specified as an argument, otherwise an exception
       will be raised.
    """
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def build_wall():
    """Instructs Reeborg to build a wall at the location in front of itself."""
    RUR._build_wall_()


# ==== information about the world


def at_goal():
    """Indicate if Reeborg has reached the desired location.

    Returns:
        True if Reeborg has reached its goal, False otherwise.
    """
    return RUR._at_goal_()


def front_is_clear():
    """Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

    Returns:
       True if the path is clear (not blocked), False otherwise.
    """
    return RUR._front_is_clear_()


def wall_in_front():
    """Indicates if a wall blocks the way.

    Returns:
       True if the path blocked by a wall, False otherwise.
    """
    return RUR._wall_in_front_()


def right_is_clear():
    """Indicates if an obstacle (wall, fence, water, etc.) is on the
       immediate right of Reeborg.

    Returns:
       True if an obstacle is on Reeborg's right, False otherwise.
    """
    return RUR._right_is_clear_()


def wall_on_right():
    """Indicates if an wall is on the immediate right of Reeborg.

    Returns:
       True if a wall is on Reeborg's right, False otherwise.
    """
    return RUR._wall_on_right_()


def is_facing_north():
    """Indicates if Reeborg is facing North (top of the screen) or not."""
    return RUR._is_facing_north_()


def dir_py(obj):
    """Lists attributes and methods of a Python object, excluding
       those whose name start with a double underscore and are
       considered to be private.
    """
    attrs = []
    for attr in dir(obj):
        if attr.startswith("__"):
            continue
        if callable(getattr(obj, attr)):
            attr += "()"
        attrs.append(attr)
    print("\n".join(attrs))


def dir_js(obj):
    """Lists attributes and methods of a Javascript object."""
    RUR.inspect(obj)  # defined in rur_utils.js


def view_source_js(fn):
    """Shows the source code of a Javascript function."""
    RUR.view_source(fn)  # defined in rur_utils.js


def done():
    """Causes a program's execution to end."""
    RUR.control.done()


def sound(bool):
    """Activate or deactivate sound effects."""
    RUR.control.sound(bool)


def think(ms):
    """Set a time delay (in milliseconds) between Reeborg's actions
       played back.
    """
    RUR.control.think(ms)


def pause(ms=None):
    """Pauses a program's execution (playback).

       If an argument (time in milliseconds) is given, the execution
       automatically resumes after this time has elapsed.
    """
    if ms is None:
        RUR.control.pause()
    else:
        RUR.control.pause(ms)


def clear_print():
    """Erase all the text previously written using a call to print()."""
    RUR.control.clear_print()


def remove_robots():
    """Remove all robots found in the world."""
    RUR.world.remove_robots()


def no_highlight():
    """Prevents code highlighting from occurring.

       This function has a similar effect to clicking the corresponding
       button in Reeborg's World.

       Code highlighting occurs thanks to some extra code inserted in a
       user's program prior to execution.  When disabling highlighting
       using this function, the extra instructions are still present,
       but they will not be if the program is run a second time.
    """
    RUR.ui.user_no_highlight()


def recording(bool):
    """Stops or starts recording changes occuring in the world.

    Args:
        bool: True if recording is desired, False otherwise.
    """
    RUR._recording_(bool)


def say():
    raise ReeborgError("say() is no longer supported; use print() instead.")


def object_here(obj=None):
    """Indicates whether any type of objects are present at Reeborg's location.

    Args:
        obj: optional parameter which is the name of an object as a string.

    Returns:
        a list of the type of objects found.  If no object is present,
        or if the specified object is not found, the result is an empty list.

    Examples:

        >>> object_here()
        ["token", "apple"]
        >>> object_here("token")
        ["token"]
        >>> object_here("banana")
        []
    """
    if obj is not None:
        ans = RUR._object_here_(obj)
    else:
        ans = RUR._object_here_()
    return list(ans)  # convert from JS list-like object to proper Python list


def carries_object(obj=None):
    """Indicates whether Reeborg carries an object or not.

    Args:
        obj: optional parameter which is the name of an object as a string.

    Returns:
        a list of the type of objects carried by Reeborg.
        If Reeborg carries no object, or not the specified one,
        the result is an empty list.

    Examples:

        >>> carries_object()
        ["token", "apple"]
        >>> carries_object("token")
        ["token"]
        >>> carries_object("banana")
        []
    """
    if obj is not None:
        ans = RUR._carries_object_(obj)
    else:
        ans = RUR._carries_object_()
    return list(ans)


def set_trace_color(color):
    """Change the color of the trace (oil leak).

       Args:
            color (string): four formats are possible: named color,
                   rgb and rgba, and hexadecimal notation.

       Examples::

            >>> set_trace_color("red")
            >>> set_trace_color("rgb(125, 0, 0)")
            >>> set_trace_color("rgba(125, 0, 0, 0.5)")
            >>> set_trace_color("#FF00FF")
    """
    RUR._set_trace_color_(color)


def set_trace_style(style="default"):
    """Change the trace style of the robot.

       Args:
            style: "thick", "invisible" and "default" are the three possible
                   arguments.  "invisible" is equivalent to
                   set_trace_color("rgba(0, 0, 0, 0)"), that is it sets
                   the colour to a completely transparent value.


                   The "thick" style is centered on the path followed,
                   so that it is impossible to distinguish between motion
                   to the left or to the right, and right handed turns
                   appear to be done all at once, if one only looks at the
                   trace.
    """
    if style not in ["thick", "default", "invisible"]:
        raise ReeborgError("Unrecognized style in set_trace_style().")
    RUR.vis_robot.set_trace_style(style)


def World(url, shortname=None):
    """Allow to select a specific world within a program.

       If the world currently shown is different than the one selected by
       using this function, the result of running the program will simply
       be to change the world - the rest of the program will be ignored.

       If the desired world is already selected, this command is ignored
       and the rest of the program is executed.

       If the world is not already present in the html selector,
       it will be added.

       Args:
            url: two possible choices: either a name appearing in the html
                 selector, or a URL ("link") to a world defined on some
                 website.


            shortname: Optional parameter; if specified, this will be the
                       name shown in the html selector.

       Examples:

           >>> World("Home 1")  # world included by default
           >>> World("http://reeborg.ca/my_world")   # fictitious example
           # the name http://reeborg.ca/my_world will be added to the selector
           >>> World("http://reeborg.ca/my_world", "Hello")
           # The name "Hello" will be shown in the selector instead
           # of the full url
    """
    if shortname is None:
        RUR.file_io.load_world_from_program(url)
    else:
        RUR.file_io.load_world_from_program(url, shortname)


class UsedRobot(object):
    def __init__(self, x=1, y=1, orientation='e', tokens=None):
        """Creates a UsedRobot.

            Args:
               x: horizontal coordinate; an integer greater or equal to 1.
               y: vertical coordinate; an integer greater or equal to 1.
               orientation (string): case-insensitive value,
                            one of "e" or "east",
                            "w" or "west", "n" or "north", "s" or "south".
               tokens: Initial number of tokens to give to the robot;
                       its value must be a positive integer, or the string
                       "inf" to indicate an infinite quantity.
        """
        if tokens is None:
            robot = RUR.robot.create_robot(x, y, orientation)
        else:
            robot = RUR.robot.create_robot(x, y, orientation, tokens)
        self.body = robot
        RUR.world.add_robot(self.body)

    def move(self):
        """Move forward, by one grid position."""
        RUR.control.move(self.body)

    def at_goal(self):
        """Indicate if Reeborg has reached the desired location.

        Returns:
            True if Reeborg has reached its goal, False otherwise.
        """
        return RUR.control.at_goal(self.body)

    def build_wall(self):
        """Instructs Reeborg to build a wall at the location in
           front of itself.
        """
        RUR.control.build_wall(self.body)

    def front_is_clear(self, no_frame=False):
        """Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

        Returns:
           True if the path is clear (not blocked), False otherwise.
        """
        return RUR.control.front_is_clear(self.body, no_frame)

    def wall_in_front(self):
        """Indicates if a wall blocks the way.

        Returns:
           True if the path blocked by a wall, False otherwise.
        """
        return RUR.control.wall_in_front(self.body)

    def right_is_clear(self):
        """Indicates if an obstacle (wall, fence, water, etc.) is on the
           immediate right of Reeborg.

        Returns:
           True if an obstacle is on Reeborg's right, False otherwise.
        """
        return RUR.control.right_is_clear(self.body)

    def wall_on_right(self):
        """Indicates if an wall is on the immediate right of Reeborg.

        Returns:
           True if a wall is on Reeborg's right, False otherwise.
        """
        return RUR.control.wall_on_right(self.body)

    def is_facing_north(self):
        """Indicates if Reeborg is facing North (top of the screen) or not."""
        return RUR.control.is_facing_north(self.body)

    def put(self, obj=None):
        """Puts down an object.  If Reeborg carries more than one type of objects,
           the type must be specified as an argument, otherwise an exception
           will be raised.
        """
        if obj is None:
            RUR.control.put(self.body, False)
        else:
            RUR.control.put(self.body, obj)

    def take(self, obj=None):
        """Takes an object.  If more than one type of objects is at Reeborg's location,
           the type must be specified as an argument, otherwise an exception
           will be raised.
        """
        if obj is None:
            RUR.control.take(self.body, False)
        else:
            RUR.control.take(self.body, obj)

    def object_here(self, obj=None):
        """Indicates whether any type of objects are present at Reeborg's location.

        Args:
            obj: optional parameter which is the name of an object as a string.

        Returns:
            a list of the type of objects found.  If no object is present,
            or if the specified object is not found, the result is an
            empty list.

        Examples:

            >>> reeborg = UsedRobot()
            >>> reeborg.object_here()
            ["token", "apple"]
            >>> reeborg.object_here("token")
            ["token"]
            >>> reeborg.object_here("banana")
            []
        """
        if obj is not None:
            return list(RUR.control.object_here(self.body, obj))
        else:
            return list(RUR.control.object_here(self.body))

    def carries_object(self, obj=''):
        """Indicates whether Reeborg carries an object or not.

        Args:
            obj: optional parameter which is the name of an object as a string.

        Returns:
            a list of the type of objects carried by Reeborg.
            If Reeborg carries no object, or not the specified one,
            the result is an empty list.

        Examples:

            >>> reeborg = UsedRobot()
            >>> reeborg.carries_object()
            ["token", "apple"]
            >>> reeborg.carries_object("token")
            ["token"]
            >>> reeborg.carries_object("banana")
            []
        """
        if obj is not None:
            return list(RUR.control.carries_object(self.body, obj))
        else:
            return list(RUR.control.carries_object(self.body))

    def turn_left(self, no_frame=False):
        """Reeborg turns to its left."""
        RUR.control.turn_left(self.body, no_frame)

    def set_model(self, model):
        """Select the model (images) for the robot.

           Args:
              model: a number between 0 and 3.
        """
        RUR.control.set_model(self.body, model)

    def set_trace_color(self, color):
        """Change the color of the trace (oil leak).

           Args:
                color (string): four formats are possible: named color,
                       rgb and rgba, and hexadecimal notation.

           Examples::

                >>> reeborg = UsedRobot()
                >>> reeborg.set_trace_color("red")
                >>> reeborg.set_trace_color("rgb(125, 0, 0)")
                >>> reeborg.set_trace_color("rgba(125, 0, 0, 0.5)")
                >>> reeborg.set_trace_color("#FF00FF")
        """
        RUR.control.set_trace_color(self.body, color)

    def set_trace_style(self, style):
        """Change the trace style of the robot.

           Args:
                style: "thick", "invisible" and "default" are the three
                       possible arguments.  "invisible" is equivalent to
                       set_trace_color("rgba(0, 0, 0, 0)"), that is it sets
                       the colour to a completely transparent value.


                       The "thick" style is centered on the path followed,
                       so that it is impossible to distinguish between motion
                       to the left or to the right, and right handed turns
                       appear to be done all at once, if one only looks at the
                       trace.
        """
        if style not in ["thick", "default", "invisible"]:
            raise ReeborgError("Unrecognized style in set_trace_style().")
        RUR.control.set_trace_style(self.body, style)


class ReeborgError(Exception):
    """Exceptions specific to Reeborg's World.

       Examples::

            def done():
                message = "You can not use done() for this task."
                raise ReeborgError(message)

            #---- or ------

            try:
                move()
            except ReeborgError:   # ignore a collision
                turn_left()
    """

    def __init__(self, message):
        self.reeborg_shouts = message

    def __str__(self):
        return repr(self.reeborg_shouts)
try:
    window['ReeborgError'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):
    """Exceptions specific to Reeborg's World.

       Is raised when Reeborg hits a wall.
    """
    pass
try:
    window['WallCollisionError'] = WallCollisionError
except:
    pass


class SatelliteInfo():

    @property
    def world_map(self):
        '''Returns a dict containing information about world.
        '''
        import json
        return json.loads(RUR.control.get_world_map())

    def print_world_map(self):
        '''Prints a formatted copy of the world'''
        print(RUR.control.get_world_map())


def max_nb_instructions(nb):
    """Intended primarily for world creators, this function allows
       to change the default maximum number of instructions executed in a
       program (1000) by a different value.
    """
    RUR._set_max_steps_(nb)


def max_nb_robots(nb):
    """Intended primarily for world creators, this function
       allows to set the maximum number of robots allowed in a given world.
    """
    RUR._set_max_nb_robots_(nb)


def narration(html):
    raise ReeborgError("narration is obsolete; use print_html().")
    RUR.control.narration(html)


def print_html(html):
    """Intended primarily for world creators, this function is similar to
       print() except it can make use of html input.
    """
    RUR.control.print_html(html)


def new_robot_images(images):
    """Allow to replace the images used for the robot.  More details will
       be provided soon.
    """
    RUR.vis_robot.new_robot_images(images)


def MakeCustomMenu(content):
    """Designed for use by educators.  Makes it possible to create custom world
    menus.  See the documentation for more details.
    """
    RUR.custom_menu.make(content)
