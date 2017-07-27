RUR.add_decorative_object("fence_double", 2, 2)
RUR.add_decorative_object("blue", 3, 3)
RUR.add_decorative_object("carrot", 2, 2)
RUR.add_decorative_object("carrot", 2, 2)
assert RUR.is_decorative_object("carrot", 2, 2)
assert RUR.is_decorative_object("fence_double", 2, 2)
assert RUR.is_decorative_object("blue", 3, 3)
assert not RUR.is_decorative_object("bridge", 2, 2)
obj = ["fence_double", "carrot"]
assert RUR.get_decorative_objects(2, 2) == obj
assert RUR.get_decorative_objects(4, 4) == []
RUR.remove_decorative_object("fence_double", 2, 2)
assert RUR.get_decorative_objects(2, 2) == ["carrot"]

error = False
try:  # no object whatsoever here
    RUR.remove_decorative_object("carrot", 4, 4)
except ReeborgError:
    error = True
assert error

error = False
try:  # different object found here
    RUR.remove_decorative_object("water", 2, 2)
except ReeborgError:
    error = True
assert error