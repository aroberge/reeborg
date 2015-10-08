# General solution to hurdle worlds
pense(0)

def tourne_a_droite():
    repete(tourne_a_gauche, 3)

def follow_right_wall():
    if rien_a_droite():
        tourne_a_droite()
        avance()
    # let's use two equivalent tests
    elif rien_devant() and not mur_devant():
        avance()
    else:
        tourne_a_gauche()

while not au_but():
    follow_right_wall()
