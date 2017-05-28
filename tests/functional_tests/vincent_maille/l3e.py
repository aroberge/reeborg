def avance_et_mange() :
    avance()
    while 'fromage' in objet_ici() :
        prend('fromage')

for tour in range(20,1,-1) :
    long = tour // 2 - tour // 20
    for i in range(long) :
        avance_et_mange()
    tourne_a_gauche()