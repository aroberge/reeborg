# solution to Tokens 1, 2, 3, 4
pense(0)
while not objet_ici():
    avance()
assert objet_ici() == ['jeton']
assert objet_ici('jeton') == ['jeton']
prend()
avance()
depose()
while not au_but():
    avance()
