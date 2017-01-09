#!/usr/bin/env python3

# ######################################################################

from matplotlib import rc
import matplotlib.pyplot as plt
import numpy as np

# ######################################################################

# Inner and outer radius of the colored donuts.
r_in = 0.12
r_out = 0.15

# Padding between donut and arrow.
dr = 0.01

# Border thickness around donuts and arrows.
line_width = 2

# Type names and corresponding colors. Order matters -- they are laid
# out clockwise from the top. In order to try to get the colors to look
# nice together, the sum of the color channels is uniform.
names_colors = (
    ('Heart', '#ff4444'),
    ('Fire', '#ff8800'),
    ('Lightning', '#bbbb00'),
    ('Plant', '#44ff44'),
    ('Wind', '#00bbbb'),
    ('Water', '#4444ff'),
    ('Shadow', '#8800ff'),
    ('Rock', '#888888'),
)

# ######################################################################

def main():
    # Set up the figure. White background, LaTeX font. Return the Axes.
    ax = get_ax()

    draw_circles(ax)

    cycle(ax, 'Fire', 'Plant', 'Water')
    cycle(ax, 'Lightning', 'Water', 'Rock')
    cycle(ax, 'Fire', 'Shadow', 'Wind')
    cycle(ax, 'Wind', 'Heart', 'Lightning')
    cycle(ax, 'Shadow', 'Plant', 'Rock', 'Heart')

#    plt.savefig('type_graph.png', transparent=True)

    return plt.show()

# ######################################################################

def get_ax(size=8):
    rc( 'font', **{ 'family':'sans-serif', 'sans-serif':['Helvetica'], 'size':'14' } )
    rc('text', usetex=True)
    rc('text.latex', preamble='\\usepackage{amsmath}, \\usepackage{amssymb}, \\usepackage{color}')
    fig = plt.figure( figsize=(size, size), facecolor='w')
    # Remove padding around plot.
    plt.subplots_adjust(bottom=0., left=0., right=1., top=1.)
    # No axis frames.
    plt.axes(frameon=False)
    # Set the axis limits.
    ax = fig.gca()
    ax.set_xlim( [-1, 1] )
    ax.set_ylim( [-1, 1] )
    # No ticks.
    ax.set_xticks( [] )
    ax.set_yticks( [] )
    return ax

# ======================================================================

def draw_circles(ax):
    global names_colors
    for i, (name, color) in enumerate(names_colors):
        add_circle(ax, name, loc(i), color)
    return

# ----------------------------------------------------------------------

def add_circle(ax, name, location, color):
    global r_in, r_out, line_width
    c_out = plt.Circle(location, r_out, ec='k', fc=color, lw=line_width)
    c_in = plt.Circle(location, r_in, ec='k', fc='w', lw=line_width)
    ax.add_artist(c_out)
    ax.add_artist(c_in)
    x, y = location
    return ax.text(x, y, tex(name), verticalalignment='center', horizontalalignment='center')

# ======================================================================

def loc(i):
    r = 1 - r_out
    q = 2*np.pi*(i + 0.5)/8.
    return np.array( [ r*np.sin(q), r*np.cos(q) ] )

# ======================================================================

def cycle(ax, *args):
    rgsa = args[1:] + args[:1]
    return [ beats(ax, a, r) for a, r in zip(args, rgsa) ]

# ----------------------------------------------------------------------

def beats(ax, water, fire):
    global r_in, r_out, dr, names_colors
    for i, (name, color) in enumerate(names_colors):
        if name == water:
#            i_water = i
            loc_water = loc(i)
            color_water = color
        if name == fire:
#            i_fire = i
            loc_fire = loc(i)

#    di = (i_water - i_fire) % 8
#    di = min(di, 8 - di)
#    print(water, fire, di)

    # We don't want to start the arrow at the center of the circle --
    # it'll overwrite the text! Let's start at the edge of the outer
    # circle.
    dxy = loc_fire - loc_water
    udxy = dxy / np.sqrt( np.dot(dxy, dxy) )
    new_loc_fire = loc_fire - udxy*(r_out + dr)
    new_loc_water = loc_water + udxy*(r_out + dr)
    return ax.annotate(
        "",
        xy=new_loc_fire,
        xytext=new_loc_water,
        arrowprops=dict(
            connectionstyle='arc3',
            ec='k',
            fc=color_water,
            lw=line_width,
            width=7,
        ),
    )

# ######################################################################

def notex(x):
    """Format a chunk of text to be non-math LaTeX."""
    if '\n' in x:
        # If there are multiple lines, handle each individually.
        return ' $ \n $ '.join( notex(y) for y in x.split('\n') )
    else:
        return '\\operatorname{' + x.replace(' ', '\\;') + '}'

# ----------------------------------------------------------------------

def tex(x):
    """Split a string into math and non-math chunks, by dollar signs."""
    nomath = x.split('$')[::2]
    ret = [None]*( len( x.split('$') ) )
    ret[1::2] = x.split('$')[1::2]
    ret[::2] = [ notex(n) for n in nomath ]
    return ' $ ' + ''.join(ret) + ' $ '

# ######################################################################

if __name__ == '__main__':
    main()
