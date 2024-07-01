RUR.add_obstacle("fence_double", 2, 3)
assert RUR.get_obstacles(2, 3) == ["fence_double"]
assert RUR.is_obstacle("fence_double", 2, 3)
RUR.remove_obstacle("fence_double", 2, 3)
assert not RUR.is_obstacle("fence_double", 2, 3)
assert RUR.get_obstacles(2, 3) == []

assert not RUR.get_bridge(1, 1)

error = False
try:
    RUR.add_obstacle("fence_left", 2, 3)
    RUR.add_obstacle("fence_left", 2, 3)
except ReeborgError:
    error = True
assert error
RUR.add_obstacle("fence_double", 2, 3)

# when evaluating onload code, no error should be raised when attempting
# to add a bridge at a place where there is already one.
RUR.state.evaluating_onload = True
RUR.add_obstacle("fence_right", 2, 3)
RUR.add_obstacle("fence_right", 2, 3)
RUR.state.evaluating_onload = False
clotures = ["fence_left", "fence_double",
            "fence_right"]
assert RUR.get_obstacles(2, 3) == clotures

assert RUR.is_solid_obstacle(2, 3)

RUR.add_obstacle("apple", 4, 4)
assert not RUR.is_solid_obstacle(4, 4)
assert not RUR.is_solid_obstacle(1, 1)

