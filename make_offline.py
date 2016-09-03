'''Creates a modified version of Reeborg that makes use of scripts found in the
   repository instead of online. This version can be used without internet access.
'''

with open('reeborg.html', 'r') as f:
    lines = f.readlines()

with open('reeborg_offline.html', 'w') as f:
    for line in lines:
        line = line.replace("<!--online-->", "<!--online")
        line = line.replace("<!--/online-->", "/online-->")
        line = line.replace("<!--offline", "<!--offline-->")
        line = line.replace("/offline-->", "<!--/offline-->")
        f.write(line)

print("offline version recreated.")