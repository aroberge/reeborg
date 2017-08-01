for o in ['est', 'sud', 'ouest', 'nord']:
    RUR.add_wall(o, 3, 3, {'goal': True})
for o in ['est', 'sud', 'ouest', 'nord']:
    RUR.add_wall(o, 3, 3)

assert RUR.is_wall("est", 3, 3)
assert not RUR.is_wall("est", 3, 4)
assert RUR.is_wall("sud", 3, 3)
assert RUR.is_wall("nord", 3, 3)
assert RUR.is_wall("ouest", 3, 3)

dirs = ['est', 'nord', 'ouest', 'sud']
assert RUR.get_walls(3, 3) == dirs

error = False
try:
    RUR.add_wall('est', 3, 3)
except ReeborgError:
    error = True
assert error

RUR.state.evaluating_onload = True
RUR.add_wall('est', 3, 3)
RUR.state.evaluating_onload = False

for o in ['est', 'sud', 'ouest', 'nord']:
    RUR.add_wall(o, 5, 5, {'goal': True})
    RUR.remove_wall(o, 5, 5, {'goal': True})
    assert not RUR.is_wall(o, 5, 5, {'goal': True})
for o in ['est', 'sud', 'ouest', 'nord']:
    RUR.add_wall(o, 3, 5)
    RUR.remove_wall(o, 3, 5)
    assert not RUR.is_wall(o, 5, 5)
