def c_mul(a, b):
    print(hex(a*b), 0xFFFFFFFF, (a*b))
    return (a * b) & 0xFFFFFFFF


def __hash__(self):
    if not self:
        return 0 # empty
    value = ord(self[0]) << 7
    for char in self:
        value = c_mul(1000003, value) ^ ord(char)
    value = value ^ len(self)
    if value == -1:
        value = -2
    return value

print(__hash__('quentel'))