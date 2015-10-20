# solution to Newspaper 0
pense(0)

def demi_tour():
    repete(tourne_a_gauche, 2)

def tourne_a_droite():
    repete(tourne_a_gauche, 3)

def up():
    tourne_a_gauche()
    avance()
    tourne_a_droite()
    avance()
    avance()

def down():
    avance()
    avance()
    tourne_a_gauche()
    avance()
    tourne_a_droite()

prend()
repeat 3:
    up()
while objet_ici():
    prend()
depose("étoile")
demi_tour()
while not au_but():
    down()

