# Define economy parameters
L_cfs = [0, 10, 1]
C_cfs = [10,0.8] # C_cfs[1] = mpc
CA_cfs = [0, 1, 1]
I_cfs = [100, 10]
I_exog = 100
G_exog = 0
T_exog = 0
M_exog = 1
P_df = 1
Pstar_df = 1
istar_df = 0 # dodgy
exp_e_df = 0 # dodgy
pi_e_df = 0
short_run = True

def C(Y, T=T_exog, cfs=C_cfs):
    C = cfs[0] + cfs[1]*(Y-T)
    return C


def C_inv(C, T=T_exog, cfs=C_cfs):
    Y = (C - cfs[0] + T*cfs[1]) / cfs[1]
    return Y


def I_(r, cfs=I_cfs):
    I = cfs[0] - cfs[1]*r
    return I


def I_inv(I, cfs=I_cfs):
    r = (cfs[0] - I) / cfs[1]
    return r


def CA(e, Y, P = P_df, Pstar=Pstar_df, T=T_exog, cfs=CA_cfs):
    real_e = e*Pstar / P
    CA = cfs[0] + cfs[1]*real_e + cfs[2]*(Y-T)
    return CA


def IS(r_or_Y, return_r=0, T=T_exog, G=G_exog):
    if return_r == 0:
        r = r_or_Y
        Y = 1/(1 - C_cfs[1]) * ((C_cfs[0] - C_cfs[1]*T) + I_(r) + G)
        return Y
    else:
        Y = r_or_Y
        I = Y - C(Y, T=T) + G
        r = I_inv(I)
        return r


def L(i, Y, cfs=L_cfs):
    """Returns L."""
    L = cfs[0] - cfs[1]*i + cfs[2]*Y
    return L


def L_inv(L, i_or_Y, return_i=0, cfs=L_cfs):
    """Returns i or Y."""
    if return_i == 0:
        i = i_or_Y
        Y = (L - cfs[0] + cfs[1]*i)/cfs[2]
        return Y
    else:
        Y = i_or_Y
        i = (L - cfs[0] - cfs[2]*Y) / cfs[1]
        return i


def LM(i_or_Y, return_i=0, P=P_df, M=M_exog):
    """Returns i or Y."""
    L = M / P
    return L_inv(L, i_or_Y, return_i=return_i)

def fisher(i_or_r, pi_e, return_i=0):
    if return_i == 0:
        i = i_or_r
        r = i - pi_e
        return r
    else:
        r = i_or_r
        i = r + pi_e
        return i


def LM_real(r_or_Y, pi_e=pi_e_df, return_r=0, P=P_df, M=M_exog):
    if return_r == 0:
        r = r_or_Y
        i = fisher(r, pi_e=pi_e, return_i=1)
        return LM(i, return_i=0, P=P, M=M)
    else:
        Y = r_or_Y
        i = LM(Y, return_i=1, P=P, M=M)
        r = fisher(i, pi_e=pi_e, return_i=0)
        return r


def IS_LM_eqm():
    r = 0
    diff = LM(r) - IS(r)
    while abs(diff) > 1:
        if diff > 0:
            # r is too high
            if diff > 5:
                r -= 0.1
            else:
                r -= 0.01
        elif diff < 0:
            abs_diff = abs(diff)
            if abs_diff > 5:
                r += 0.1
            else:
                r += 0.01
        diff = LM(r) - IS(r)
        print("Diff: ", diff)
    Y = LM(r)
    print("Eqm r: ", round(r, 4), "Eqm Y: ", round(Y, 4), "Diff: ", round(diff, 4))
    return [r, Y]

def DD(Y, e, P=P_df, Pstar=Pstar_df, I=I_exog, G=G_exog, T=T_exog):
    Y = C(Y, T) + I + G + CA(e, Y, P=P, Pstar=Pstar, T=T_exog)
    return Y

def UIP(e, istar=istar_df, exp_e=exp_e_df, short_run=short_run):
    if short_run == True:
        return istar
    else:
        i = istar + (exp_e - e) / e
        return i

def UIP_inv(i, istar=istar_df, exp_e=exp_e_df):
    e = exp_e / (i - istar + 1)
    return e

def AA(e_or_Y, exp_e=exp_e_df, P=P_df, istar=istar_df, return_e=0, M=M_exog):
    """Returns e or Y."""
    L = M / P
    if return_e == 0:
        i = UIP(e_or_Y, istar, exp_e)
        Y = L_inv(L, i, return_i=0)
        return Y
    else:
        # Return e
        Y = e_or_Y
        i = L_inv(L, Y, return_i=1)
        e = UIP_inv(i, istar, exp_e)
        return e

def DD_AA_eqm():
    """Returns [e,Y]."""
    pass