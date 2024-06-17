import numpy as np
import scipy.optimize


class CoronavirusTransmissionModel:
    def __init__(self, b=3 / 24, N_ind=40, cte=0.4, r=0.037, h=1 / 200, k=0.24,
                 AER=0.2, V=190, ER_q=110, temperature=20, humidity=60, UV=0):
        self.b = b
        self.N_ind = N_ind
        self.cte = cte
        self.r = r
        self.h = h
        self.k = k
        self.AER = AER
        self.eta = [1 - 1 / (5 * self.N_ind), 1 / ( self.N_ind), 0]
        self.N = int(b // h)
        self.V = V
        self.ER_q = ER_q
        self.UV = UV
        self.lmda = self.calc_lambda(self, temperature, humidity)
        self.I = 1
   
        
    @staticmethod
    def calc_lambda(self, temperature, humidity):
        return (7.56923714795655+1.41125518824508*(temperature-20.54)/10.66 + 0.02175703466389*(humidity-45.235)/28.665+7.55272292970083*((self.UV*0.185)-50) / 50 + (temperature-20.54)/10.66*(self.UV*0.185-50)/50*1.3973422174602)*60
        
        
    def f(self, x, y):
        def beta(x): return 0.180 * ((1 + self.cte) /
                                     2 - (1 - self.cte) / 2 * np.tanh(3 * (x - 1)))

        return np.array([-beta(x) * y[0] * y[1], beta(x) * y[0] * y[1] - self.r * y[1],
                         self.r * y[1]])

    def predict(self, CO2, n_0):
        a = 0
        x_final, y_final, I_max, I1, I2 = self.modelo1(a)
        ER_q = self.ER_q
       
        if CO2 < 400:
            self.AER = 4
        elif CO2 >= 400  and CO2 < 1000:
            self.AER = 2.1
        elif CO2 >= 1000 and CO2 < 2000:
            self.AER = 1.1
        elif CO2 >= 2000:
            self.AER = 0.2
        
        print(self.AER)
        IVRR = self.k + self.AER + self.lmda
        integral = 0  # Integral
        n1 = self.modelo2(IVRR, ER_q, self.V, n_0, self.N_ind * I2[0], I1[0])

        for k in range(self.N):
            n2 = self.modelo2(IVRR, ER_q, self.V, n_0, self.N_ind * I2[k + 1], I1[k + 1])
            integral = integral + self.h * (n1 + n2) / 2
            n1 = n2

        IR = 0.54

        R = 1 - np.exp(-IR * integral)
        R0 = self.N_ind * R

        return R0, n1

 

    def modelo2(self, IVRR, ER_q, V, n_0, t):
        return ER_q * self.I / (IVRR * V) + (n_0 + ER_q * self.I / IVRR) * np.exp(-IVRR * t) / V



n0 = 1.86

co2 = [280, 400, 1200, 3000]

for c in co2:
    model = CoronavirusTransmissionModel()
    print('co2: {}, n0: {}'.format(c, n0))
    R0, n0 = model.predict(c, n0)
    print(R0, n0)

