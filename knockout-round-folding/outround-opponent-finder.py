import pandas as pd

# Read in list of breaking teams (in order of breaking)
# EDIT file path only if you are using a file formatted in the same way
# EDIT script if you are using a differently formatted input file

file_path = "wudc-2017-open-break.csv"
name = 'T'
breaking_teams = pd.read_csv(file_path, names=name)
breaking_teams_list = [
    breaking_teams.loc[i][name]
    for i in range(len(breaking_teams))
]

# Parameters
total_teams = 48

def calculate_outround_mods(team_break_position):
    """Calculate mods of teams a given team could face per outround
    given said team's breaking position. See 'Reasoning' in the Appendix.
    """
    break_position_mod_16 = team_break_position % 16
    pdo_mods = sorted([break_position_mod_16, (break_position_mod_16 * -1 + 1) % 16])
    quarter_mods = sorted([pdo_mods[0] % 8, pdo_mods[1] % 8])
    semi_mods = sorted([pdo_mods[0] % 4, pdo_mods[1] % 4])
    return pdo_mods, quarter_mods, semi_mods

def outround_team_indices(round_mod_list, mod):
    """Return opponents' zero-indexed break positions given a round
    mod list and a round mod.
    """
    return sorted([
        round_mod_list[j] + mod * i
        for i in range(total_teams // mod)
        for j in range(2)
    ])

def octo_team_indices(octo_mod_list):
    """Return octofinal opponents' zero-indexed break positions."""
    return outround_team_indices(octo_mod_list, 16)

def quarter_team_indices(quarter_mod_list):
    """Return quarterfinal opponents' zero-indexed break positions."""
    return outround_team_indices(quarter_mod_list, 8)

def semi_team_indices(semi_mod_list):
    """Return semifinal opponents' zero-indexed break positions."""
    return outround_team_indices(semi_mod_list, 4)
    
def pdo_from_octo(octo_indices):
    """Return PDO opponents' zero-indexed break positions from octo
    opponents' zero-indexed break positions."""
    if octo_indices[0] == 0:
        return octo_indices[0] + octo_indices[3:]
    else:
        return octo_indices[2:]

def lookup_team_names(team_indices):
    """Return team names given their zero-indexed break positions."""
    return [
        breaking_teams_list[i-1]
        for i in team_indices
    ]

def outround_opponents_full(team_break_position):
    """Print opponents team could face in all outrounds."""
    print("Team: ", breaking_teams_list[team_break_position-1])
    print("Break position: ", team_break_position)
    octo_mods, quarter_mods, semi_mods = calculate_outround_mods(team_break_position)
    octo_indices = octo_team_indices(octo_mods)
    if team_break_position > 16:
        print("\nPDO opponents: ", lookup_team_names(pdo_from_octo(octo_indices)))
    print("\nOcto opponents: ", lookup_team_names(octo_indices))
    print("\nQuarter opponents: ", lookup_team_names(quarter_team_indices(quarter_mods)))
    print("\nSemi opponents: ", lookup_team_names(semi_team_indices(semi_mods)))
    print("\nFinal teams: ", breaking_teams_list)
    print("\n")

# Function to alidate user input
def inputNumber(message):
    """ Validate user input."""
    while True:
        try:
            userInput = int(input(message)) 
        except ValueError:
            print("Not an integer! Try again.")
            continue
        if userInput > 48 or userInput < 1:
            print("Your breaking position must be between 1 and 48 inclusive. Try again.")
            continue
        else:
            return userInput 
            break 

# Obtain break position from user and return potential opponents per round

stop = False

while stop == False:
    # Take input from user and validate it
    break_position = inputNumber("Team Break Position:")
    outround_opponents_full(break_position)