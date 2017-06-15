repeat 13 :
    avance()
    while 'banane' in objet_ici() :
        prend("banane")

while transporte('banane') > 0 :
    depose()