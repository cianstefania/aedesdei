import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src).read(); i=s.index('</style>')+8
open(dst,'w').write('<!doctype html>\n<html lang="nl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'+s[:i]+'\n</head>\n<body>\n'+s[i:]+'\n</body>\n</html>\n')
