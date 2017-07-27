RUR.add_bridge("bridge", 2, 2)
assert RUR.get_bridge_protections(2, 2) == ['water', 'mud']
RUR.add_bridge("carrot", 2, 2)
assert RUR.get_bridge_protections(2, 2) == []
assert RUR.get_bridge(2, 2) == "carrot"
assert RUR.is_bridge("carrot", 2, 2)
assert RUR.get_bridge(1, 1) is None
RUR.remove_bridge("carrot", 2, 2)
assert RUR.get_bridge_protections(2, 2) == []
