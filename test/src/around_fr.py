# General solution to worlds Around 1 to 4
pense(0)

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

depose()
while mur_devant():
    tourne_a_gauche()
avance()

while not objet_ici():
    suit_le_mur()
