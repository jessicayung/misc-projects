"""
Countdown Timer

Prints the time remaining between the current local time 
and the given ending time in hours, minutes and seconds.
Input: Datetime (string) in format "%d %b %Y %H:%M", 
e.g. "04 Sep 2016 17:00"

Author: Jessica Yung, 04 Sept 2016
"""

import time
from sys import argv
script, endtime = argv

# e.g. argv = "04 Sep 2016 17:00"
end_time = time.strptime(endtime, "%d %b %Y %H:%M")

def print_remaining_time(end_time):
	"""Print time remaining from current time to end time 
	in %H:%M:%S format."""
	# End time in seconds
	end_time_s = time.mktime(end_time)
	# Differece between time now and end time
	remaining_time = end_time_s - time.time()

	# Format remaining time
	m, s = divmod(remaining_time, 60)
	h, m = divmod(m, 60)

	print("Time remaining: %02d:%02d:%02d" % (h, m, s))

print_remaining_time(end_time)
print("End time: %s" % endtime)
