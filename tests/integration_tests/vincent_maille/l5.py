pense(0)

def cherche_coin() :
    while not mur_devant() :
        avance()
    tourne_a_gauche()
    while not mur_devant() :
        avance()

def avance_au_max() :
    while objet_ici() == ["saucisse"] :
        prend()
    while not mur_devant() :
        avance()
        while objet_ici() == ["saucisse"] :
            prend()

def ramasse_v1() :
    stop = 0
    while stop == 0 :
        avance_au_max()
        tourne_a_gauche()
        if not mur_devant() :
            avance()
            tourne_a_gauche()
            avance_au_max()
            repeat 3 :
                tourne_a_gauche()
            if not mur_devant() :
                avance()
                repeat 3 :
                    tourne_a_gauche()
            else :
                stop = 1
        else :
            stop == 1

def ramasse_v2() :
    stop = 0
    while stop >= 0 :
        avance_au_max()
        if stop % 2 == 0 :
            tourne_a_gauche()
        else :
            repeat 3 :
                tourne_a_gauche()
        if mur_devant() :
            stop = -1
        else :
            avance()
            if stop % 2 == 0 :
                tourne_a_gauche()
            else :
                repeat 3 :
                    tourne_a_gauche()
            stop = stop + 1

def ramasse() :
    stop = 0
    while stop >= 0 :
        avance_au_max()
        tourne = 2*(stop % 2)  +1
        for i in range(tourne) :
            tourne_a_gauche()
        if mur_devant() :
            stop = -1
        else :
            avance()
            for i in range(tourne) :
                tourne_a_gauche()
            stop = stop + 1

def trouve_panier() :
    while not au_but() :
        tourne_a_gauche()
        avance_au_max()

cherche_coin()
tourne_a_gauche()
ramasse()
trouve_panier()