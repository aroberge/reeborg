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

없음 = 미지정 = None
맞음 = 참 = 켬 = True
아님 = 거짓 = 끔 = False

# All functions from Javascript used below should have names of the form
# RUR._xyz_ and be defined in commands.js and methods should have names of
# the form RUR._UR.xyz_;  functions and methods should appear
# alphabetically in this English version, with the exception of Python-specific
# functions or classes that should appear near the end.


def 목적지에_도착함():    #py:at_goal
    """
    Indicates if Reeborg has reached the desired location.

    Returns:
        True if Reeborg has reached its goal, False otherwise.
    """
    return RUR._at_goal_()

def 벽_만들기():   #py:build_wall
    """Instructs Reeborg to build a wall at the location in front of itself."""
    RUR._build_wall_()


def 물건을_가지고_있음(물건=미지정): #py:carries_object
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
    if 물건 is not None:
        return RUR._carries_object_(물건)
    else:
        ans = RUR._carries_object_()
        if ans:
            return dict(ans)
        else:
            return 0

def 출력_지우기(): #py:clear_print
    """Erase all the text previously written using a call to print()."""
    RUR._clear_print_()

def 바닥_색상():   #py:color_here
    '''Returns the value of the color found at Reeborg's location'''
    return RUR._color_here_()

def 기본_로봇():    #py:default_robot
    """Returns a recreated version of the default robot."""
    class Robot(사용_로봇):
        def __init__(self):
            self.body = RUR._default_robot_body_()
    return Robot()

def 로봇_찾기(일련번호): #py:get_robot_by_id
    """
    Not intended for normal use.

    If a robot with the given serial_number
    exists, this function returns a recreated version of a UsedRobot
    corresponding to that robot; otherwise, it returns None.
    """
    r = RUR.get_robot_body_by_id(일련번호)
    if r is None:
        return r
    class Robot(사용_로봇):
        def __init__(self):
            self.body = r
    return Robot()


def 종료():   #py:done
    """
    Causes a program's execution to end.

    When used in REPL mode, this results in the world's goal being checked.
    """
    RUR._done_()


def 앞이_비어_있음(): #py:front_is_clear
    """
    Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

    Returns:
       True if the path is clear (not blocked), False otherwise.
    """
    return RUR._front_is_clear_()


def 북쪽을_향하고_있음(): #py:is_facing_north
    """Indicates if Reeborg is facing North (top of the screen) or not."""
    return RUR._is_facing_north_()


def 전진():   #py:move
    """Move forward, by one grid position."""
    RUR._move_()


def 새_로봇_그림(그림): #py:new_robot_images
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
    RUR._new_robot_images_(그림)


def 강조표시_끄기(): #py:no_highlight
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


def 바닥에_물건이_있음(물건=미지정):    #py:object_here
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
    if 물건 is not None:
        ans = RUR._object_here_(물건)
    else:
        ans = RUR._object_here_()
    if ans:
        return list(ans)    # convert from JS list-like object to proper Python list
    else:
        return []


def 바닥_색칠(색상):   #py:paint_square
    """Fills the grid square where Reeborg is located with the specified color"""
    RUR._paint_square_(색상)


def 정지(시간=미지정):  #py:pause
    """
    Pauses a program's execution (playback).

    If an argument (time in milliseconds) is given, the execution
    automatically resumes after this time has elapsed.
    """
    if 시간 is None:
        RUR._pause_()
    else:
        RUR._pause_(시간)


def 현재_좌표():
    '''
    Returns a tuple (x, y) giving the coordinates of the robot.

    The corresponding JavaScript function returns an array [x, y].
    '''
    body = RUR._default_robot_body_()
    return (body.x, body.y)


def 전면_좌표():
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


def print_html(html, replace=False):   #py:print_html
    """
    Intended primarily for world creators, this function is similar to
    print() except it can make use of html input.

    Args:
        html: the content (in html format) to be displayed.
        replace: if True, the html content will replace whatever was there
            already; otherwise, it is appended.

    """
    RUR._print_html_(html, replace)


def 놓기(물건=미지정):   #py:put
    """
    Puts down an object.  If Reeborg carries more than one type of objects,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if 물건 is None:
        RUR._put_()
    else:
        RUR._put_(물건)


def 던지기(물건=미지정):
    """
    Reeborg throws an object on the square in front of its current position.
    If Reeborg carries more than one type of objects,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if 물건 is None:
        RUR._toss_()
    else:
        RUR._toss_(물건)

def 기록(상태): #py:recording
    """
    Stops or starts recording changes occuring in the world.

    Args:
        bool: True if recording is desired, False otherwise.

    Returns: the previous recording state value.
    """
    return RUR._recording_(상태)


def 로봇_제거():    #py:remove_robots
    """Remove all robots found in the world."""
    RUR._remove_robots_()


def 오른쪽이_비어_있음(): #py:right_is_clear
    """
    Indicates if an obstacle (wall, fence, water, etc.) is on the
    immediate right of Reeborg.

    Returns:
       True if an obstacle is on Reeborg's right, False otherwise.
    """
    return RUR._right_is_clear_()


def 최대_명령실행_수_설정(명령실행_수):  #py:set_max_nb_steps
    """
    Intended primarily for world creators, this function allows
    to change the default maximum number of instructions executed in a
    program (1000) by a different value.
    """
    RUR._set_max_nb_steps_(명령실행_수)


def 경로_색상_설정(색상): #py:set_trace_color
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
    RUR._set_trace_color_(색상)


def 경로_모양_설정(모양="default"):   #py:set_trace_style
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
    if 모양 not in ["thick", "default", "invisible"]:
        raise ReeborgError("Unrecognized style in set_trace_style().")
    RUR._set_trace_style_(모양)


def 소리(상태): #py:sound
    """Activate or deactivate sound effects."""
    RUR._sound_(상태)


def 줍기(물건=미지정):   #py:take
    """
    Takes an object.  If more than one type of objects is at Reeborg's location,
    the type must be specified as an argument, otherwise an exception
    will be raised.
    """
    if 물건 is None:
        RUR._take_()
    else:
        RUR._take_(물건)


def 생각(시간): #py:think
    """
    Set a time delay (in milliseconds) between Reeborg's actions
    played back.

    Returns the time delay value previously used.
    """
    return RUR._think_(시간)


def 좌회전():   #py:turn_left
    """Reeborg turns to its left."""
    RUR._turn_left_()


def 앞에_벽이_있음(): #py:wall_in_front
    """
    Indicates if a wall blocks the way.

    Returns:
       True if the path blocked by a wall, False otherwise.
    """
    return RUR._wall_in_front_()


def 오른쪽에_벽이_있음(): #py:wall_on_right
    """
    Indicates if an wall is on the immediate right of Reeborg.

    Returns:
       True if a wall is on Reeborg's right, False otherwise.
    """
    return RUR._wall_on_right_()


def MakeCustomMenu(내용):    #py:MakeCustomMenu
    """
    Designed for use by educators.  Makes it possible to create custom world
    menus.  See the documentation for more details.
    """
    RUR._MakeCustomMenu_(내용)


def 월드(url, 이름=미지정):   #py:World
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
    if 이름 is None:
        RUR._World_(url)
    else:
        RUR._World_(url, 이름)


class 사용_로봇(object):  #py:UR
    '''The OOP version of Reeborg'''
    def __init__(self, x=1, y=1, 방향='e', 토큰=None, **kwarg):  #py:UR.__init__
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
        if 토큰 is None:
            robot = RUR.robot.create_robot(x, y, 방향)
        else:
            robot = RUR.robot.create_robot(x, y, 방향, 토큰)
        self.body = robot
        for key in kwarg:
            if key not in {'x', 'y', 'orientation', 'tokens'}:
                RUR.give_object_to_robot(key, kwarg[key], robot)
        RUR.add_robot(self.body)

    def __str__(self):  #py:UR.__str__
        location = "({}, {})".format(self.body.x, self.body.y)
        if self.body._orientation == RUR.EAST:
            facing = "동쪽을 향함"
        elif self.body._orientation == RUR.WEST:
            facing = "서쪽을 향함"
        elif self.body._orientation == RUR.NORTH:
            facing = "북쪽을 향함"
        elif self.body._orientation == RUR.SOUTH:
            facing = "남쪽을 향함"

        carries = ''
        for obj in self.body.objects:
            if self.body.objects[obj] == 'inf':
                carries += "\n携带乐无穷多个%s" % obj
            else:
                carries += '\n携带了%s个%s' % (self.body.objects[obj], obj)
        if not carries:
            carries = '没有携带物品'
        return "机器人在座标{}，{}，{}.".format(location, facing, carries)

    def 목적지에_도착함(self):    #py:UR.at_goal
        """
        Indicates if Reeborg has reached the desired location.

        Returns:
            True if Reeborg has reached its goal, False otherwise.
        """
        return RUR._UR.at_goal_(self.body)

    def 벽_만들기(self):   #py:UR.build_wall
        """
        Instructs Reeborg to build a wall at the location in
        front of itself.
        """
        RUR._UR.build_wall_(self.body)

    def 물건을_가지고_있음(self, 물건=미지정):  #py:UR.carries_object
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

        if 물건 is not None:
            return RUR._UR.carries_object_(self.body, 물건)
        else:
            ans = RUR._UR.carries_object_(self.body)
            if ans:
                return dict(ans)
            else:
                return 0

    def 바닥_색상(self):    #py:color_here
        '''Returns the value of the color found at Reeborg's location'''
        return RUR._UR.color_here_(self.body)


    def 앞이_비어_있음(self): #py:UR.front_is_clear
        """
        Indicates if an obstacle (wall, fence, water, etc.) blocks the path.

        Returns:
           True if the path is clear (not blocked), False otherwise.
        """
        return RUR._UR.front_is_clear_(self.body)

    def 북쪽을_향하고_있음(self): #py:UR.is_facing_north
        """Indicates if Reeborg is facing North (top of the screen) or not."""
        return RUR._UR.is_facing_north_(self.body)

    def 전진(self):   #py:UR.move
        """Move forward, by one grid position."""
        RUR._UR.move_(self.body)

    def 바닥에_물건이_있음(self, 물건=미지정):  #py:UR.object_here
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
        if 물건 is not None:
            ans = RUR._UR.object_here_(self.body, 물건)
        else:
            ans = RUR._UR.object_here_(self.body)
        if ans:
            return list(ans)
        else:
            return []


    def 바닥_색칠(self, 색상):
        """Fills the grid square where Reeborg is located with the specified color"""
        RUR._UR.paint_square_(색상, self.body)


    def 현재_좌표(self):
        '''
        Returns a tuple (x, y) giving the coordinates of the robot.

        The corresponding JavaScript function returns an array [x, y].
        '''
        return (self.body.x, self.body.y)


    def 전면_좌표(self):
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


    def 놓기(self, 물건=None): #py:UR.put
        """
        Puts down an object.  If Reeborg carries more than one type of objects,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if 물건 is None:
            RUR._UR.put_(self.body)
        else:
            RUR._UR.put_(self.body, 물건)

    def 던지기(self, 물건=None):
        """
        Reeborg throws an object on the square in front of its current position.
        If Reeborg carries more than one type of objects,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if 물건 is None:
            RUR._UR.toss_(self.body)
        else:
            RUR._UR.toss_(self.body, 물건)

    def 오른쪽이_비어_있음(self): #py:UR.right_is_clear
        """
        Indicates if an obstacle (wall, fence, water, etc.) is on the
        immediate right of Reeborg.

        Returns:
           True if an obstacle is on Reeborg's right, False otherwise.
        """
        return RUR._UR.right_is_clear_(self.body)

    def 모델_설정(self, 모델):  #py:UR.set_model
        """
        Select the model (images) for the robot.
        """
        RUR._UR.set_model_(self.body, 모델)

    def 경로_색상_설정(self, 색상):    #py:UR.set_trace_color
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
        RUR._UR.set_trace_color_(self.body, 색상)

    def 경로_모양_설정(self, 모양="default"): #py:UR.set_trace_style
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
        if 모양 not in ["thick", "default", "invisible"]:
            raise ReeborgError("Unrecognized style in set_trace_style().")
        RUR._UR.set_trace_style_(self.body, 모양)

    def 줍기(self, 物品=None): #py:UR.take
        """
        Instruct Reeborg to take an object.
        If more than one type of objects is at Reeborg's location,
        the type must be specified as an argument, otherwise an exception
        will be raised.
        """
        if 物品 is None:
            RUR._UR.take_(self.body)
        else:
            RUR._UR.take_(self.body, 物品)

    def 좌회전(self):   #py:UR.turn_left
        """Reeborg turns to its left."""
        RUR._UR.turn_left_(self.body)

    def 앞에_벽이_있음(self): #py:UR.wall_in_front
        """
        Indicates if a wall blocks the way.

        Returns:
           True if the path blocked by a wall, False otherwise.
        """
        return RUR._UR.wall_in_front_(self.body)

    def 오른쪽에_벽이_있음(self): #py:UR.wall_on_right
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
    window['ReeborgOK_ko'] = ReeborgOK
    window['ReeborgOk_ko'] = ReeborgOK # preventing an annoying typo
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
    window['ReeborgError_ko'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """
    Exception specific to Reeborg's World.

    This exception is raised when Reeborg hits a wall.
    """
    pass
try:
    window['WallCollisionError_ko'] = WallCollisionError
except:
    pass

class MissingObjectError(ReeborgError):
    """
    Exception specific to Reeborg's World.

    Can occur when Reeborg attempts to take or put down an object.
    """
    pass
try:
    window['MissingObjectError_ko'] = MissingObjectError
except:
    pass


class 위성_정보():   #py:SI
    '''Used to obtain a map of the world'''
    @property
    def 월드_지도(self): #py:SI.world_map
        '''Returns a dict containing information about world.
        '''
        import json
        return json.loads(RUR._world_map())

    def 월드_지도_출력(self):   #py:SI.print_world_map
        '''Prints a formatted copy of the world'''
        print(RUR._world_map())
