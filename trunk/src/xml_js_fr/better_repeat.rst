`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Un meilleur **répète()**
========================

*N.B. Cette leçon couvre des concepts très avancés. Si vous ne comprenez
pas tout, ceci ne devrait pas vous empêcher de continuer avec les autres
leçons.*

Vous avez vu comment on pouvait définir notre propre fonction
équivalente à ``répète()``, fonction qui permet d'éviter les répétitions
de lignes de code. Par exemple, si on veut simuler un virage à droite,
on peut écrire ``répète( tourne_à_gauche, 3)`` au lieu de répéter trois
fois la même instruction. Le problème avec cette approche en général est
que ceci n'améliore pas la lisibilité du code puisqu'on n'introduit pas
de noms descriptifs. Une meilleure approche que nous avons vu est
d'utiliser ``répète()`` mais de cacher ces répétitions à l'intérieur
d'une fonction:

.. code:: jscode

    function tourne_à_droite (){
        répète(tourne_à_gauche, 3);
    }

Cependant, on peut faire ceci d'une autre façon. Tout d'abord, revoyons
la définition de ``répète()``:

.. code:: jscode

    function répète (fn, n){
        for (var i = 0; i < n; i++) {
            fn();
        }
    }

Ensuite, rappelons-nous l'effet d'un énoncé ``return`` à l'intérieur
d'une fonction. Par exemple, si on a

.. code:: jscode

    function fonction_quelconque (){
        // quelques lignes de code
        return quelque_chose;
    }

    var a = fonction_quelconque();
    // "a" sera maintenant un synonyme de "quelque_chose"

Tout comme on peut avoir des fonctions comme arguments d'autres
fonctions, on peut *retourner* des fonctions!

.. code:: jscode

    function meilleur_répète (fn, n){
        return function () {
            for (var i = 0; i < n; i++){
                fn();
            }
        };
    }

    // on l'utilise pour définir un virage à droite
    var mon_virage_à_droite = meilleur_répète(tourne_à_gauche, 3);

    mon_virage_à_droite();  // et on l'utilise

Essayez-le!

Extension de cette idée
-----------------------

En plus d'utiliser cette approche pour des répétions, on peut l'utiliser
pour des conditions devant être vérifiées.

.. code:: jscode

    function faire_pendant(fn, condition) {
        return function() {
            while (condition()) {
                fn();
            }
        };
    }

    var marche_au_mur = faire_pendant(avance, rien_devant);
    marche_au_mur();

Vérifiez que ça fonctionne.

Lorsque vous aurez terminé, vous pourrez tenter de définir une fonction
``faire_si_non(fn, condition)`` où nous faisons quelque chose jusqu'à ce
qu'une condition ne soit **pas** satisfaite.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
