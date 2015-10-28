# solution to Newspaper 1, 2
pense(0)

def tourne_a_droite():
    repeat 3:
        tourne_a_gauche()

def demi_tour():
    repeat 2:
        tourne_a_gauche()

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
while not objet_ici():
    up()
while objet_ici():
    prend()
depose("étoile")
demi_tour()
while not au_but():
    down()

