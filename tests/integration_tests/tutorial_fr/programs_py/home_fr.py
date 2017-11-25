# Overkill - solution for Home 1 to 4

def droite():
    tourne_a_gauche()
    tourne_à_gauche()  # test accent
    tourne_a_gauche()

def suit_le_mur():
    if rien_a_droite():
        droite()
        avance()
    elif rien_devant():
        avance()
    else:
        tourne_a_gauche()

while not au_but():
    suit_le_mur()