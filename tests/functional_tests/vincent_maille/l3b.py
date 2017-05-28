for tour in range(20,1,-1) :
    if tour == 20 :
        long = 9
    else :
        long = tour // 2
    for i in range(long) :
       avance()
    tourne_a_gauche()