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

# All functions from Javascript used below should have names of the form
# RUR._xyz_ and be defined in commands.js and methods should have names of
# the form RUR._UR.xyz_;  functions and methods should appear
# alphabetically in this English version, with the exception of Python-specific
# functions or classes that should appear near the end.


def at_goal():  #py:at_goal
    """Indicate if Reeborg has reached the desired location.

    Returns:
        True if Reeborg has reached its goal, False otherwise.
    """
    return RUR._at_goal_()

def build_wall():  #py:build_wall
    """Instructs Reeborg to build a wall at the location in front of itself."""
    RUR._build_wall_()


def carries_object(obj=None):  #py:carries_object
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


def clear_print():  #py:clear_print
    """Erase all the text previously written using a call to print()."""
    RUR._clear_print_()

def color_here():  #py:color_here
    return RUR._color_here_()


def default_robot():  #py:default_robot
    """Returns a recreated version of the default robot."""
    class Robot(UsedRobot):
        def __init__(self):
            self.body = RUR._default_robot_body_()
    return Robot()


def dir_js(obj):  #py:dir_js
    """Lists attributes and methods of a Javascript object."""
    # do not translate the name of this function
    RUR._dir_js_(obj)


def done():  #py:done
    """Causes a program's execution to end."""
    RUR._done_()


def front_is_clear():  #py:front_is_clear
    """Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

    Returns:
       True if the path is clear (not blocked), False otherwise.
    """
    return RUR._front_is_clear_()


def is_facing_north():  #py:is_facing_north
    """Indicates if Reeborg is facing North (top of the screen) or not."""
    return RUR._is_facing_north_()


def in_the_bag():  #py:in_the_bag
    return dict(RUR._in_the_bag_())


def move():  #py:move
    """Move forward, by one grid position."""
    RUR._move_()


def new_robot_images(images):  #py:new_robot_images
    """Allow to replace the images used for the robot.  More details will
       be provided soon.
    """
    RUR._new_robot_images_(images)


def no_highlight():  #py:no_highlight
    """Prevents code highlighting from occurring.

       This function has a similar effect to clicking the corresponding
       button in Reeborg's World.

       Code highlighting occurs thanks to some extra code inserted in a
       user's program prior to execution.  When disabling highlighting
       using this function, the extra instructions are still present,
       but they will not be if the program is run a second time.
    """
    RUR._no_highlight_()


def object_here(obj=None):  #py:object_here
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


def paint_square(color):  #py:paint_square
    RUR._paint_square_(color)


def pause(ms=None):  #py:pause
    """Pauses a program's execution (playback).

       If an argument (time in milliseconds) is given, the execution
       automatically resumes after this time has elapsed.
    """
    if ms is None:
        RUR._pause_()
    else:
        RUR._pause_(ms)


def print_html(html, append=False):  #py:print_html
    """Intended primarily for world creators, this function is similar to
       print() except it can make use of html input.
    """
    RUR._print_html_(html, append)
window['print_html'] = print_html   # No translation needed


def put(obj=None):  #py:put
    """Puts down an object.  If Reeborg carries more than one type of objects,
       the type must be specified as an argument, otherwise an exception
       will be raised.
    """
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)


def recording(bool):  #py:recording
    """Stops or starts recording changes occuring in the world.

    Args:
        bool: True if recording is desired, False otherwise.
    """
    RUR._recording_(bool)


def remove_robots():  #py:remove_robots
    """Remove all robots found in the world."""
    RUR._remove_robots_()


def right_is_clear():  #py:right_is_clear
    """Indicates if an obstacle (wall, fence, water, etc.) is on the
       immediate right of Reeborg.

    Returns:
       True if an obstacle is on Reeborg's right, False otherwise.
    """
    return RUR._right_is_clear_()


def set_max_nb_instructions(nb):  #py:set_max_nb_instructions
    """Intended primarily for world creators, this function allows
       to change the default maximum number of instructions executed in a
       program (1000) by a different value.
    """
    RUR._set_max_nb_instructions_(nb)


def set_max_nb_robots(nb):  #py:set_max_nb_robots
    """Intended primarily for world creators, this function
       allows to set the maximum number of robots allowed in a given world.
    """
    RUR._set_max_nb_robots_(nb)


def set_trace_color(color):  #py:set_trace_color
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


def set_trace_style(style="default"):  #py:set_trace_style
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
    RUR._set_trace_style_(style)


def sound(bool):  #py:sound
    """Activate or deactivate sound effects."""
    RUR._sound_(bool)


def take(obj=None):  #py:take
    """Takes an object.  If more than one type of objects is at Reeborg's location,
       the type must be specified as an argument, otherwise an exception
       will be raised.
    """
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def think(ms):  #py:think
    """Set a time delay (in milliseconds) between Reeborg's actions
       played back.
    """
    RUR._think_(ms)


def turn_left():  #py:turn_left
    """Reeborg turns to its left."""
    RUR._turn_left_()


def view_source_js(fn):  #py:view_source_js
    """Shows the source code of a Javascript function."""
    RUR._view_source_js_(fn)


def wall_in_front():  #py:wall_in_front
    """Indicates if a wall blocks the way.

    Returns:
       True if the path blocked by a wall, False otherwise.
    """
    return RUR._wall_in_front_()


def wall_on_right():  #py:wall_on_right
    """Indicates if an wall is on the immediate right of Reeborg.

    Returns:
       True if a wall is on Reeborg's right, False otherwise.
    """
    return RUR._wall_on_right_()


def MakeCustomMenu(content):  #py:MakeCustomMenu
    """Designed for use by educators.  Makes it possible to create custom world
    menus.  See the documentation for more details.
    """
    RUR._MakeCustomMenu_(content)


def World(url, shortname=None):  #py:World
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
        RUR._World_(url)
    else:
        RUR._World_(url, shortname)


class UsedRobot(object):  #py:UR
    def __init__(self, x=1, y=1, orientation='e', tokens=None):  #py:UR.__init__
        """Creates a UsedRobot.

            Args:
               x: horizontal coordinate; an integer greater or equal to 1.
               y: vertical coordinate; an integer greater or equal to 1.
               orientation (string):,
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

    def __str__(self):  #py:UR.__str__
        location = "({}, {})".format(self.body.x, self.body.y)
        if self.body._orientation == RUR.EAST:
            facing = "facing East"
        elif self.body._orientation == RUR.WEST:
            facing = "facing West"
        elif self.body._orientation == RUR.NORTH:
            facing = "facing North"
        elif self.body._orientation == RUR.SOUTH:
            facing = "facing South"

        if 'token' in self.body.objects:
            if self.body.objects['token'] == 'inf':
                carries = "carries an infinite number of tokens."
            else:
                carries = 'carries %s tokens' % self.body.objects['token']
        else:
            carries = 'carries no tokens'
        return "UsedRobot at {} {} {}.".format(location, facing, carries)

    def at_goal(self):  #py:UR.at_goal
        """Indicate if Reeborg has reached the desired location.

        Returns:
            True if Reeborg has reached its goal, False otherwise.
        """
        return RUR._UR.at_goal_(self.body)

    def build_wall(self):  #py:UR.build_wall
        """Instructs Reeborg to build a wall at the location in
           front of itself.
        """
        RUR._UR.build_wall_(self.body)

    def carries_object(self, obj=''):  #py:UR.carries_object
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
            return list(RUR._UR.carries_object_(self.body, obj))
        else:
            return list(RUR._UR.carries_object_(self.body))

    def front_is_clear(self):  #py:UR.front_is_clear
        """Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

        Returns:
           True if the path is clear (not blocked), False otherwise.
        """
        return RUR._UR.front_is_clear_(self.body)

    def in_the_bag(self):  #py:UR.in_the_bag
        return dict(RUR._UR.in_the_bag_(self.body))

    def is_facing_north(self):  #py:UR.is_facing_north
        """Indicates if Reeborg is facing North (top of the screen) or not."""
        return RUR._UR.is_facing_north_(self.body)

    def move(self):  #py:UR.move
        """Move forward, by one grid position."""
        RUR._UR.move_(self.body)

    def object_here(self, obj=None):  #py:UR.object_here
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
            return list(RUR._UR.object_here_(self.body, obj))
        else:
            return list(RUR._UR.object_here_(self.body))

    def put(self, obj=None):  #py:UR.put
        """Puts down an object.  If Reeborg carries more than one type of objects,
           the type must be specified as an argument, otherwise an exception
           will be raised.
        """
        if obj is None:
            RUR._UR.put_(self.body)
        else:
            RUR._UR.put_(self.body, obj)

    def right_is_clear(self):  #py:UR.right_is_clear
        """Indicates if an obstacle (wall, fence, water, etc.) is on the
           immediate right of Reeborg.

        Returns:
           True if an obstacle is on Reeborg's right, False otherwise.
        """
        return RUR._UR.right_is_clear_(self.body)

    def set_model(self, model):  #py:UR.set_model
        """Select the model (images) for the robot.

           Args:
              model: a number between 0 and 3.
        """
        RUR._UR.set_model_(self.body, model)

    def set_trace_color(self, color):  #py:UR.set_trace_color
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
        RUR._UR.set_trace_color_(self.body, color)

    def set_trace_style(self, style):  #py:UR.set_trace_style
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
        RUR._UR.set_trace_style_(self.body, style)

    def take(self, obj=None):  #py:UR.take
        """Takes an object.  If more than one type of objects is at Reeborg's location,
           the type must be specified as an argument, otherwise an exception
           will be raised.
        """
        if obj is None:
            RUR._UR.take_(self.body)
        else:
            RUR._UR.take_(self.body, obj)

    def turn_left(self):  #py:UR.turn_left
        """Reeborg turns to its left."""
        RUR._UR.turn_left_(self.body)

    def wall_in_front(self):  #py:UR.wall_in_front
        """Indicates if a wall blocks the way.

        Returns:
           True if the path blocked by a wall, False otherwise.
        """
        return RUR._UR.wall_in_front_(self.body)

    def wall_on_right(self):  #py:UR.wall_on_right
        """Indicates if an wall is on the immediate right of Reeborg.

        Returns:
           True if a wall is on Reeborg's right, False otherwise.
        """
        return RUR._UR.wall_on_right_(self.body)

#py:python_specific

def add_watch(expr):  #py:add_watch
    """Adds a valid Python expression (given as a string) to
       the watch list.
    """
    RUR.add_watch(expr)


def dir_py(obj):  #py:dir_py
    """Lists attributes and methods of a Python object, excluding
       those whose name start with a double underscore and are
       considered to be private.
    """
    # do not translate the name of this function
    attrs = []
    for attr in dir(obj):
        if attr.startswith("__"):
            continue
        if callable(getattr(obj, attr)):
            attr += "()"
        attrs.append(attr)
    print_html(str("\n".join(attrs)).replace("&", "&amp").replace("<", "&lt;"
                  ).replace(">", "&gt;").replace("\n", "<br>"))


class ReeborgError(Exception):  #py:RE
    """Exceptions specific to Reeborg's World.

       Examples::

            def done():  #py:
                message = "You can not use done() for this task."
                raise ReeborgError(message)

            #---- or ------

            try:
                move()
            except ReeborgError:   # ignore a collision
                turn_left()
    """

    def __init__(self, message):  #py:RE.__init__
        self.reeborg_shouts = message

    def __str__(self):  #py:RE.__str__
        return repr(self.reeborg_shouts)
try:
    window['ReeborgError'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """Exceptions specific to Reeborg's World.

       Is raised when Reeborg hits a wall.
    """
    pass
try:
    window['WallCollisionError'] = WallCollisionError
except:
    pass


class SatelliteInfo():  #py:SI

    @property
    def world_map(self):  #py:SI.world_map
        '''Returns a dict containing information about world.
        '''
        import json
        return json.loads(RUR.control.get_world_map())

    def print_world_map(self):  #py:SI.print_world_map
        '''Prints a formatted copy of the world'''
        print(RUR.control.get_world_map())


#py:obsolete
# Do not tranlate the following

def narration(html):
    raise ReeborgError("narration is obsolete; use print_html().")


def say():
    raise ReeborgError("say() is no longer supported; use print() instead.")
