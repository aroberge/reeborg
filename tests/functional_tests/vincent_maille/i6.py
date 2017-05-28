def traverse() :
    repeat 13 :
        avance()
    repeat 2 :
        tourne_a_gauche()


while objet_ici() != [] :
    p = 0
    while objet_ici() != [] and p+pese() < 100 :
        p = p + pese()
        prend('sac')
    traverse()
    while transporte('sac') > 0 :
        depose('sac')
    traverse()