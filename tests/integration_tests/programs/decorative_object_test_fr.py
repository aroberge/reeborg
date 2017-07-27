RUR.add_decorative_object("clôture_double", 2, 2)
RUR.add_decorative_object("blue", 3, 3)
RUR.add_decorative_object("carotte", 2, 2)
RUR.add_decorative_object("carotte", 2, 2)
assert RUR.is_decorative_object("carotte", 2, 2)
assert RUR.is_decorative_object("clôture_double", 2, 2)
assert RUR.is_decorative_object("blue", 3, 3)
assert not RUR.is_decorative_object("pont", 2, 2)
obj = ["clôture_double", "carotte"]
assert RUR.get_decorative_objects(2, 2) == obj
assert RUR.get_decorative_objects(4, 4) == []
RUR.remove_decorative_object("clôture_double", 2, 2)
assert RUR.get_decorative_objects(2, 2) == ["carotte"]

error = False
try:  # no object whatsoever here
    RUR.remove_decorative_object("carotte", 4, 4)
except ReeborgError:
    error = True
assert error

error = False
try:  # different object found here
    RUR.remove_decorative_object("eau", 2, 2)
except ReeborgError:
    error = True
assert error