`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Pas vrai!
=========

Reeborg est fâché. Il ne pleut **pas**; il ne neige **pas**; mais
Reeborg ne peut **pas** aller jouer dehors et s’entraîner pour la course
aux haies. Il doit attendre que vous appreniez la négation en
Javascript.

C'est le temps d'être négatif
-----------------------------

Javascript, comme plusieurs autres langages de programmation, utilise le
symbole ``!`` pour représenter la négation. Au lieu d'apparaître à la
fin d'une phrase, ce point d'exclamation apparaît avant un objet ayant
un sens booléen (vrai ou faux) et en reverse le sens. Ainsi ``!true``
veut dire ``false``, et ``!false`` signifie ``true``.

SVP, faites plaisir à Reeborg
-----------------------------

Vous avez déjà écrit un programme permettant à Reeborg de prendre part à
une course aux haies. Une partie de votre programme se lisait comme
suit:

.. code:: jscode

    function avance_et_saute_jusqu_au_but () {
        if ( au_but() ) {
            // instruction ...
        } else if ( rien_devant() ) {
            // instruction ...
        } else {
            // instruction ...
        }
    }

Vous pouvez rendre Reeborg heureux en écrivant trois versions
différentes de ce programme démontrant différents choix d'utilisation du
symbole de négation ``!`` ainsi que différentes combinaisons
``if/else``.

.. code:: jscode

    // premier choix:

    function avance_et_saute_jusqu_au_but () {
        if ( au_but() ){
            // instruction ...
        } else if ( !rien_devant() ){
            // instruction ...
        } else {
            // instruction ...
        }
    }

    // deuxième choix ... plus difficile

    function avance_et_saute_jusqu_au_but () {
        if ( !au_but() ){
            if ( rien_devant() ){
                // instruction ...
            } else {
                // instruction ...
            }
        } else {
            // instruction ...
        }
    }

    // troisième choix


    function avance_et_saute_jusqu_au_but () {
        if ( !au_but() ){
            if ( !rien_devant() ){
                // instruction ...
            } else {
                // instruction ...
            }
        } else {
            // instruction ...
        }
    }

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
