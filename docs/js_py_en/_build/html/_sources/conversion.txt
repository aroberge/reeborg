Converting from Python to Javascript
====================================

Converting **simple** Python programs into equivalent Javascript programs
(or vice-versa) can often be done relatively easily.  Below are two
equivalent programs.  I have added extra vertical space to the Python version
so that it would line up better with the Javascript version.
     
.. list-table::

   * - .. code-block:: py3
     
            ''' Maze solution in Python:
                a simple program.       '''

            def mark_starting_point_and_move():
                put("token")
                while not front_is_clear():
                    turn_left()
                move()



            def follow_right_wall():
                if right_is_clear():
                    turn_right()
                    move()
                elif front_is_clear():
                    move()
                else:
                    turn_left()



            #  Program execution below

            while not at_goal():
                follow_right_wall()
                
     - .. code-block:: javascript
     
            /* Maze solution in Javascript:
               a simple program.            */

            function mark_starting_point_and_move() { 
                put("token");
                while (!front_is_clear()) {
                    turn_left();
                }
                move();
            }

            function follow_right_wall(){
                if (right_is_clear()){
                    turn_right();
                    move();
                } else if (front_is_clear()) {
                    move();
                    }
                else { 
                    turn_left();
                }

            // Program execution below

            while (!at_goal()){ 
                follow_right_wall();
            }

To convert such a simple program from Python to Javascript, one can follow the
following steps.  [Note that not all those steps mentioned below are applicable
in the sample program listed above.]

- Replace the keyword ``def`` by ``function``.
- Replace the colon ``:`` that indicates the beginning of a code block by ``{``.
- Add ``}`` at the end of a code block.
- Surround conditions/test in ``if`` and ``while`` statement by parentheses ``(...)``.
- Add semi-colons ``;`` at the end of each statement.
- Replace the keyword ``not`` by the symbol ``!``.
- Replace the keyword ``and`` by the symbols ``&&``.
- Replace the keyword ``or`` (not present above) by the symbols ``||``.
- Replace the keywords ``True`` and ``False``  by ``true`` and ``false``.
- Replace the keyword ``elif`` by ``else if``.
- Replace the single line comment symbol ``#`` by ``//``
- Replace triple quotes enclosing a multi-line comment ``''' ... '''`` by ``/* ... */``. 

.. topic:: What do you think?

   Which programming language is easier to read and would likely be a better choice
   for a first language to use in learning about programming?
