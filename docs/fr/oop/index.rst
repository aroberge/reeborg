La programmation orientée objet
===============================


Comme vous le savez, Reeborg est en bien mauvais état.
Il peut seulement tourner vers sa gauche; sa boussole est brisée,
elle lui permet seulement de déterminer s'il fait face au nord ou non.
Reeborg ne peut pas tourner sa tête vers sa gauche; il ne peut donc
pas détecter s'il y a un mur à sa gauche sans tourner entièrement
son corps.
Finalement, il a une fuite d'huile ce qui est très mauvais
pour l'environnement.

Utilisant la **Programmation Orientée Objet** (POO), vous allez
apprendre à réparer Reeborg et à lui donner des capacités
additionnelles.


.. toctree::
   :maxdepth: 2
   :numbered:

   oop
   methods
   dir
   turn_right
   arguments2
   turn_right2
   javascript
   modulo
   facing_south
   left_is_clear
   leak
   testing
   conclusion




.. admonition:: Pour les experts !

   Si vous connaissez déjà la programmation Python et vous utilisez
   le monde de Reeborg simplement pour vous amuser à utiliser ce que vous
   connaissez déjà, il peut arriver (très rarement je l'espère)
   que vous écriviez du code complètement
   valide mais dont le résultat ne soit pas conforme à vos attentes.
   La raison pour ceci est que le Monde de Reeborg a été écrit principalement
   en Javascript, avec une simple interface pour Python utilisant Brython.
   Le résultat est que certains objets, méthodes ou attributs Javascript
   ne sont pas disponibles directement.  De plus, les animations sont
   faites en clonant l'état du monde et en le sauvegardant dans le
   format JSON; si vous tentez de créer vos propres classes utilisant
   des objets déjà présents, il pourrait arriver que vous créiez des
   références circulaires qui vont résulter en des exceptions.

   En utilisant Brython, j'aurais pu écrire le logiciel entièrement en Python
   ... mais ceci n'aurait pas permis (du moins pas facilement) de pouvoir
   utiliser le site pour programmer Reeborg en utilisant
   Javascript ou CoffeeScript au lieu de Python, ce qui est possible
   présentement.