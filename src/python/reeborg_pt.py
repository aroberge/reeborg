"""This module contains functions, classes and exceptions that can be
included in a Python program for Reeborg's World.
"""

# Important: Multiline docstrings should have their text start
# on the second line. This results in nicer formatting when
# using help().

# When generating documentation using sphinx, these modules are both
# unavailable and not needed
try:
    from browser import window
    RUR = window.RUR
except ImportError:
    from collections import defaultdict
    window = defaultdict(str)
    print("\n --> Skipping importing from browser for sphinx.\n")

# All functions from Javascript used below should have names of the form
# RUR._xyz_ and be defined in commands.js and methods should have names of
# the form RUR._UR.xyz_;  functions and methods should appear
# alphabetically in this English version, with the exception of Python-specific
# functions or classes that should appear near the end.


def chegou():  #py:at_goal
    """
    Indicates if Reeborg has reached the desired location.

    Returns:
        True if Reeborg has reached its goal, False otherwise.
    """
    return RUR._at_goal_()

def construir_parede():  #py:build_wall
    """Instructs Reeborg to build a wall at the location in front of itself."""
    RUR._build_wall_()


def carrega_objeto(obj=None):  #py:carries_object
    """
    Indicates whether Reeborg carries an object or not.

    Args:
        obj: optional parameter which is the name of an object as a string.

    Returns:
        If no argument is specified, a dict showing the objects carried
        (name and number); if an argument is specified, it returns the number
        of arguments carried.
        a dict of the type of objects carried by Reeborg.
        If Reeborg carries no object, or not the specified one,
        the result is zero.

    Examples:

        >>> carries_object()
        {"token": 2, "apple": 1}
        >>> carries_object("token")
        2
        >>> carries_object("banana")
        0
    """
    if obj is not None:
        return RUR._carries_object_(obj)
    else:
        ans = RUR._carries_object_()
        if ans:
            return dict(ans)
        else:
            return 0

def limpa_tela():  #py:clear_print
    """Erase all the text previously written using a call to print()."""
    RUR._clear_print_()

def cor_aqui():  #py:color_here
    '''Returns the value of the color found at Reeborg's location'''
    return RUR._color_here_()

def default_robo():  #py:default_robot
    """Returns a recreated version of the default robot."""
    class Robot(UsedRobot):
        def __init__(self):
            self.body = RUR._default_robot_body_()
    return Robot()

def get_robot_by_id(serial_number):  #py:default_robot
    """
    Not intended for normal use.

    If a robot with the given serial_number
    exists, this function returns a recreated version of a UsedRobot
    corresponding to that robot; otherwise, it returns None.
    """
    r = RUR.get_robot_body_by_id(serial_number)
    if r is None:
        return r
    class Robot(UsedRobot):
        def __init__(self):
            self.body = r
    return Robot()


def pronto():  #py:done
    """
    Causes a program's execution to end.

    When used in REPL mode, this results in the world's goal being checked.
    """
    RUR._done_()


def frente_esta_livre():  #py:front_is_clear
    """
    Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

    Returns:
       True if the path is clear (not blocked), False otherwise.
    """
    return RUR._front_is_clear_()


def virado_norte():  #py:is_facing_north
    """Indicates if Reeborg is facing North (top of the screen) or not."""
    return RUR._is_facing_north_()


def mover():  #py:move
    """Move forward, by one grid position."""
    RUR._move_()


def nova_imagem_robo(images):  #py:new_robot_images
    """
    Allow to replace the images used for the robot.

    Instead of using this function, it is preferable to use
    RUR.new_robot_images in the Onload editor, so that the images can be
    fetched as quickly as possible.

        Args:
            images: a Python dict
            images[model]: The model name for the robot; if no value is
                specified, the name will be set to "anonymous".

            images["east"]  A url for the source of the image to be used
            for the robot in the East orientation. If it is not specified, the
            default "classic" image will be used.

            images["north"]  Similar to images["east"]

            images["west"]   Similar to images["east"]

            images["south"]  Similar to images["east"]
    """
    RUR._new_robot_images_(images)


def sem_destaque():  #py:no_highlight
    """
    Prevents code highlighting from occurring.

    This function has a similar effect to clicking the corresponding
    button in Reeborg's World.

    Code highlighting occurs thanks to some extra code inserted in a
    user's program prior to execution.  If this function is called
    with highlighting active, it will be disabled and the program will stop.
    If highlighting is not active, calls to this function will have no
    effect.
    """
    RUR._no_highlight_()


def objeto_aqui(obj=None):  #py:object_here
    """
    Indicates whether any type of objects are present at Reeborg's location.

    Args:
        obj: optional parameter which is the name of an object as a string.

    Returns:
        a list of the type of objects found.  If no object is present,
        or if the specified object is not found, the result is an empty list.

    Note: When using Javascript, instead of returning an empty list is no
    object if found, 'false' is returned.

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
    if ans:
        return list(ans)  # convert from JS list-like object to proper Python list
    else:
        return []


def pinta_quadrado(color):  #py:paint_square
    """Fills the grid square where Reeborg is located with the specified color"""
    RUR._paint_square_(color)


def pausar(ms=None):  #py:pause
    """
    Pauses a program's execution (playback).

    If an argument (time in milliseconds) is given, the execution
    automatically resumes after this time has elapsed.
    """
    if ms is None:
        RUR._pause_()
    else:
        RUR._pause_(ms)


def posicao_aqui():
    '''
    Returns a tuple (x, y) giving the coordinates of the robot.

    The corresponding JavaScript function returns an array [x, y].
    '''
    body = RUR._default_robot_body_()
    return (body.x, body.y)


def posicao_a_frente():
    '''
    Returns a tuple (x, y) giving the coordinates of position immediately
    in front of the robot if the position is within the world boundaries,
    otherwise returns an empty tuple.

    The corresponding JavaScript function returns an array [x, y] or the value
    undefined if the position is not within the world boundaries.
    '''
    body = RUR._default_robot_body_()
    pos = RUR.get_position_in_front(body)
    if RUR.is_valid_position(pos["x"], pos["y"]):
        return (pos["x"], pos["y"])
    else:
        return tuple()


def imprime_html(html, replace=False):  #py:print_html
    """
    Intended primarily for world creators, this function is similar to
    print() except it can make use of html input.

    Args:
        html: the content (in html format) to be displayed.
        replace: if True, the html content will replace whatever was there
            already; otherwise, it is appended.

    """
    RUR._print_html_(html, replace)


def colocar(obj=None):  #py:put
    """
    Puts down an object.  If Reeborg carries more than one type of objects,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)


def gerar(obj=None):
    """
    Reeborg throws an object on the square in front of its current position.
    If Reeborg carries more than one type of objects,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if obj is None:
        RUR._toss_()
    else:
        RUR._toss_(obj)

def gravar(boolean):  #py:recording
    """
    Stops or starts recording changes occuring in the world.

    Args:
        bool: True if recording is desired, False otherwise.

    Returns: the previous recording state value.
    """
    return RUR._recording_(boolean)


def remove_robos():  #py:remove_robots
    """Remove all robots found in the world."""
    RUR._remove_robots_()


def direita_esta_livre():  #py:right_is_clear
    """
    Indicates if an obstacle (wall, fence, water, etc.) is on the
    immediate right of Reeborg.

    Returns:
       True if an obstacle is on Reeborg's right, False otherwise.
    """
    return RUR._right_is_clear_()


def definir_max_passos(nb):  #py:set_max_nb_steps
    """
    Intended primarily for world creators, this function allows
    to change the default maximum number of instructions executed in a
    program (1000) by a different value.
    """
    RUR._set_max_nb_steps_(nb)


def definir_cor_linha(color):  #py:set_trace_color
    """
    Changes the color of the trace (oil leak).

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


def definir_estilo_linha(style="default"):  #py:set_trace_style
    """
    Changes the trace style of the robot.

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


def som(boolean):  #py:sound
    """Activate or deactivate sound effects."""
    RUR._sound_(boolean)


def pegar(obj=None):  #py:take
    """
    Takes an object.  If more than one type of objects is at Reeborg's location,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def pensar(ms):  #py:think
    """
    Set a time delay (in milliseconds) between Reeborg's actions
    played back.

    Returns the time delay value previously used.
    """
    return RUR._think_(ms)


def virar_esquerda():  #py:turn_left
    """Reeborg turns to its left."""
    RUR._turn_left_()


def parede_a_frente():  #py:wall_in_front
    """
    Indicates if a wall blocks the way.

    Returns:
       True if the path blocked by a wall, False otherwise.
    """
    return RUR._wall_in_front_()


def parede_a_direita():  #py:wall_on_right
    """
    Indicates if an wall is on the immediate right of Reeborg.

    Returns:
       True if a wall is on Reeborg's right, False otherwise.
    """
    return RUR._wall_on_right_()


def criarMenu(content):  #py:MakeCustomMenu
    """
    Designed for use by educators.  Makes it possible to create custom world
    menus.  See the documentation for more details.
    """
    RUR._MakeCustomMenu_(content)
MakeCustomMenu = criarMenu  # so that we can load menu files in any language


def Mundo(url, shortname=None):  #py:World
    """
    Allows to select a specific world within a program.

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


class robousado(object):  #py:UR
    '''The OOP version of Reeborg'''
    def __init__(self, x=1, y=1, orientation='e', tokens=None, **kwargs):  #py:UR.__init__
        """
        Creates a UsedRobot.

            Args:
               x: horizontal coordinate; an integer greater or equal to 1.
               y: vertical coordinate; an integer greater or equal to 1.
               orientation (string):
                            one of "e" or "east","w" or "west",
                            "n" or "north", "s" or "south", or "random".
               tokens: Initial number of tokens to give to the robot;
                       its value must be a positive integer, or the string
                       "infinite" to indicate an infinite quantity.

               other: any other keyword argument will be taken as a number of
                      objects to give to a robot.
        """
        if tokens is None:
            robot = RUR.robot.create_robot(x, y, orientation)
        else:
            robot = RUR.robot.create_robot(x, y, orientation, tokens)
        self.body = robot
        for key in kwargs:
            if key not in {'x', 'y', 'orientation', 'tokens'}:
                RUR.give_object_to_robot(key, kwargs[key], robot)
        RUR.add_robot(self.body)

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

        carries = ''
        for obj in self.body.objects:
            if self.body.objects[obj] == 'inf':
                carries += "\ncarries an infinite number of %s" % obj
            else:
                carries += '\ncarries %s %s' % (self.body.objects[obj], obj)
        if not carries:
            carries = 'carries no objects'
        return "UsedRobot at {} {} {}.".format(location, facing, carries)

    def chegou(self):  #py:UR.at_goal
        """
        Indicates if Reeborg has reached the desired location.

        Returns:
            True if Reeborg has reached its goal, False otherwise.
        """
        return RUR._UR.at_goal_(self.body)

    def construir_parede(self):  #py:UR.build_wall
        """
        Instructs Reeborg to build a wall at the location in
        front of itself.
        """
        RUR._UR.build_wall_(self.body)

    def carrega_objeto(self, obj=None):  #py:UR.carries_object
        """
        Indicates whether Reeborg carries an object or not.

        Args:
            obj: optional parameter which is the name of an object as a string.

        Returns:
            If no argument is specified, a dict showing the objects carried
            (name and number); if an argument is specified, it returns the
            number of arguments carried.
            a dict of the type of objects carried by Reeborg.
            If Reeborg carries no object, or not the specified one,
            the result is zero.

        Examples:

            >>> reeborg = UsedRobot()
            >>> reeborg.carries_object()
            {"token": 2}
            >>> reeborg.carries_object("token")
            2
            >>> reeborg.carries_object("banana")
            0
        """

        if obj is not None:
            return RUR._UR.carries_object_(self.body, obj)
        else:
            ans = RUR._UR.carries_object_(self.body)
            if ans:
                return dict(ans)
            else:
                return 0

    def cor_aqui(self):  #py:color_here
        '''Returns the value of the color found at Reeborg's location'''
        return RUR._UR.color_here_(self.body)

    def colour_here(self):
        '''Returns the value of the color found at Reeborg's location'''
        return self.color_here()


    def frente_esta_livre(self):  #py:UR.front_is_clear
        """
        Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

        Returns:
           True if the path is clear (not blocked), False otherwise.
        """
        return RUR._UR.front_is_clear_(self.body)

    def virado_norte(self):  #py:UR.is_facing_north
        """Indicates if Reeborg is facing North (top of the screen) or not."""
        return RUR._UR.is_facing_north_(self.body)

    def mover(self):  #py:UR.move
        """Move forward, by one grid position."""
        RUR._UR.move_(self.body)

    def objeto_aqui(self, obj=None):  #py:UR.object_here
        """
        Indicates whether any type of objects are present at Reeborg's location.

        Args:
            obj: optional parameter which is the name of an object as a string.

        Returns:
            a list of the type of objects found.  If no object is present,
            or if the specified object is not found, the result is an
            empty list.

        Note: When using Javascript, instead of returning an empty list is no
        object if found, 'false' is returned.

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
            ans = RUR._UR.object_here_(self.body, obj)
        else:
            ans = RUR._UR.object_here_(self.body)
        if ans:
            return list(ans)
        else:
            return []


    def pinta_quadrado(self, color):
        """Fills the grid square where Reeborg is located with the specified color"""
        RUR._UR.paint_square_(color, self.body)


    def posicao_aqui(self):
        '''
        Returns a tuple (x, y) giving the coordinates of the robot.

        The corresponding JavaScript function returns an array [x, y].
        '''
        return (self.body.x, self.body.y)


    def posicao_a_frente(self):
        '''
        Returns a tuple (x, y) giving the coordinates of position immediately
        in front of the robot if the position is within the world boundaries,
        otherwise returns an empty tuple.

        The corresponding JavaScript function returns an array [x, y] or the
        value undefined if the position is not within the world boundaries.
        '''
        pos = RUR.get_position_in_front(self.body)
        if RUR.is_valid_position(pos["x"], pos["y"]):
            return (pos["x"], pos["y"])
        else:
            return tuple()


    def colocar(self, obj=None):  #py:UR.put
        """
        Puts down an object.  If Reeborg carries more than one type of objects,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if obj is None:
            RUR._UR.put_(self.body)
        else:
            RUR._UR.put_(self.body, obj)

    def gerar(self, obj=None):
        """
        Reeborg throws an object on the square in front of its current position.
        If Reeborg carries more than one type of objects,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if obj is None:
            RUR._UR.toss_(self.body)
        else:
            RUR._UR.toss_(self.body, obj)

    def direita_esta_livre(self):  #py:UR.right_is_clear
        """
        Indicates if an obstacle (wall, fence, water, etc.) is on the
        immediate right of Reeborg.

        Returns:
           True if an obstacle is on Reeborg's right, False otherwise.
        """
        return RUR._UR.right_is_clear_(self.body)

    def definir_modelo(self, model):  #py:UR.set_model
        """
        Select the model (images) for the robot.
        """
        RUR._UR.set_model_(self.body, model)

    def definir_cor_linha(self, color):  #py:UR.set_trace_color
        """
        Changes the color of the trace (oil leak).

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

    def definir_estilo_linha(self, style):  #py:UR.set_trace_style
        """
        Changes the trace style of the robot.

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

    def pegar(self, obj=None):  #py:UR.take
        """
        Instruct Reeborg to take an object.
        If more than one type of objects is at Reeborg's location,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if obj is None:
            RUR._UR.take_(self.body)
        else:
            RUR._UR.take_(self.body, obj)

    def virar_esquerda(self):  #py:UR.turn_left
        """Reeborg turns to its left."""
        RUR._UR.turn_left_(self.body)

    def parede_a_frente(self):  #py:UR.wall_in_front
        """
        Indicates if a wall blocks the way.

        Returns:
           True if the path blocked by a wall, False otherwise.
        """
        return RUR._UR.wall_in_front_(self.body)

    def parede_a_direita(self):  #py:UR.wall_on_right
        """
        Indicates if an wall is on the immediate right of Reeborg.

        Returns:
           True if a wall is on Reeborg's right, False otherwise.
        """
        return RUR._UR.wall_on_right_(self.body)

#py:python_specific

def add_watch(expr):  #py:add_watch
    """
    Adds a valid Python expression (given as a string) to
    the watch list.
    """
    RUR.add_watch(expr)


class ReeborgOK(Exception):  #py:RE
    """
    Exception specific to Reeborg's World. Used to indicate that a
    program ended with the correct result using a custom message.

        Args:
            message
    """

    def __init__(self, message):  #py:RE.__init__
        self.reeborg_success = message
        self.message = message
        super().__init__(message)

    def __str__(self):  #py:RE.__str__
        return self.reeborg_success
try:
    window['ReeborgOK_pt'] = ReeborgOK
    window['ReeborgOk_pt'] = ReeborgOK # preventing an annoying typo
except:
    pass
ReeborgOk = ReeborgOK  # preventing an annoying typo

class ReeborgError(Exception):  #py:RE
    """
    Exception specific to Reeborg's World.

       Examples:

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
        self.reeborg_failure = message
        self.message = message
        super().__init__(message)

    def __str__(self):  #py:RE.__str__
        return self.reeborg_failure
try:
    window['ReeborgError_pt'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """
    Exception specific to Reeborg's World.

    This exception is raised when Reeborg hits a wall.
    """
    pass
try:
    window['WallCollisionError_pt'] = WallCollisionError
except:
    pass

class MissingObjectError(ReeborgError):
    """
    Exception specific to Reeborg's World.

    Can occur when Reeborg attempts to take or put down an object.
    """
    pass
try:
    window['MissingObjectError_pt'] = MissingObjectError
except:
    pass


class SateliteInfo():  #py:SI
    '''Used to obtain a map of the world'''
    @property
    def world_map(self):  #py:SI.world_map
        '''Returns a dict containing information about world.
        '''
        import json
        return json.loads(RUR._world_map())

    def print_world_map(self):  #py:SI.print_world_map
        '''Prints a formatted copy of the world'''
        print(RUR._world_map())