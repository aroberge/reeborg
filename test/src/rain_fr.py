# solution to Rain 1, 2
pense(0)

def demi_tour():
    repete(tourne_a_gauche, 2)

def tourne_a_droite():
    repete(tourne_a_gauche, 3)

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
