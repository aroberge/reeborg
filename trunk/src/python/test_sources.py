simple = """
a=5
for x in range(a):
    print(x)
print("Happy end")
"""

# result simple
simple_result = """
_tp(1)
a=5
_tp(2)
for x in range(a):
    _tp(3)
    print(x)
    _tp(2)
_tp(4)
print("Happy end")
"""
###################################
# simple no spaces: no blank line at beginning and no \n at the end
simple_1 = """a=5
for x in range(a):
    print(x)
print("Happy end")"""

# result simple
simple_result_1 = """_tp(0)
a=5
_tp(1)
for x in range(a):
    _tp(2)
    print(x)
    _tp(1)
_tp(3)
print("Happy end")"""

#####################################
# example of definition
def_code = """
def turn_right():
    turn_left()
    turn_left()
    turn_left()

"""
def_code_result = """
_tp(1)
def turn_right():
    _tp(2)
    turn_left()
    _tp(3)
    turn_left()
    _tp(4)
    turn_left()

"""

#####################################

while_loop = """
while token_here():
    take()
move()
"""

while_loop_result = """
_tp(1)
while token_here():
    _tp(2)
    take()
    _tp(1)
_tp(3)
move()
"""

#####################################

only_while_loop = """
while token_here():
    take()
"""

only_while_loop_result = """
_tp(1)
while token_here():
    _tp(2)
    take()

    _tp(1)"""

##########################################

if_elif_else = """
if right_is_clear():
    turn_right()
    move()
elif front_is_clear():
    move()
else:
    turn_left()
"""

if_elif_else_result = """
_tp(1)
if right_is_clear():
    _tp(2)
    turn_right()
    _tp(3)
    move()
elif front_is_clear():
    _tp(4)
    RUR.control.placeholder_frame()
    _tp(5)
    move()
else:
    _tp(6)
    RUR.control.placeholder_frame()
    _tp(7)
    turn_left()
"""

###########################

complex_code = """
def follow_wall():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()
while not at_goal():
    follow_wall()
"""
complex_code_result = """
_tp(1)
def follow_wall():
    _tp(2)
    if right_is_clear():
        _tp(3)
        turn_right()
        _tp(4)
        move()
    elif front_is_clear():
        _tp(5)
        RUR.control.placeholder_frame()
        _tp(6)
        move()
    else:
        _tp(7)
        RUR.control.placeholder_frame()
        _tp(8)
        turn_left()
_tp(9)
while not at_goal():
    _tp(10)
    follow_wall()

    _tp(9)"""

##############################

three_levels_if = """
if True:
    if False:
        if other:
            a()
        elif some:
            b()
        else:
            c()
    elif other:
        a()
        b()
        c()
else:
    if True:
        if True:
            done()
"""

three_levels_if_result = """
_tp(1)
if True:
    _tp(2)
    if False:
        _tp(3)
        if other:
            _tp(4)
            a()
        elif some:
            _tp(5)
            RUR.control.placeholder_frame()
            _tp(6)
            b()
        else:
            _tp(7)
            RUR.control.placeholder_frame()
            _tp(8)
            c()
    elif other:
        _tp(9)
        RUR.control.placeholder_frame()
        _tp(10)
        a()
        _tp(11)
        b()
        _tp(12)
        c()
else:
    _tp(13)
    RUR.control.placeholder_frame()
    _tp(14)
    if True:
        _tp(15)
        if True:
            _tp(16)
            done()
"""
