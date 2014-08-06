`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Livraison de journaux
=====================

Reeborg a un emploi: il livre le journal *l'Étoile du nord*. Plusieurs
des clients de Reeborg ne vivent pas au rez-de-chaussée de leur édifice.
Pour ceux-ci, Reeborg doit suivre la procédure suivante:

#. Prendre une seule copie du journal (ce serait trop lourd de les
   transporter tous à la fois).
#. Grimper le nombre d'étages requis pour rejoindre la porte du client..
#. Prendre la monnaie (jetons) laissée par les clients.
#. Laisser une copie du journal, appelé plus simplement l'*étoile* sur
   le seuil de porte.
#. Redescendre au rez-de-chaussée.

Bien que Reeborg ait plusieurs clients, j'en ai seulement inclus deux
pour votre attention:

-  La gentille Ada Lovelace, qui vit au troisième étage de son édifice,
   et qui laisse toujours quelques pièces de monnaie de plus comme
   cadeau pour Reeborg; Journal 1.
-  Le vieux grognon Charles Babbage, qui vit au cinquième étage et qui
   paie toujours le montant exact, sans laisser de pourboire pour
   Reeborg; Journal 2

Utilisant les instructions

.. code:: jscode

    prend("étoile")   // préparer pour transporter
    dépose("étoile")  // 

faites en sorte que Reeborg fasse au moins une livraison au client de
votre choix. Assurez-vous d'écrire les deux instructions ci-dessus
**exactement** de la façon dont elles apparaissent; en particulier, le
mot *étoile* doit être écrit avec un accent aigu sur le e.

Il peut vous sembler impossible d'écrire un seul programme qui ferait la
livraison correctement aux deux clients ... mais vous verrez un peu plus
tard comment on peut le faire.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
