# To do

1. Write tutorial on advanced use of REPL. Discuss importing code
   in editor to simulate "python -i script"

2. Show example of automatic transformations.

3. Show example of adding extra capability with `install_extra()` and `extra_python_content()`.

4. Show example of writing custom goal tests; do for graphical world and
   "normal" Python code e.g. string methods.

5. Document use of `trace_frame_js.json` and `trace_frame_py.json`

6. Add "traditional" exercises - possibly strings as examples

7. Document `RUR.get_TYPE...`.

8. Ensure that "obstacles" are either solid or fatal, or both.

9. figure out how to combine insert frame and voice narration for people
   with visual challenges.

10. a) tutorial: learning oriented
    b) how-to guides: problem-oriented
    c) discussions: understanding oriented
    d) reference: information oriented

11. Document RUR.get_world

12. Explain how to work without an internet connection or if CORS problems
    arise - for world, but not extra images unfortunately.

13. Explore the possibility of adding `here()` which would return a tuple
    `(x, y)` in Python, and an array in Javascript.

14. World to create and document
```python
from random import randint
max_x = randint(5, 10)
max_y = randint(5, 10)
RUR.set_world_size(max_x, max_y)

think(100)
set_max_nb_instructions(2000)

positions = []
def new_position():
    while True:
        x = randint(1, max_x)
        y = randint(1, max_y)
        if (x, y) not in positions:
            positions.append((x, y))
            return x, y


RUR.new_robot_images({"model":10,
    "east": "/src/images/rat_e.png",
    "north": "/src/images/rat_n.png",
    "west": "/src/images/rat_w.png",
    "south": "/src/images/rat_s.png"
    })

x, y = new_position()

reeborg = UsedRobot(max_x, y)
reeborg.set_model(10)

RUR.add_new_thing({"name": "cheese",
    "url": "/src/images/fromage.png",
    "info": "Safe to eat.})

RUR.add_new_thing({"name": "poison",
    "url": "/src/images/poison.png",
    "fatal": "poison",
    "info": "Do not eat",
    "message": "Gluttony is a terrible thing.<br><img src='/src/images/mort.png'>"
})

nb_cheese = randint(5, 8)
for i in range(nb_cheese):
    x, y = new_position()
    RUR.add_object("cheese", x, y)

nb_poison = randint(3, 5)
for i in range(nb_poison):
    x, y = new_position()
    RUR.add_object("poison", x, y)

eat = take
def take():
    raise ReeborgError("I do not know how to do this.")


while not is_facing_north():
    turn_left()
while front_is_clear():
    move()
turn_left()
while front_is_clear():
    move()
turn_left()
turn_left()

def eat_row():
    while front_is_clear():
        if object_here():
            eat()
        move()
    if object_here():
        eat()

def go_back():
    turn_left()
    turn_left()
    while front_is_clear():
        move()
    turn_left()
    move()
    turn_left()

while right_is_clear():
    eat_row()
    go_back()
eat_row()

```