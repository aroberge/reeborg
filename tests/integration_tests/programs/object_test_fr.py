RUR.add_object('tulipe', 2, 2)
RUR.add_object('tulipe', 2, 2)
RUR.add_object('tulipe', 2, 2, {'goal': True})
RUR.remove_object('tulipe', 2, 2)
assert RUR.is_object('tulipe', 2, 2)
assert not RUR.is_object('pomme', 4, 4)

RUR.add_object('pomme', 3, 2)
RUR.add_object('pomme', 3, 2, {'number': 5})
RUR.add_object('pomme', 3, 2, {'number': 6, 'goal':True})

RUR.add_object('banane', 3, 2, {'number': 7})
RUR.add_object('banane', 3, 2, {'replace': True, 'number': 2})

# during onload phase, add === "replace:True"
RUR.state.evaluating_onload = True
RUR.add_object('banane', 3, 2, {'number': 12, 'goal':True})
RUR.add_object('banane', 3, 2, {'number': 2, 'goal':True})
RUR.state.evaluating_onload = False

all_objects = dict(RUR.get_objects(3, 2))
assert all_objects == {'pomme': 6, 'banane': 2}

assert not RUR.get_objects(1, 1)

RUR.remove_object('pomme', 3, 2)
RUR.remove_object('pomme', 3, 2)
RUR.remove_object('pomme', 3, 2, {'goal': True, 'number': 2})

RUR.remove_object('banane', 3, 2, {'all': True})
RUR.remove_object('banane', 3, 2, {'all': True, 'goal': True})

assert dict(RUR.get_objects(3, 2)) == {'pomme': 4}

error = False
try:
    RUR.remove_object('pomme', 3, 2, {'number': 5})
except:
    error = True

assert error