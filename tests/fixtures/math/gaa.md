# GAA formula regression fixtures

These formulas preserve the fraction, script and align cases independently of published posts.

$$\min_{x^{adv} \in B_\epsilon(x)} L(x^{adv}, y_t; F), \quad \text{使得} \quad M(x^{adv}) = y_t \quad \text{(目标攻击)}$$

$$\displaystyle \min_{x' \in B_{\epsilon}(x)} L(x', y_t; \theta) + L_w(x', y_t; \theta) + \lambda h(x', y_t; \theta)$$

$$g' = \hat{g} + (1 - \lambda)g' + (1 + \lambda)\hat{g}$$

$$x^{adv}_{t+1} = \text{clip}_{x,\epsilon}\left(x^{adv}_t + \alpha \cdot \text{sign}(g_{t+1})\right)$$

$$\tau^* = \arg\max_{\|\tau\|_\infty \leq \rho} \nabla_{x'} L(x')^T \tau$$

$$\hat{\tau} \approx \rho \cdot \frac{\nabla L(x', y_t; \theta)}{\|\nabla L(x', y_t; \theta)\|_1}$$

$$\min_{x' \in B_\epsilon(x)} (1-\lambda)L(x', y_t; \theta) + (1+\lambda)L\left(x' + \rho\frac{\nabla L}{\|\nabla L\|_1}, y_t; \theta\right)$$

$$\displaystyle h(x', y_t; \theta) = L_w(x', y_t; \theta) - L(x', y_t; \theta)$$

$$\begin{align*} \max_{\|\tau\|_\infty \le \rho} L(x' + \tau, y_t; \theta) &= \max_{\|\tau\|_\infty \le \rho} L(x', y_t; \theta) + \nabla L(x', y_t; \theta)^T \tau + \frac{1}{2}\tau^T H \tau + \mathcal{O}(\tau^3) \\ &\approx \max_{\|\tau\|_\infty \le \rho} L(x', y_t; \theta) + \nabla L(x', y_t; \theta)^T \tau + \frac{1}{2}\tau^T H \tau \end{align*}$$

$$\max_{\|\tau\|_\infty \leq \rho} L(x' + \tau) \approx L(x') + \max_{\|\tau\|_\infty \leq \rho} \left[\nabla L(x')^T \tau + \frac{1}{2}\tau^T H \tau\right]$$

$$L_w(x') \approx L(x') + \frac{1}{2}\rho^2 \sigma_{\max}$$

$$h(x') = L_w - L \approx \frac{1}{2}\rho^2 \sigma_{\max} \geq 0$$

$$\begin{align*} \max_{\|\tau\|_\infty \le \rho} L(x' + \tau, y_t; \theta) &= \max_{\|\tau\|_\infty \le \rho} L(x', y_t; \theta) + \nabla L(x', y_t; \theta)^T \tau + \mathcal{O}(\tau^2) \\ &\approx \max_{\|\tau\|_\infty \le \rho} L(x', y_t; \theta) + \nabla L(x', y_t; \theta)^T \tau \\ &\approx L(x', y_t; \theta) + \rho \left\| \nabla L(x', y_t; \theta) \right\|_1 \end{align*}$$

$$\min_{x'} \left[2L + \max_{\|\tau\|_\infty \leq \rho}\left((1+\lambda)\nabla L^T \tau + \frac{\lambda}{2}\tau^T H \tau\right)\right]$$
