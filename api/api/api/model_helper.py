import numpy as np
import scipy.optimize


class CoronavirusTransmissionModel:
    '''
    b: Tiempo de exposición
    h: Paso de integración
          N_ind: Num. de individuos
    cte: Constante actualizable
    r: Constante actualizable
    AER: Constante relacionada con la ventilación
    k: Tasa de deposición
    '''

    def __init__(self, b=2 / 24, N_ind=25, cte=0.4, r=0.037, h=1 / 200, k=0.24, lmda=0.63,
                 AER=0.2, V=150, ER_q=110):
        self.b = b
        self.N_ind = N_ind
        self.cte = cte
        self.r = r
        self.h = h
        self.k = k
        self.lmda = lmda
        self.AER = AER
        self.eta = [1 - 1 / (5 * self.N_ind), 1 / (5 * self.N_ind), 0]
        self.N = int(b // h)
        self.V = V
        self.ER_q = ER_q

    def f(self, x, y):
        def beta(x): return 0.180 * ((1 + self.cte) /
                                     2 - (1 - self.cte) / 2 * np.tanh(3 * (x - 1)))

        return np.array([-beta(x) * y[0] * y[1], beta(x) * y[0] * y[1] - self.r * y[1],
                         self.r * y[1]])

    def predict(self, CO2, k_0=2):
        a = 0
        x_final, y_final, I_max, I1, I2 = self.modelo1(a)
        IVRR = self.k + self.AER + self.lmda
        ER_q = self.ER_q
        # Ante períodos largos de exposición y número elevado de individuos
        # (restaurantes,escuelas) es conveniente suponer ER_q alto
        # (>100 q/h, emisión elevada)
        # V en m^3
        # k_0=2;
        # CO_2=1000;
        # Valor que se calcula a partir de los datos medidos (q/m^3) (PREGUNTAR POR ESTA FORMULA)
        n_0 = k_0 * (CO2) / (ER_q)

        integral = 0  # Integral
        n1 = self.modelo2(IVRR, ER_q, self.V, n_0, self.N_ind * I2[0], I1[0])

        for k in range(self.N):
            n2 = self.modelo2(IVRR, ER_q, self.V, n_0, self.N_ind * I2[k + 1], I1[k + 1])
            integral = integral + self.h * (n1 + n2) / 2
            n1 = n2

        # Tasa de inhalación (en m^3/h;entre 0.49 y 0.54;depende de la actividad que se esté realizando)
        IR = 0.51

        R = 1 - np.exp(-IR * integral)  # Riesgo de infección
        R0 = self.N_ind * R  # Número básico reproductivo

        return R0

    def modelo1(self, a):
        y = self.eta
        I_max = np.array([0, self.eta[2]])
        I1 = np.empty(self.N + 1)
        I1[0] = a
        I2 = np.empty(self.N + 1)
        I2[0] = self.eta[1]
        a11 = 1 / 4
        a12 = 1 / 4 - np.sqrt(3) / 6
        a21 = 1 / 4 + np.sqrt(3) / 6
        a22 = 1 / 4
        m = len(y)
        # opciones=optimset('TolFun',1.e-10,'TolX',1.e-10);

        for k in range(self.N):
            x = a + k * self.h
            x1 = x + (a11 + a12) * self.h
            x2 = x + (a21 + a22) * self.h

            def F(z):
                return np.array(
                    [z[0] - self.f(x1, y + self.h * a11 * z[0] + self.h * a12 * z[1]),
                     z[1] - self.f(x2, y + self.h * a21 * z[0] + self.h * a22 * z[1])])

            k0 = scipy.optimize.newton(F, np.array([self.f(x, y), self.f(x, y)]),
                                       tol=1e-10)
            # print(infodict)

            k1 = k0[0]
            k2 = k0[1]
            y = y + self.h / 2 * k1 + self.h / 2 * k2

            I1[k + 1] = x + self.h
            I2[k + 1] = y[1]

            if y[1] > I_max[1]:
                I_max = np.array([(k + 1) * self.h, y[1]])
            x = x + self.h
        return x, y, I_max, I1, I2

    def modelo2(self, IVRR, ER_q, V, n_0, I, t):
        return ER_q * I / (IVRR * V) + (n_0 + ER_q * I / IVRR) * np.exp(-IVRR * t) / V
