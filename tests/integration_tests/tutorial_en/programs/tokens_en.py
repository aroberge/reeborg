# tokens 1 to 5

def collect_all():
    while object_here():
        take()
        move()

def put_all_down_and_move():
    while carries_object():
        put()
    move()
    
while not at_goal():
    if object_here():
        collect_all()
    elif carries_object():
        put_all_down_and_move()
    else:
        move()
