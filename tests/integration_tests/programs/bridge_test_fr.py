RUR.add_bridge("pont", 2, 2)
assert RUR.get_bridge_protections(2, 2) == ['water', 'mud']

RUR.add_bridge("carotte", 2, 3)
assert RUR.get_bridge_protections(2, 3) == []
assert RUR.get_bridge(2, 3) == "carotte"
assert RUR.is_bridge("carotte", 2, 3)
RUR.remove_bridge("carotte", 2, 3)
assert RUR.get_bridge_protections(2, 3) == []

assert not RUR.get_bridge(1, 1)

error = False
try:
    RUR.add_bridge("pont", 3, 3)
    RUR.add_bridge("pont", 3, 3)
except ReeborgError:
    error = True
assert error

# when evaluating onload code, no error should be raised when attempting
# to add a bridge at a place where there is already one.
RUR.state.evaluating_onload = True
RUR.add_bridge("carotte", 3, 3)
assert RUR.is_bridge("carotte", 3, 3)
RUR.state.evaluating_onload = False