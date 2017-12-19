// tokens 1 to 5

function ramasse_tout() { 
    while (objet_ici()) { 
        prend (); 
        avance (); 
    }
}

function depose_tout_et_avance () { 
    while (transporte()) { 
        depose (); 
    }
    avance (); 
}
    
while (!at_goal()) { 
    if (objet_ici()) { 
        ramasse_tout(); 
    }
    else if (transporte()) { 
        depose_tout_et_avance (); 
    }
    else {
        avance (); 
    }
}
