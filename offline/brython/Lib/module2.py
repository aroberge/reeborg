try:
    eval("x=1")
except SyntaxError as exc:
    print(exc.args)