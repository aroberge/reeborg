# solution to Rain 1, 2
pense(0)

def demi_tour():
    repeat 2:
        tourne_a_gauche()

def tourne_a_droite():
    repeat 3:
        tourne_a_gauche()

def identifie_fenetre():
    assert not mur_a_droite()
    avance()
    if rien_a_droite():
        demi_tour()
        avance()
        tourne_a_gauche()
        avance()
    else:
        demi_tour()
        avance()
        tourne_a_gauche()
        construit_un_mur()
        tourne_a_gauche()
        avance()

while not au_but():
    avance()
tourne_a_droite()
avance()
while not au_but():
    if mur_devant():
        tourne_a_gauche()
    elif mur_a_droite():
        avance()
    else:
        identifie_fenetre()
