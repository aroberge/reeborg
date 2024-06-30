"""此模块中定义的函数、类和异常都可以导入到乐跑的世界的程序里。
"""

# 重要提示：多行文档字符串（docstrings）应该从第二行开始写。这样，
# 当使用 help() 查询时，显示的格式会比较好看。

# 但使用 sphinx 生成文档时，此模块既不可用也不需要。
try:
    from browser import window
    RUR = window.RUR
except ImportError:
    from collections import defaultdict
    window = defaultdict(str)
    print("\n --> Skipping importing from browser for sphinx.\n")

无 = None
真 = 是 = True
假 = 否 = False

# 下面引用的所有名称符合 RUR._xyz_ 格式的函数为 Javascript 的函数，所有名称符合 
# RUR._UR.xyz_ 格式的函数为 Javascript 的方法，其定义参见 commands.js 。
# 这些函数和方法在英文版代码中，以字母顺序排列。但是纯 Python 函数或类是例外，
# 排在最后面。


def 到达目的地():    #py:at_goal
    """
    判断乐跑是否已经到达目的地。

    返回值：
        返回“是”如果乐跑已经到达目的地，否则返回“否”。
    """
    return RUR._at_goal_()

def 砌墙():   #py:build_wall
    """让乐跑在它自己面前砌一堵墙。"""
    RUR._build_wall_()


def 携带的物品(物品=无): #py:carries_object
    """
    判断乐跑是否携带有某种物品。

    参数：
        物品：（可选参数）物品的名称，字符串（string）类型。

    返回值：
        如果参数没有指定物品名称，则返回一个字典（dict），内容为所携带的物品
        名称和数量；如果参数指定了物品名称，则返回所携带的该物品的数量。
        返回乐跑所携带的物品，字典（dict）类型。
        如果乐跑没有携带任何物品，或没有携带指定的物品，则返回0.

    例子：

        >>> 携带的物品()
        {"token": 2, "apple": 1}
        >>> 携带的物品("token")
        2
        >>> 携带的物品("banana")
        0
    """
    if 物品 is not None:
        return RUR._carries_object_(物品)
    else:
        ans = RUR._carries_object_()
        if ans:
            return dict(ans)
        else:
            return 0

def 清除打印(): #py:clear_print
    """清除之前引用“打印()”所产生的全部文字。"""
    RUR._clear_print_()

def 此处的颜色():   #py:color_here
    '''返回乐跑所在位置的颜色值。'''
    return RUR._color_here_()

def 默认机器人():    #py:default_robot
    """返回一个新建的默认机器人实例。"""
    class Robot(机器人):
        def __init__(self):
            self.body = RUR._default_robot_body_()
    return Robot()

def 获取机器人(序列号): #py:get_robot_by_id
    """
    一般不会用到此函数。

    如果存在有机器人符合参数所指定的序列号，则返回一个新建的与该机器人一样
    的实例。
    """
    r = RUR.get_robot_body_by_id(序列号)
    if r is None:
        return r
    class Robot(机器人):
        def __init__(self):
            self.body = r
    return Robot()


def 完成():   #py:done
    """
    使程序终止运行。

    当使用交互模式（REPL mode）时，此函数将导致乐跑的世界进行结果检查。
    """
    RUR._done_()


def 前方通畅(): #py:front_is_clear
    """
    判断前方是否有障碍物（比如墙、篱笆、水，等等）堵路。

    返回值：
        返回“是”如果前方通畅（没有障碍物），否则返回“否”。
    """
    return RUR._front_is_clear_()


def 面向北方(): #py:is_facing_north
    """判断乐跑是否面向北方（屏幕上方）。"""
    return RUR._is_facing_north_()


def 前进():   #py:move
    """向前移动一格。"""
    RUR._move_()


def 新机器人图片(图片): #py:new_robot_images
    """
    替换机器人图片。

    和此函数相比，在 Onload 编辑器中使用 RUR.new_robot_images 函数可以更快的
    加载图片。

    参数：
        图片：一个 Python 字典（dict）
        图片[model]：机器人模型的名称；如果未指定，则为“anonymous”。

        图片["east"]：一个图片的地址，该图片将用于显示机器人的东侧面。如果
            没有指定，则使用默认的“classic（经典）”图片。

        图片["north"]：和图片["east"]类似

        图片["west"]：和图片["east"]类似

        图片["south"]：和图片["east"]类似
    """
    RUR._new_robot_images_(图片)


def 禁止高亮(): #py:no_highlight
    """
    
    防止代码高亮显示。

    运行此函数与点击乐跑的世界的相应按钮的效果一致。

    代码高亮的实现，得益于在运行用户程序之前插入的一些额外的代码。当代码高亮为
    激活状态时，引用此函数将禁止代码高亮并停止继续执行程序。当代码高亮为禁止状
    态时，引用此函数没有效果。
    """
    RUR._no_highlight_()


def 此处的物品(物品=无):    #py:object_here
    """
    判断乐跑所在的位置是否存在物品。

    参数：
        物品：（可选参数）物品的名称，字符串（string）类型。

    返回值：
        物品的列表（list）。如果没有任何物品，或没有指定的物品，则返回一个空列
        表。

    注意：当使用 JavaScript 时，如果没有物品可返回，那么返回值不是一个空列表，
    而是“false”。

    例子：

        >>> 此处的物品()
        ["token", "apple"]
        >>> 此处的物品("token")
        ["token"]
        >>> 此处的物品("banana")
        []
    """
    if 物品 is not None:
        ans = RUR._object_here_(物品)
    else:
        ans = RUR._object_here_()
    if ans:
        return list(ans)    # 把 JavaScript 返回的类似列表（list）的对象
                            # 转换成真正的 Python 列表
    else:
        return []


def 粉刷格子(颜色):   #py:paint_square
    """使用指定的颜色填充乐跑所在的方块格子。"""
    RUR._paint_square_(颜色)


def 暂停(毫秒=无):  #py:pause
    """
    暂停程序的执行（回放）。

    如果有给出参数（以毫秒为单位的时间），则此时间过后，程序将自动继续执行。
    """
    if 毫秒 is None:
        RUR._pause_()
    else:
        RUR._pause_(毫秒)


def 此处的坐标():
    '''
    返回机器人的坐标（x，y）元组（tuple）。

    此函数相对应的 JavaScript 函数返回一个数组（[x, y]）。
    '''
    body = RUR._default_robot_body_()
    return (body.x, body.y)


def 前方的坐标():
    '''
    返回机器人正前方格子的坐标（x，y）元组（tuple），如果该坐标仍然位于世界范围
    之内，否则返回一个空元组。

    此函数相对应的 JavaScript 函数返回一个数组（[x, y]）或“undefined”。
    '''
    body = RUR._default_robot_body_()
    pos = RUR.get_position_in_front(body)
    if RUR.is_valid_position(pos["x"], pos["y"]):
        return (pos["x"], pos["y"])
    else:
        return tuple()


def 打印超文本(超文本, 替换=否):   #py:print_html
    """
    此函数主要提供给世界的创作者使用，和“print()”类似，但可以输入超文本（html）。

    参数：
        超文本：打印的内容（超文本格式）。
        替换：是，则替换原有的内容；否，则追加在原有的内容之后。

    """
    RUR._print_html_(超文本, 替换)


def 放下(物品=无):   #py:put
    """
    放下一个物品。当乐跑携带了不同类型的物品时，必须通过参数指定物品类型，否则将抛出
    异常。
    """
    if 物品 is None:
        RUR._put_()
    else:
        RUR._put_(物品)


def 抛出(物品=None):
    """
    乐跑抛一个物品在它当前位置前方的格子里。当乐跑携带了不同类型的物品时，必须通过
    参数指定物品类型，否则将抛出异常。
    """
    if 物品 is None:
        RUR._toss_()
    else:
        RUR._toss_(物品)

def 记录(开关): #py:recording
    """
    开始或停止记录世界里所发生的变化。

    参数：
        开关：是，开始记录；否，停止记录。

    返回值：
        执行之前的开关状态。
    """
    return RUR._recording_(开关)


def 移除机器人():    #py:remove_robots
    """移除世界里的全部机器人"""
    RUR._remove_robots_()


def 右侧通畅(): #py:right_is_clear
    """
    判断右侧是否有障碍物（比如墙、篱笆、水，等等）堵路。

    返回值：
        返回“是”如果右侧通畅（没有障碍物），否则返回“否”。
    """
    return RUR._right_is_clear_()


def 设置最大步骤(数值): #py:set_max_nb_steps
    """
    此函数主要提供给世界的创作者使用，用来设置一个程序所能包含的指令数量的最大值
    （默认为1000）。
    """
    RUR._set_max_nb_steps_(数值)


def 设置路径颜色(颜色): #py:set_trace_color
    """
    更改乐跑走过路经的颜色（漏油）。

    参数：
        颜色（字符串）：可使用四种格式，颜色名称、rgb、rgba或十六进制数值。

    例子：：

        >>> 设置路径颜色("red")
        >>> 设置路径颜色("rgb(125, 0, 0)")
        >>> 设置路径颜色("rgba(125, 0, 0, 0.5)")
        >>> 设置路径颜色("#FF00FF")
    """
    RUR._set_trace_color_(颜色)


def 设置路径风格(风格="default"):   #py:set_trace_style
    """
    更改乐跑走过路经的风格。

    参数：
        风格： 有三种风格："thick"、"invisible" 和 "default"。
            "invisible" 风格相当于引用“设置路径颜色("rgba(0, 0, 0, 0)")”——
            设置路径颜色为完全透明。
            "thick" 风格在路径中间划线，无法区分左右。所以只看路径，右转貌似是一次
            完成的。
    """
    if 风格 not in ["thick", "default", "invisible"]:
        raise ReeborgError("Unrecognized style in set_trace_style().")
    RUR._set_trace_style_(风格)


def 音效(开关): #py:sound
    """开启或关闭音效。"""
    RUR._sound_(开关)


def 拾起(物品=无):   #py:take
    """
    拾起一个物品。当乐跑所在位置有不同类型的物品时，必须通过参数指定物品类型，否则将
    抛出异常。
    """
    if 物品 is None:
        RUR._take_()
    else:
        RUR._take_(物品)


def 思考(毫秒): #py:think
    """
    在乐跑的两个操作之间，设置一个延迟（以毫秒为单位）。

    返回值为上一次引用时的延迟数值。
    """
    return RUR._think_(毫秒)


def 左转():   #py:turn_left
    """让乐跑转向它的左侧。"""
    RUR._turn_left_()


def 前方有墙(): #py:wall_in_front
    """
    判断前方是否有墙堵路。

    返回值：
        返回“是”如果前方有墙堵路，否则返回“否”。
    """
    return RUR._wall_in_front_()


def 右侧有墙(): #py:wall_on_right
    """
    判断右侧是否有墙堵路。

    返回值：
        返回“是”如果右侧有墙堵路，否则返回“否”。
    """
    return RUR._wall_on_right_()


def 创建定制菜单(内容):    #py:MakeCustomMenu
    """
    此函数主要提供给世界的创作者使用，用来创建一个定制的世界菜单。详情请查看文档。
    """
    RUR._MakeCustomMenu_(内容)


def 世界(链接, 简称=无):   #py:World
    """
    用来切换到一个指定的世界。

    如果当前的世界和参数里所指定的世界不一致，那么引用此函数将使当前的世界切换为指定
    的世界，其后的指令将会被忽略。

    如果当前的世界和参数里所指定的世界一致，那么此函数将会被忽略，其后的指令将会被执
    行。

    如果指定的世界没有出现在世界菜单里，那么引用此函数将添加其至菜单。

    参数：
        链接：有两种选择——出现在世界菜单里的名称，或者在某个网站上的世界的链接。

        简称：（可选参数）出现在世界菜单里的名称

    例子：

       >>> 世界("空白")   # 默认包含的世界
       >>> 世界("http://reeborg.ca/my_world") # 虚构的连接
       # 如果成功，名称“http://reeborg.ca/my_world”将被加入世界菜单
       >>> 世界("http://reeborg.ca/my_world", "Hello")
       # 如果成功，名称“Hello”而不是链接将被加入世界菜单
    """
    if 简称 is None:
        RUR._World_(链接)
    else:
        RUR._World_(链接, 简称)


class 机器人(object):  #py:UR
    '''面向对象编程版本的乐跑'''
    def __init__(self, x=1, y=1, 朝向='e', 笑脸=None, **其它):  #py:UR.__init__
        """
        创建一个机器人对象

        参数：
            x：水平坐标，一个大于或等于1的整数。

            y：垂直坐标，一个大于或等于1的整数。

            朝向：字符串格式，可用的值有 "e" 或 "east"、
                "w" 或 "west"、"n" 或 "north"、 "s" 或 "south"、
                "random"。

            笑脸：机器人所携带的笑脸的初始数量，必须是一个正整数或字符串
                "infinite" 表示无穷数量。

            其它：其它任何关键字参数（keyword argument）将被视为给与
                机器人的物品。
        """
        if 笑脸 is None:
            robot = RUR.robot.create_robot(x, y, 朝向)
        else:
            robot = RUR.robot.create_robot(x, y, 朝向, 笑脸)
        self.body = robot
        for key in 其它:
            if key not in {'x', 'y', 'orientation', 'tokens'}:
                RUR.give_object_to_robot(key, 其它[key], robot)
        RUR.add_robot(self.body)

    def __str__(self):  #py:UR.__str__
        location = "({}, {})".format(self.body.x, self.body.y)
        facing = "朝向未知"
        if self.body._orientation == RUR.EAST:
            facing = "面向东"
        elif self.body._orientation == RUR.WEST:
            facing = "面向西"
        elif self.body._orientation == RUR.NORTH:
            facing = "面向北"
        elif self.body._orientation == RUR.SOUTH:
            facing = "面向南"

        carries = ''
        for obj in self.body.objects:
            if self.body.objects[obj] == 'inf':
                carries += "\n携带乐无穷多个%s" % obj
            else:
                carries += '\n携带了%s个%s' % (self.body.objects[obj], obj)
        if not carries:
            carries = '没有携带物品'
        return "机器人在座标{}，{}，{}.".format(location, facing, carries)

    def 到达目的地(self):    #py:UR.at_goal
        """
        判断乐跑是否已经到达目的地。

        返回值：
            返回“是”如果乐跑已经到达目的地，否则返回“否”。
        """
        return RUR._UR.at_goal_(self.body)

    def 砌墙(self):   #py:UR.build_wall
        """
        让乐跑在它自己面前砌一堵墙。
        """
        RUR._UR.build_wall_(self.body)

    def 携带的物品(self, 物品=None):  #py:UR.carries_object
        """
        判断乐跑是否携带有某种物品。

        参数：
            物品：（可选参数）物品的名称，字符串（string）类型。

        返回值：
            如果参数没有指定物品名称，则返回一个字典（dict），内容为所携带的物品
            名称和数量；如果参数指定了物品名称，则返回所携带的该物品的数量。
            返回乐跑所携带的物品，字典（dict）类型。
            如果乐跑没有携带任何物品，或没有携带指定的物品，则返回0.

        例子：

            >>> 乐跑 = 机器人()
            >>> 乐跑.携带的物品()
            {"token": 2, "apple": 1}
            >>> 乐跑.携带的物品("token")
            2
            >>> 乐跑.携带的物品("banana")
            0
        """

        if 物品 is not None:
            return RUR._UR.carries_object_(self.body, 物品)
        else:
            ans = RUR._UR.carries_object_(self.body)
            if ans:
                return dict(ans)
            else:
                return 0

    def 此处的颜色(self):    #py:color_here
        """返回乐跑所在位置的颜色值。"""
        return RUR._UR.color_here_(self.body)


    def 前方通畅(self): #py:UR.front_is_clear
        """
        判断前方是否有障碍物（比如墙、篱笆、水，等等）堵路。

        返回值：
            返回“是”如果前方通畅（没有障碍物），否则返回“否”。
        """
        return RUR._UR.front_is_clear_(self.body)

    def 面向北方(self): #py:UR.is_facing_north
        """判断乐跑是否面向北方（屏幕上方）。"""
        return RUR._UR.is_facing_north_(self.body)

    def 前进(self):   #py:UR.move
        """向前移动一格。"""
        RUR._UR.move_(self.body)

    def 此处的物品(self, 物品=None):  #py:UR.object_here
        """
        判断乐跑所在的位置是否存在物品。

        参数：
            物品：（可选参数）物品的名称，字符串（string）类型。

        返回值：
            物品的列表（list）。如果没有任何物品，或没有指定的物品，则返回一个空列
            表。

        注意：当使用 JavaScript 时，如果没有物品可返回，那么返回值不是一个空列表，
        而是“false”。

        例子：

            >>> 乐跑 = 机器人()
            >>> 乐跑.此处的物品()
            ["token", "apple"]
            >>> 乐跑.此处的物品("token")
            ["token"]
            >>> 乐跑.此处的物品("banana")
            []
        """
        if 物品 is not None:
            ans = RUR._UR.object_here_(self.body, 物品)
        else:
            ans = RUR._UR.object_here_(self.body)
        if ans:
            return list(ans)
        else:
            return []


    def 粉刷格子(self, 颜色):
        """使用指定的颜色填充乐跑所在的方块格子。"""
        RUR._UR.paint_square_(颜色, self.body)


    def 此处的坐标(self):
        """
        返回机器人的坐标（x，y）元组（tuple）。

        与此函数相对应的 JavaScript 函数返回一个数组（[x, y]）。
        """
        return (self.body.x, self.body.y)


    def 前方的坐标(self):
        """
        返回机器人正前方格子的坐标（x，y）元组（tuple），如果该坐标仍然位于世界范围
        之内，否则返回一个空元组。

        与此函数相对应的 JavaScript 函数返回一个数组（[x, y]）或“undefined”。
        """
        pos = RUR.get_position_in_front(self.body)
        if RUR.is_valid_position(pos["x"], pos["y"]):
            return (pos["x"], pos["y"])
        else:
            return tuple()


    def 放下(self, 物品=None): #py:UR.put
        """
        放下一个物品。当乐跑携带了不同类型的物品时，必须通过参数指定物品类型，否则将抛出
        异常。
        """
        if 物品 is None:
            RUR._UR.put_(self.body)
        else:
            RUR._UR.put_(self.body, 物品)

    def 抛出(self, 物品=None):
        """
        乐跑抛一个物品在它当前位置前方的格子里。当乐跑携带了不同类型的物品时，必须通过
        参数指定物品类型，否则将抛出异常。
        """
        if 物品 is None:
            RUR._UR.toss_(self.body)
        else:
            RUR._UR.toss_(self.body, 物品)

    def 右侧通畅(self): #py:UR.right_is_clear
        """
        判断右侧是否有障碍物（比如墙、篱笆、水，等等）堵路。

        返回值：
            返回“是”如果右侧通畅（没有障碍物），否则返回“否”。
        """
        return RUR._UR.right_is_clear_(self.body)

    def 设置模型(self, 模型):  #py:UR.set_model
        """
        设置机器人的模型（图片）。
        """
        RUR._UR.set_model_(self.body, 模型)

    def 设置路径颜色(self, 颜色):    #py:UR.set_trace_color
        """
        更改乐跑走过路经的颜色（漏油）。

        参数：
            颜色（字符串）：可使用四种格式，颜色名称、rgb、rgba或十六进制数值。

        例子：：

            >>> 乐跑 = 机器人()
            >>> 乐跑.设置路径颜色("red")
            >>> 乐跑.设置路径颜色("rgb(125, 0, 0)")
            >>> 乐跑.设置路径颜色("rgba(125, 0, 0, 0.5)")
            >>> 乐跑.设置路径颜色("#FF00FF")
        """
        RUR._UR.set_trace_color_(self.body, 颜色)

    def 设置路径风格(self, 风格="default"): #py:UR.set_trace_style
        """
        更改乐跑走过路经的风格。

        参数：
            风格： 有三种风格，"thick"、"invisible" 和 "default"。
                "invisible" 风格相当于引用“设置路径颜色("rgba(0, 0, 0, 0)")”——
                设置路径颜色为完全透明。
                "thick" 风格在路径中间划线，无法区分左右。所以只看路径，右转貌似是一次
                完成的。
        """
        if 风格 not in ["thick", "default", "invisible"]:
            raise ReeborgError("Unrecognized style in set_trace_style().")
        RUR._UR.set_trace_style_(self.body, 风格)

    def 拾起(self, 物品=None): #py:UR.take
        """
        拾起一个物品。当乐跑所在位置有不同类型的物品时，必须通过参数指定物品类型，否则将
        抛出异常。
        """
        if 物品 is None:
            RUR._UR.take_(self.body)
        else:
            RUR._UR.take_(self.body, 物品)

    def 左转(self):   #py:UR.turn_left
        """让乐跑转向它的左侧。"""
        RUR._UR.turn_left_(self.body)

    def 前方有墙(self): #py:UR.wall_in_front
        """
        判断前方是否有墙堵路。

        返回值：
            返回“是”如果前方有墙堵路，否则返回“否”。
        """
        return RUR._UR.wall_in_front_(self.body)

    def 右侧有墙(self): #py:UR.wall_on_right
        """
        判断右侧是否有墙堵路。

        返回值：
            返回“是”如果右侧有墙堵路，否则返回“否”。
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
    window['ReeborgOK_cn'] = ReeborgOK
    window['ReeborgOk_cn'] = ReeborgOK # preventing an annoying typo
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
    window['ReeborgError_cn'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """
    Exception specific to Reeborg's World.

    This exception is raised when Reeborg hits a wall.
    """
    pass
try:
    window['WallCollisionError_cn'] = WallCollisionError
except:
    pass

class MissingObjectError(ReeborgError):
    """
    Exception specific to Reeborg's World.

    Can occur when Reeborg attempts to take or put down an object.
    """
    pass
try:
    window['MissingObjectError_cn'] = MissingObjectError
except:
    pass


class 卫星信息():   #py:SI
    """用来获取世界地图"""
    @property
    def 世界地图(self): #py:SI.world_map
        """
        返回一个包含世界信息的字典（dict）
        """
        '''Returns a dict containing information about world.
        '''
        import json
        return json.loads(RUR._world_map())

    def 打印世界地图(self):   #py:SI.print_world_map
        """打印世界信息"""
        print(RUR._world_map())
