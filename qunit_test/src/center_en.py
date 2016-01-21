# General solution to worlds Center 1, Center 2, Center 3

def seek_along_line():
    '''Puts a token at each end of a line,
       turn to face the center and start
       the back and forth process to seek the center.'''
    put()
    while not wall_in_front():
        move()
    put()
    turn_left()
    turn_left()
    seek_center()

def seek_center():
    while True:
        take()
        if object_here():
            return
        move()
        if object_here():
            return
        put()
        move()
        while not object_here():
            move()
        turn_left()
        turn_left()



seek_along_line()
while not is_facing_north():
    turn_left()
# restart with two tokens in hand
take()
seek_along_line()
