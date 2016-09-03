fname = '__init__.py'
src = open(fname, 'rb').read()
print(src.count(b'\r\n'))
print(src.count(b'\n'))
src = src.replace(b'\n', b'\r\n')
out = open(fname, 'wb')
out.write(src)
out.close()
