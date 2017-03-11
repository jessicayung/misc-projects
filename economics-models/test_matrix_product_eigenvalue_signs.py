import math
import random


def read_matrix(matrix):
    a, b = matrix[0]
    c, d = matrix[1]
    a, b, c, d = float(a), float(b), float(c), float(d)
    print("Matrix: ", [a, b], [c, d])
    return a, b, c, d


def check_eigenvalues_positive(matrix):
    a, b, c, d = read_matrix(matrix)

    result = False

    if (a + d <= 0) or (a*d-b*c <= 0) or (((a + d)**2 - 4*(a*d-b*c)) < 0):
        pass
    else:
        # print("All conditions satisfied.")
        result = True

    return result

    """
    if a + d <= 0:
        # print("Condition 1 not satisfied.")
    elif a*d-b*c <= 0:
        # print("Condition 2 not satisfied.")
    elif ((a + d)**2 - 4*(a*d-b*c)) < 0:
        # print("Condition 3 not satisfied.")
    """


def check_eigenvalues_negative(matrix, print=False):
    a, b, c, d = read_matrix(matrix)

    result = False

    if a + d >= 0 or a*d-b*c <= 0 or ((a + d)**2 - 4*(a*d-b*c)) < 0:
        pass
    else:
        print("All conditions satisfied.")
        result = True

    return result

    """    
    if a + d >= 0:
        print("Condition 1 not satisfied.")
    elif a*d-b*c <= 0:
        print("Condition 2 not satisfied.")

    elif ((a + d)**2 - 4*(a*d-b*c)) < 0:
        print("Condition 3 not satisfied.")
    """


def eigenvalues(matrix):
    a, b, c, d = read_matrix(matrix)

    sqrted = math.sqrt((a + d)**2 - 4*(a*d-b*c))
    negb = a + d
    eigen1 = 0.5*(negb + sqrted)
    eigen2 = 0.5*(negb - sqrted)
    print("Eigenvalues: ", eigen1, eigen2)


def matrix_product(matrix1, matrix2):

    a, b, c, d = read_matrix(matrix1)
    e, f, g, h = read_matrix(matrix2)

    matrix3 = [[a*e+b*g, a*f+b*h], [c*e+d*g, c*f+d*h]]

    return matrix3


def generate_matrix():
    matrix = [[random.randint(-20,20) for i in range(2)]
              for i in range(2)]
    return matrix


def generate_pos_eigen_matrices(n):
        matrices = []
        for i in range(n):
            pos_eigen = False
            while pos_eigen is False:
                matrix = generate_matrix()
                if check_eigenvalues_positive(matrix) is True:
                    pos_eigen = True
                    print(matrix)
                    matrices.append(matrix)

        return matrices


def is_product_of_two_matrices_neg_eigen(matrices):
    no_of_neg_eigen_products = 0
    neg_eigen_products = []
    for i in matrices:
        for j in matrices:
            matrix = matrix_product(i, j)
            if check_eigenvalues_negative(matrix) is True:
                print("Pair: ", i, j)
                print("Product: ", matrix)
                neg_eigen_products.append(matrix)
                no_of_neg_eigen_products += 1
    print("Total number of products with negative eigenvalues: ", no_of_neg_eigen_products)


def is_product_of_three_matrices_neg_eigen(matrices):
    no_of_neg_eigen_products = 0
    neg_eigen_products = []
    for i in matrices:
        for j in matrices:
            for k in matrices:
                matrix = matrix_product(matrix_product(i, j), k)
                if check_eigenvalues_negative(matrix) is True:
                    print("Triple: ", i, j, k)
                    print("Product: ", matrix)
                    neg_eigen_products.append(matrix)
                    no_of_neg_eigen_products += 1
    print("Total number of products with negative eigenvalues: ", no_of_neg_eigen_products)

# Question 6a
is_product_of_two_matrices_neg_eigen(generate_pos_eigen_matrices(20))

# Question 6c
# is_product_of_three_matrices_neg_eigen(generate_pos_eigen_matrices(20))