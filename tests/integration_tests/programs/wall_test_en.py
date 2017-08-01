for o in ['east', 'south', 'west', 'north']:
    RUR.add_wall(o, 3, 3, {'goal': True})
for o in ['east', 'south', 'west', 'north']:
    RUR.add_wall(o, 3, 3)

assert RUR.is_wall('east', 3, 3)
assert not RUR.is_wall('east', 3, 4)
assert RUR.is_wall('south', 3, 3)
assert RUR.is_wall('north', 3, 3)
assert RUR.is_wall('west', 3, 3)

dirs = ['east', 'north', 'west', 'south']
assert RUR.get_walls(3, 3) == dirs

error = False
try:
    RUR.add_wall('east', 3, 3)
except ReeborgError:
    error = True
assert error

RUR.state.evaluating_onload = True
RUR.add_wall('east', 3, 3)
RUR.state.evaluating_onload = False

for o in ['east', 'south', 'west', 'north']:
    RUR.add_wall(o, 5, 5, {'goal': True})
    RUR.remove_wall(o, 5, 5, {'goal': True})
    assert not RUR.is_wall(o, 5, 5, {'goal': True})
for o in ['east', 'south', 'west', 'north']:
    RUR.add_wall(o, 3, 5)
    RUR.remove_wall(o, 3, 5)
    assert not RUR.is_wall(o, 5, 5)
