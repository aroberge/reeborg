RUR.add_pushable("carotte", 2, 3)
assert RUR.get_pushable(2, 3) == "carotte"
assert RUR.is_pushable("carotte", 2, 3)
RUR.remove_pushable("carotte", 2, 3)

options = {'goal': True}
RUR.add_pushable("pomme", 2, 3, options)
assert RUR.get_pushable(2, 3, options) == "pomme"
assert RUR.is_pushable("pomme", 2, 3, options)
RUR.remove_pushable("pomme", 2, 3, options)

assert not RUR.get_pushable(1, 1)

error = False
try:
    RUR.add_pushable("boîte", 3, 3)
    RUR.add_pushable("boîte", 3, 3)
except ReeborgError:
    error = True
assert error

# when evaluating onload code, no error should be raised when attempting
# to add a pushable at a place where there is already one.
RUR.state.evaluating_onload = True
RUR.add_pushable("carotte", 3, 3)
assert RUR.is_pushable("carotte", 3, 3)
assert RUR.get_pushable(3, 3) == "carotte"
RUR.state.evaluating_onload = False
