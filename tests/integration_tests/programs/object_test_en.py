RUR.add_object('tulip', 2, 2)
RUR.add_object('tulip', 2, 2)
assert RUR.is_object('tulip', 2, 2)
assert not RUR.is_object('tulip', 2, 2, {'goal': True})
RUR.add_object('tulip', 2, 2, {'goal': True})
RUR.remove_object('tulip', 2, 2)
assert RUR.is_object('tulip', 2, 2, {'goal': True})
assert not RUR.is_object('apple', 4, 4)

RUR.add_object('apple', 3, 2)
RUR.add_object('apple', 3, 2, {'number': 5})
RUR.add_object('apple', 3, 2, {'number': 6, 'goal':True})

RUR.add_object('banana', 3, 2, {'number': 7})
RUR.add_object('banana', 3, 2, {'replace': True, 'number': 2})

# during onload phase, add === "replace:True"
RUR.state.evaluating_onload = True
RUR.add_object('banana', 3, 2, {'number': 12, 'goal':True})
RUR.add_object('banana', 3, 2, {'number': 2, 'goal':True})
RUR.state.evaluating_onload = False

all_objects = dict(RUR.get_objects(3, 2))
assert all_objects == {'apple': 6, 'banana': 2}

assert not RUR.get_objects(1, 1)

RUR.remove_object('apple', 3, 2)
RUR.remove_object('apple', 3, 2)
RUR.remove_object('apple', 3, 2, {'goal': True, 'number': 2})

RUR.remove_object('banana', 3, 2, {'all': True})
RUR.remove_object('banana', 3, 2, {'all': True, 'goal': True})

assert dict(RUR.get_objects(3, 2)) == {'apple': 4}

error = False
try:
    RUR.remove_object('apple', 3, 2, {'number': 5})
except:
    error = True

assert error