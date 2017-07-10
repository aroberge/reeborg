In my experience in teaching Mathematics and Physics, I have noticed that different examples or problems that I see as testing a single common concept are often seen by students as completely independent one of another, leading them initially to try to memorize a different solution to each, rather than understanding the underlying concept. Often, it will not be until the students have done many superficially different problems by themselves that they will finally understand the underlying concept.  As is the case in Physics and Mathematics, I believe that the same is likely true when teaching programming, and that students can benefit from seeing the same concept illustrated in seemingly very different looking programming assignments.

## Young beginners

While I have no direct experience of teaching young students, the positive feedback I have heard is that Reeborg's World is quite suitable for them to learn the basics of programming.  However, I gather that some students may get bored as each programming task resembles the others.  Looking at other sites aiming to teach young children, I noticed that they most often incorporate colourful images and very nice graphics, much nicer than what is included by default with Reeborg's World.

The methods described in this documentation are intended to address this issue and offer some potential solutions, to make the learning environment even more appealing to young learners.

Check by yourself:

    World("worlds/examples/boring_path.json")

![boring][boring]

[boring]: ../../src/images/boring_path.png

can be solved by

```python
def turn_right():
    turn_left()
    turn_left()
    turn_left()

while not at_goal():
    if front_is_clear():
        move()
    elif right_is_clear():
        turn_right()
    else:
        turn_left()
```

But so can

    World("worlds/examples/nice_path.json")

which has the exact same path available, but has a completely different
and much more interesting appearance.

![nice][nice]

[nice]: ../../src/images/nice_path.png



## Not so young beginners

Let's face it: older teenagers and young adults may not like to be treated as young children, but they too enjoy environments with better graphics than bland looking ones. Furthermore, they can appreciate an environment such as Reeborg's World that uses a real programming language (Python, or Javascript) and can present them with challenging (but doable) programming tasks with nice visual feedback.

## More advanced students

Often, programming environments such as Reeborg's World are used to teach beginners, but then abandoned as more advanced concepts are taught, often in a more abstract way. To me, that is a mistake. Once the students have become familiar with a programming environment, especially one that can give visual feedback, it only make sense to revisit this environment to illustrate programming concepts. Beyond simple control flow (`if/else, while, for,` etc.), Reeborg's World can be used to assign problems exploring Object Oriented Programming, including inheritance and composition, data structures (lists/arrays and dict/hash tables in particular), and can even be used to look at various search algorithms (depth-first _vs_ breadth first, A*, etc.).


## Main tutorial guide

See {@tutorial how}.