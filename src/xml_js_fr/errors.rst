`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Composer avec les eRReuRs
=========================

Changez l'instruction ``avance();`` à ``Avance();`` (avec un A
majuscule) et tentez d'exécuter le programme à nouveau.

Cliquez sur {execute\_button} et prenez note de ce qui arrive.

Qu'est-il arrivé?
-----------------

Tout d'abord, je note que le message d'erreur *'Avance' is not defined*,
qui signifie *'Avance' n'est pas défini*, est en anglais. Ceci est
malheureusement incontournable...

Javascript, le langage que Reeborg comprend, est "sensible à la casse";
c'est-à-dire que les lettres majuscules et les lettre minuscules ont des
sens différents. Corrigez-donc le programme pour que Reeborg soit en
mesure de le comprendre et vérifiez que cela est bien le cas.

Lorsque vous aurez exécuter le programme à nouveau, les indications
d'erreurs seront effacées. Assurez-vous que ceci soit bel et bien le
cas.

Maintenant, effacez le point-virgule ``;`` qui apparaît à la fin de
l'instruction ``avance();`` et exécutez le programme à nouveau. Reeborg
se plaindra de l'absence du point-virgule mais exécutera néanmoins
correctement le programme. Cependant, les points-virgules qui manque
peuvent parfois causer des erreurs de compréhension de la part de
Reeborg; assurez-vous donc de reconnaître le message d'erreur puis
d'inclure les points-virgules lorsque Reeborg se plaint, peu importe
qu'il exécute le programme correctement ou non.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
