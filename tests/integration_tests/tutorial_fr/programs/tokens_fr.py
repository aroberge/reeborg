# jetons 1 to 5

def ramasse_tout():
    while objet_ici():
        prend()
        avance()

def deposte_tout_et_avance():
    while transporte():
        dépose()
    avance()
    
while not au_but():
    if objet_ici():
        ramasse_tout()
    elif transporte():
        deposte_tout_et_avance()
    else:
        avance()
