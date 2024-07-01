RUR.add_pushable("carrot", 2, 3)
assert RUR.get_pushable(2, 3) == "carrot"
assert RUR.is_pushable("carrot", 2, 3)
RUR.remove_pushable("carrot", 2, 3)

options = {'goal': True}
RUR.add_pushable("apple", 2, 3, options)
assert RUR.get_pushable(2, 3, options) == "apple"
assert RUR.is_pushable("apple", 2, 3, options)
RUR.remove_pushable("apple", 2, 3, options)

assert not RUR.get_pushable(1, 1)

error = False
try:
    RUR.add_pushable("box", 3, 3)
    RUR.add_pushable("box", 3, 3)
except ReeborgError:
    error = True
assert error

# when evaluating onload code, no error should be raised when attempting
# to add a pushable at a place where there is already one.
RUR.state.evaluating_onload = True
RUR.add_pushable("carrot", 3, 3)
assert RUR.is_pushable("carrot", 3, 3)
assert RUR.get_pushable(3, 3) == "carrot"
RUR.state.evaluating_onload = False
