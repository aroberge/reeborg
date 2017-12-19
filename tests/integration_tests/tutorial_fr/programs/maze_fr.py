def tourne_a_droite():
    repeat 3:
        tourne_a_gauche()

def suit_le_mur():
    if rien_a_droite():
        tourne_a_droite()
        avance()
    elif rien_devant():
        avance()
    else:
        tourne_a_gauche()

while not au_but():
    suit_le_mur()
