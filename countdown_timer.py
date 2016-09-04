import time
from sys import argv
script, endtime = argv

print(endtime)

# e.g. argv = "04 Sep 2016 17:00"
end_time = time.strptime(endtime, "%d %b %Y %H:%M")

def print_remaining_time(end_time):
	remaining_time = time.mktime(end_time) - time.time()

	m, s = divmod(remaining_time, 60)
	h, m = divmod(m, 60)

	print("%02d:%02d:%02d" % (h, m, s))

print_remaining_time(end_time)