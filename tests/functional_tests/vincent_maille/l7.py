passe = 0
while passe < 2 :
    # Peut-on aller à droite, si oui, on se tourne
    if not mur_a_droite() :
        repeat 3 :
            tourne_a_gauche()
    # On avance si on peut
    if not mur_devant() :
        avance()
    else :
        tourne_a_gauche()
    # On est arrivé ?
    if au_but() :
        passe = passe + 1
    # On ramasse le pissenlit
    while 'pissenlit' in objet_ici() :
        prend('pissenlit')
    # On ramasse le pissenlit
    while 'fraise' in objet_ici() :
        prend('fraise')