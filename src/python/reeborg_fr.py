"""Ce module contient les commandes qui peuvent être incluse dans
un programme du Monde de Reeborg.
"""

# When generating documentation using sphinx, these modules are both
# unavailable and not needed
try:
    from browser import window
    RUR = window.RUR
except:
    import sys
    print("\n --> Skipping importing from browser for sphinx.\n")

# The following is the only language specific function; it can be used in
# monde.html **only**, and not when imported from world.html or others
try:
    confirmer = RUR.confirmer
except:
    pass

## ==== actions


def avance():
    """Avance d'une case"""
    RUR._move_()


def tourne_a_gauche():
    """Reeborg tourne à sa gauche."""
    RUR._turn_left_()


def depose(obj=None):
    """Dépose un objet.  Si Reeborg transporte plus d'un type d'objet,
       on doit spécifier lequel sinon ceci causera une exception."""
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)


def prend(obj=None):
    """Prend un objet.  Si plus d'un type d'objet se trouve à l'endroit où
       Reeborg est, on doit spécifier lequel sinon ceci causera une exception."""
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def construit_un_mur():
    """Indique à Reeborg de construire un mur devant sa position."""
    RUR._build_wall_()

## ==== information about the world


def au_but():
    """Indique si Reeborg a atteint la position demandée.

    Returns:
        True si Reeborg a atteint son but.
    """
    return RUR._at_goal_()


def rien_devant():
    """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.) bloque le chemin.

    Returns:
       True si le chemin est non bloqué, False autrement."""
    return RUR._front_is_clear_()


def mur_devant():
    """Indique si un mur bloque le chemin.

    Returns:
       True si un mur est devant, False autrement."""
    return RUR._wall_in_front_()


def rien_a_droite():
    """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
       se trouve à la droite immédiate de Reeborg.

    Returns:
       True si un obstacle est à la droite, False autrement."""
    return RUR._right_is_clear_()


def mur_a_droite():
    """Indique si un mur se trouve immédiatement à la droite de Reeborg.

    Returns:
       True si un mur est à la droite, False autrement."""
    return RUR._wall_on_right_()


def est_face_au_nord():
    """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
    return RUR._is_facing_north_()


def face_au_nord():
    # obsolete
    raise ReeborgError("face_au_nord() est désuet; utilisez est_face_au_nord()")


def nombre_d_instructions(nb):
    RUR._set_max_steps_(nb)


def nombre_de_robots(nb):
    RUR._set_max_nb_robots_(nb)


def dir_js(obj):
    """Liste les attributs et méthodes d'un objet Javascript."""
    RUR.inspect(obj)  # defined in rur_utils.js


def voir_source_js(fn):
    """Affiche le code source d'une fonction Javascript."""
    RUR.view_source(obj)  # defined in rur_utils.js


def termine():
    """Termine l'exécution d'un programme."""
    RUR.control.done()


def son(bool):
    """Active ou désactive les effets sonores."""
    RUR.control.sound(bool)


def pense(ms):
    """Fixe un délai entre les actions de Reeborg à l'écran."""
    RUR.control.think(ms)


def pause(ms=None):
    """Pause l'éxecution du programme à l'écran.

       Si un argument (temps, en millisecondes) est fourni, l'exécution
       redémarre automatiquement après que ce temps ait été écoulé.
    """
    if ms is None:
        RUR.control.pause()
    else:
        RUR.control.pause(ms)


def Monde(url, shortname=None):
    if shortname is None:
        RUR.file_io.load_world_from_program(url)
    else:
        RUR.file_io.load_world_from_program(url, shortname)


def narration(html):
    RUR.control.narration(html)


def clear_print():
    RUR.control.clear_print()


def couleur_de_trace(couleur):
    RUR._set_trace_color_(couleur)


def style_de_trace(style):
    RUR.vis_robot.set_trace_style(style)  # add argument translation


def MenuPersonalisé(contenu):
    RUR.custom_menu.make(contenu)


def disparait():
    RUR.world.remove_robots()


def pas_de_surlignement():
    RUR.ui.user_no_highlight()


def enregistrement(bool):
    RUR._recording_(bool)


def nouvelles_images_de_robot(images):
    if "est" in images:
        images["east"] = images["est"]
    if "ouest" in images:
        images["west"] = images["ouest"]
    if "nord" in images:
        images["north"] = images["nord"]
    if "sud" in images:
        images["south"] = images["sud"]
    RUR.vis_robot.new_robot_images(images)


def objet_ici(obj=None):
    """ Indique si un ou des types d'objets se trouvent à la position du robot.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        une liste d'objets retrouvés.  Si aucun objet n'est présent
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est une liste vide.

    Exemples possibles:

        >>> objet_ici()
        ["jeton", "pomme"]
        >>> objet_ici("jeton")
        ["jeton"]
        >>> objet_ici("fraise")
        []
    """
    if obj is not None:
        ans = RUR._object_here_(obj)
    else:
        ans = RUR._object_here_()
    return list(ans)  # convert from Javascript list-like object to proper Python list


def transporte(obj=None):
    """ Indique si Reeborg transporte un ou des objets.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        une liste d'objets retrouvés.  Si Reeborg ne transporte aucun objet,
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est une liste vide.

    Exemples possibles:

        >>> transporte()
        ["jeton", "pomme"]
        >>> transporte("jeton")
        ["jeton"]
        >>> transporte("fraise")
        []
    """
    if obj is not None:
        ans = RUR._carries_object_(obj)
    else:
        ans = RUR._carries_object_()
    return list(ans)


class RobotUsage(object):
    """Créé un robot usagé.

       Args:
           x: coordonnée horizontale; un entier supérieur ou égal à 1
           y: coordonnée vertical; un entier supérieur ou égal à 1
           orientation: une des valeurs suivante: "nord", "sud", "est", "ouest"
           jeton: nombre initial de jetons à donner au robot;
                  un entier supérieur ou égal à 1,
                  ou la valeur "inf" pour un nombre infini.
        """
    def __init__(self, x=1, y=1, orientation='est', jetons=None):
        if jetons is None:
            robot = RUR.robot.create_robot(x, y, orientation)
        else:
            robot = RUR.robot.create_robot(x, y, orientation, jetons)
        self.body = robot
        RUR.world.add_robot(self.body)

    def avance(self):
        """avance d'une case"""
        RUR.control.move(self.body)

    def tourne_a_gauche(self):
        RUR.control.turn_left(self.body)

    def depose(self, obj=None):
        """Dépose un objet.  Si Reeborg transporte plus d'un type d'objet,
           on doit spécifier lequel sinon ceci causera une exception."""
        if obj is None:
            RUR._put_()
        else:
            RUR._put_(obj)

    def prend(self, obj=None):
        """Prend un objet.  Si plus d'un type d'objet se trouve à l'endroit où
           Reeborg est, on doit spécifier lequel sinon ceci causera une exception."""
        if obj is None:
            RUR._take_()
        else:
            RUR._take_(obj)

    def construit_un_mur(self):
        """Indique à Reeborg de construire un mur devant sa position."""
        RUR.control.build_wall(self.body)

    def au_but(self):
        """Indique si Reeborg a atteint la position demandée.

        Returns:
            True si Reeborg a atteint son but.
        """
        return RUR.control.at_goal(self.body)

    def rien_devant(self):
        """Indique si un obstacle (mur, clôture, eau, mur de brique, ) bloque
           le chemin.

        Returns:
           True si le chemin est non bloqué, False autrement."""
        return RUR.control.front_is_clear(self.body)

    def mur_devant(self):
        """Indique si un mur bloque le chemin.

        Returns:
           True si un mur est devant, False autrement."""
        return RUR.control.wall_in_front(self.body)

    def rien_a_droite(self):
        """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
           se trouve à la droite immédiate de Reeborg.

        Returns:
           True si un obstacle est à la droite, False autrement."""
        return RUR.control.right_is_clear(self.body)

    def mur_a_droite(self):
        """Indique si un mur se trouve immédiatement à la droite de Reeborg.

        Returns:
           True si un mur est à la droite, False autrement."""
        return RUR.control.wall_on_right(self.body)

    def est_face_au_nord(self):
        """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
        return RUR.control.is_facing_north(self.body)

    def face_au_nord(self):
        # obsolete
        raise ReeborgError("face_au_nord() est désuet; utilisez est_face_au_nord()")

    def objet_ici(self, obj=None):
        """ Indique si un ou des types d'objets se trouvent à la position du robot.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            une liste d'objets retrouvés.  Si aucun objet n'est présent
            ou si un objet spécifié comme paramètre n'est pas présent,
            le résultat est une liste vide.

        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.objet_ici()
            ["jeton", "pomme"]
            >>> reeborg.objet_ici("jeton")
            ["jeton"]
            >>> reeborg.objet_ici("fraise")
            []
        """
        if obj is not None:
            return list(RUR.control.object_here(self.body, obj))
        else:
            return list(RUR.control.object_here(self.body))

    def transporte(self, obj=None):
        """ Indique si Reeborg transporte un ou des objets.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            une liste d'objets retrouvés.  Si Reeborg ne transporte aucun objet,
            ou si un objet spécifié comme paramètre n'est pas présent,
            le résultat est une liste vide.

        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.transporte()
            ["jeton", "pomme"]
            >>> reeborg.transporte("jeton")
            ["jeton"]
            >>> reeborg.transporte("fraise")
            []
        """
        if obj is not None:
            return list(RUR.control.carries_object(self.body, obj))
        else:
            return list(RUR.control.carries_object(self.body))

    def modèle(self, model):
        RUR.control.set_model(self.body, model)

    def couleur_de_trace(self, color):
        RUR.control.set_trace_color(self.body, color)

    def style_de_trace(self, style):
        RUR.control.set_trace_style(self.body, style)


class ReeborgError(Exception):
    """Exceptions spécifique au monde de Reeborg.

       Exemples possible::

            def termine():
                message = "Vous ne devez pas utiliser termine() pour cette tâche."
                raise ReeborgError(message)

            #---- ou ------

            try:
                avance()
            except ReeborgError:   # ignore le mur qui bloquait le chemin
                tourne_a_gauche()
    """

    def __init__(self, valeur):
        self.reeborg_shouts = valeur

    def __str__(self):
        return repr(self.reeborg_shouts)
try:
    window['ReeborgError'] = ReeborgError
except:
    pass


class InfoSatellite():

    @property
    def carte_du_monde(self):
        """retourne un dict qui contient l'information au
           sujet du monde.
        """
        import json
        return json.loads(RUR.control.get_world_map())

    def imprime_carte(self):
        """imprime une copie formattée de la carte"""
        print(RUR.control.get_world_map())
