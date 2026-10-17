---
title: "DRAP 论文精读：出发点、理论推导与方法实施"
published: 2026-10-17 # 导入日期，原笔记未标注发布日期
---

# DRAP 论文精读：出发点、理论推导与方法实施

> 论文：*Seeking Flat Minima over Diverse Surrogates for Improved Adversarial Transferability: A Theoretical Framework and Algorithmic Instantiation*
>
> 版本：arXiv:2504.16474v2，2026-03-29。下文页码均指 PDF 物理页；Appendix A 在 PDF 第 19 页开始，其内部页码重新计数。

## 0. 先用一句话抓住全文

作者把迁移攻击改写成一个“跨模型分布的泛化问题”，并证明目标模型上的攻击失败风险由三项核心量控制：代理模型上的经验攻击失败风险、该风险在对抗样本邻域中的尖锐程度，以及代理模型分布与目标模型分布的对抗脆弱性差异，另有 $c_2r$ 与 $\varepsilon_{\mathrm{PAC}}$。DRAP 用逐模型反向扰动优化 sharpness，用多样代理模型间接控制未知 discrepancy。

核心上界是（PDF p. 6，Eq. (24)）：

$$
\begin{aligned}
R_T(\hat x)
\leq {}& \widehat R_S(\hat x)
+\underbrace{\left[
\max_{\|\epsilon\|_2\leq \rho}
\widehat R_S(\hat x+\epsilon)-\widehat R_S(\hat x)
\right]}_{\text{sharpness}} \\
&+\frac{1}{c_1}D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
+c_2r+\varepsilon_{\mathrm{PAC}}.
\end{aligned}
$$

必须先记住：这里的 $R$ 是“攻击失败风险”，越小越好，不是攻击成功率。

## 1. 作者真正的出发点

### 1.1 迁移攻击不是普通的白盒优化

攻击者能访问代理模型，却不知道未来目标模型。只在代理模型上把损失优化得很低，并不保证目标模型上也低。作者因此不再把问题理解为“在一个模型上找更强梯度”，而是：

> 给定从代理模型分布 $P_S$ 采到的有限模型，如何让一个对抗样本泛化到另一个未知目标模型分布 $P_T$？

这立刻暴露出两类误差：

1. 从有限代理模型样本推广到整个代理分布 $P_S$ 的泛化误差；
2. 从代理分布 $P_S$ 迁移到不同目标分布 $P_T$ 的分布偏移。

标准 PAC-Bayes 只能处理第一类，因为训练样本与测试样本必须来自同一分布。ResNet-50 与 ViT 这类代理/目标组合显然存在模型级非同分布偏移。因此作者的关键策略不是强行用一个 PAC-Bayes bound 包办全部，而是先拆开：

$$
\text{目标风险}
=\text{代理风险}
+\text{代理到目标的迁移间隙}.
$$

然后分别用 PAC-Bayes 与模型分布 discrepancy 上界它们。

### 1.2 这也是对 RAP 的补全与修正

作者此前的 RAP 已经观察到：对抗样本位于代理损失的平坦低谷时，通常更容易迁移。但 RAP 有两个缺口：

1. “平坦性有利于迁移”主要是直觉和实验观察，没有严谨的整体风险分解；
2. RAP 对所有代理模型求一个共享的反向扰动。模型越多样，各模型的局部最坏方向越可能冲突，共享方向反而可能很弱。

本论文先用 Theorem 4 说明“平坦性为什么出现于迁移上界”，再用模型特异的 $\epsilon_k$ 把 RAP 升级为 DRAP。

## 2. 问题定义与符号方向

令原图为 $x$，对抗样本为

$$
\hat x=x+\xi,
\qquad
\|\xi\|_\infty\leq \gamma.
$$

给定模型参数分布 $P_D$，作者定义对抗风险（PDF p. 4，Eq. (8)）：

$$
R_D(\hat x)
=\mathbb E_{w\sim P_D}
\left[\ell(f(\hat x,w),y)\right].
$$

若只观察到 $K$ 个模型 $\mathcal M_D=\{w_i\}_{i=1}^K$，经验风险为

$$
\widehat R_D(\hat x)
=\frac1K\sum_{w_i\in\mathcal M_D}
\ell(f(\hat x,w_i),y).
$$

论文采用“最小化攻击失败损失”的记号：

$$
\ell_{\mathrm{untargeted}}
=-\operatorname{CE}(f(\hat x),y),
\qquad
\ell_{\mathrm{targeted}}
=\operatorname{CE}(f(\hat x),y_t).
$$

因此 $R_D$ 越低，攻击越强。目标是

$$
\min_{\hat x\in\hat{\mathcal X}}R_T(\hat x).
$$

## 3. 理论推导第一段：目标风险分解

定义有符号迁移间隙

$$
\mathcal E_{\mathrm{trans}}(\hat x)
=R_T(\hat x)-R_S(\hat x).
$$

于是（PDF p. 5，Eq. (13)）：

$$
R_T(\hat x)
=R_S(\hat x)+\mathcal E_{\mathrm{trans}}(\hat x).
$$

注意 $\mathcal E_{\mathrm{trans}}$ 不是距离，也没有绝对值；它可以为负。论文需要的是它的单侧上界，因为这足以给出 $R_T$ 的上界。

接下来有两个子问题：

$$
\begin{cases}
\text{如何用有限代理模型估计 }R_S(\hat x),\\
\text{如何上界 }R_T(\hat x)-R_S(\hat x).
\end{cases}
$$

## 4. 理论推导第二段：局部对抗模型差异度

### 4.1 从 $\phi$-divergence 的变分形式开始

对分布 $\mu,\nu$，若 $\mu\ll\nu$，则

$$
D_\phi(\mu\|\nu)
=\int p_\nu(w)
\phi\!\left(\frac{p_\mu(w)}{p_\nu(w)}\right)dw.
$$

设 $\phi^*$ 为 Fenchel 共轭。取仿射变换 $T_{\alpha,t}(g)=tg+\alpha$，可写成（PDF p. 4，Eq. (7)）：

$$
D_\phi(\mu\|\nu)
=\sup_{g,t}
\left\{
\mathbb E_\mu[tg(w)]
-\inf_{\alpha\in\mathbb R}
\left(
\mathbb E_\nu[\phi^*(tg(w)+\alpha)]-\alpha
\right)
\right\}.
$$

当 $g$ 遍历所有有界可测函数时，这是完整分布差异。迁移攻击并不关心模型在所有函数上的差异，只关心“候选对抗样本诱导的损失”是否不同。

### 4.2 把函数族局部化到有效候选对抗样本

先定义代理风险不超过 $r$ 的候选集合（PDF p. 5，Eq. (14)）：

$$
\hat{\mathcal X}_r
=\{\hat x\in\hat{\mathcal X}:R_S(\hat x)\leq r\}.
$$

再把判别函数限制为

$$
\hat{\mathcal G}_r
=\left\{
w\mapsto\ell(f(\hat x',w),y):
\hat x'\in\hat{\mathcal X}_r
\right\}.
$$

由此定义对抗模型差异度（PDF p. 5，Eq. (15)）：

$$
\begin{aligned}
D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
=\sup_{\hat x'\in\hat{\mathcal X}_r,t\in\mathbb R}
\Bigg\{&
\mathbb E_{P_T}[t\ell_{\hat x'}]
\\
&-\inf_{\alpha\in\mathbb R}
\left(
\mathbb E_{P_S}[\phi^*(t\ell_{\hat x'}+\alpha)]-\alpha
\right)
\Bigg\},
\end{aligned}
$$

其中 $\ell_{\hat x'}(w)=\ell(f(\hat x',w),y)$。

它有三个重要性质：

1. 因为函数族被限制，

   $$
   D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
   \leq D_\phi(P_T\|P_S).
   $$

2. $r$ 越大，候选函数越多，差异度单调不减；
3. 在闭凸条件下取 $t=0$ 可得

   $$
   D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)\geq0.
   $$

   若对每个 $\hat x'\in\hat{\mathcal X}_r$，损失在 $P_S$ 与 $P_T$ 下的推前分布相同，则差异度为零；这是充分条件，不代表原始模型分布必须相同。

4. 它只比较对迁移攻击有意义的脆弱性模式，而不要求两个模型参数分布处处接近。

## 5. Theorem 2：迁移间隙如何被差异度上界

### 5.1 先定义代理损失的生成函数余项

对固定 $\hat x$，定义

$$
\begin{aligned}
K_S^{\hat x}(t)
= {}&
\inf_{\alpha}
\left\{
\mathbb E_{P_S}
[\phi^*(t\ell_{\hat x}+\alpha)]-\alpha
\right\}
-tR_S(\hat x).
\end{aligned}
$$

它衡量变分表达式中非线性部分相对线性均值 $tR_S$ 的余量。

### 5.2 逐步推导

由 discrepancy 对 $\hat x'$ 和 $t$ 取上确界，对任意固定 $\hat x\in\hat{\mathcal X}_r$ 都有

$$
D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
\geq
tR_T(\hat x)
-\inf_\alpha
\left\{
\mathbb E_{P_S}[\phi^*(t\ell_{\hat x}+\alpha)]-\alpha
\right\}.
$$

代入 $K_S^{\hat x}(t)$ 的定义：

$$
D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
\geq
tR_T(\hat x)-tR_S(\hat x)-K_S^{\hat x}(t).
$$

即

$$
t\mathcal E_{\mathrm{trans}}(\hat x)
\leq
D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
+K_S^{\hat x}(t).
$$

当 $t>0$ 时，两边除以 $t$：

$$
\mathcal E_{\mathrm{trans}}(\hat x)
\leq
\frac{D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)}{t}
+\frac{K_S^{\hat x}(t)}{t}.
$$

取 $t=c_1>0$，并假设存在 $c_2\geq0$ 使

$$
K_S^{\hat x}(c_1)
\leq c_1c_2R_S(\hat x),
$$

又因 $\hat x\in\hat{\mathcal X}_r$，有 $R_S(\hat x)\leq r$，所以

$$
K_S^{\hat x}(c_1)
\leq c_1c_2r.
$$

最终得到（PDF p. 5，Eq. (16)）：

$$
\boxed{
\mathcal E_{\mathrm{trans}}(\hat x)
\leq
\frac1{c_1}D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
+c_2r
}.
$$

论文定理文字把 $c_1$ 写入 $[0,+\infty)$，但公式含 $1/c_1$，真正可用时必须取 $c_1>0$。

### 5.3 这个定理在说什么

它不是说“代理与目标参数越接近越好”，而是说：在所有已经能较好攻击代理分布的候选 $\hat x'$ 上，目标与代理的损失分布不能差太多。只有这种与攻击任务相关的差异才进入迁移间隙。

## 6. TV、KL、$\chi^2$ 三种实例化

### 6.1 TV：匹配平均脆弱性

Appendix A 取

$$
\phi_{\mathrm{TV}}(u)=|u-1|.
$$

随后又额外把仿射斜率限制到 $t\in[-1,1]$，得到一个 IPM 型局部量：

$$
\widetilde D_{\mathrm{TV}}^{\hat{\mathcal X}_r}(P_T\|P_S)
=\sup_{\hat x'\in\hat{\mathcal X}_r}
\left|R_T(\hat x')-R_S(\hat x')\right|.
$$

这里的等式依赖额外的 $t$ 限制。若沿用 Definition 4 对 $t,\alpha\in\mathbb R$ 全部优化，完整的

$$
D_{\phi_{\mathrm{TV}}}^{\hat{\mathcal X}_r}(P_T\|P_S)
$$

一般可以比绝对均值差更大，不能把二者直接写成恒等式。论文用同一个 $D_{\mathrm{TV}}$ 记号表示这两种对象，存在记号混用。

对 $0<c_1\leq1$，$c_2=0$，有

$$
\mathcal E_{\mathrm{trans}}(\hat x)
\leq
\frac1{c_1}
\widetilde D_{\mathrm{TV}}^{\hat{\mathcal X}_r}(P_T\|P_S).
$$

最紧的允许选择是 $c_1=1$。它提示代理混合分布应让各组件的平均脆弱性互补，避免所有代理都重复同一种模式。

论文还有尺度不一致：PDF p. 3 用 $\phi(u)=\frac12|u-1|$ 定义标准 TV，而 Appendix A 使用 $|u-1|$。采用任一约定都必须同步处理共轭函数、仿射平移 $\alpha$ 与允许的 $t$；在标准尺度下，对 $t=1$ 取 $\alpha=-\frac12$，仍可得到 $K_S^{\hat x}(1)=0$。现有笔记的最终均值差上界可以成立，但它没有交代尺度、平移和额外斜率限制，推导理由不完整。

### 6.2 KL：惩罚欠覆盖的尾部模式

取

$$
\phi_{\mathrm{KL}}(u)=u\log u-u+1,
\qquad
\phi_{\mathrm{KL}}^*(v)=e^v-1.
$$

对 $\alpha$ 求极小可得

$$
D_{\mathrm{KL}}^{\hat{\mathcal X}_r}(P_T\|P_S)
=\sup_{\hat x',t}
\left\{
tR_T(\hat x')-\log\mathbb E_{P_S}[e^{t\ell_{\hat x'}}]
\right\}.
$$

而

$$
K_S^{\hat x}(t)
=\log\mathbb E_{P_S}[e^{t\ell_{\hat x}}]
-t\mathbb E_{P_S}[\ell_{\hat x}],
$$

即代理损失的中心化累积生成函数。若 $\ell\in[0,1]$，由凸性

$$
e^{t\ell}
\leq 1+(e^t-1)\ell,
$$

再用 $\log(1+z)\leq z$，得到

$$
K_S^{\hat x}(t)
\leq
(e^t-1-t)R_S(\hat x).
$$

因此只要

$$
c_2\geq
\frac{e^{c_1}-1-c_1}{c_1},
$$

就有

$$
\mathcal E_{\mathrm{trans}}(\hat x)
\leq
\frac1{c_1}D_{\mathrm{KL}}^{\hat{\mathcal X}_r}(P_T\|P_S)
+c_2r.
$$

$c_1$ 大会压低 discrepancy 的系数 $1/c_1$，却指数式抬高 $c_2$；只有 $r$ 已很小时才可能划算。$c_1,c_2$ 是分析常数，不是 DRAP 中可直接调的超参数。

KL 的实践含义是“不要漏掉目标侧可能出现但代理侧概率极小的脆弱性模式”，所以需要多个异质组件提高覆盖面。

### 6.3 $\chi^2$：直接导出双层多样性

取 Pearson 生成函数

$$
\phi_{\chi^2}(u)=(u-1)^2.
$$

论文附录在这里隐含地把 $\phi_{\chi^2}$ 从 $\mathbb R_+$ 扩展到整个 $\mathbb R$，于是使用

$$
\phi_{\chi^2}^*(v)=v+\frac{v^2}{4}.
$$

若严格保留 Definition 1 的定义域 $\mathbb R_+$，共轭应是

$$
\phi_{\chi^2}^*(v)=
\begin{cases}
-1, & v<-2,\\
v+\dfrac{v^2}{4}, & v\geq-2.
\end{cases}
$$

后续解析式采用的是论文的全实数隐含扩展。

对 $\alpha$ 求极小后：

$$
D_{\chi^2}^{\hat{\mathcal X}_r}(P_T\|P_S)
=\sup_{\hat x',t}
\left\{
t\Delta(\hat x')
-\frac{t^2}{4}
\operatorname{Var}_{P_S}(\ell_{\hat x'})
\right\},
$$

其中

$$
\Delta(\hat x')
=R_T(\hat x')-R_S(\hat x').
$$

对 $t$ 求最大，若方差非零：

$$
D_{\chi^2}^{\hat{\mathcal X}_r}(P_T\|P_S)
=\sup_{\hat x'\in\hat{\mathcal X}_r}
\frac{\Delta(\hat x')^2}
{\operatorname{Var}_{P_S}(\ell_{\hat x'})}.
$$

这里还存在边界情形：若方差为零而 $\Delta\neq0$，原二次目标对 $t$ 的上确界是 $+\infty$；若方差与 $\Delta$ 同时为零，解析比值成为未定义的 $0/0$。论文没有单独处理这两种情形。

同时

$$
K_S^{\hat x}(t)
=\frac{t^2}{4}
\operatorname{Var}_{P_S}(\ell_{\hat x}),
$$

所以 Theorem 2 的可行条件为

$$
c_2\geq
\frac{c_1}{4}
\frac{\operatorname{Var}_{P_S}(\ell_{\hat x})}
{\mathbb E_{P_S}[\ell_{\hat x}]}.
$$

当 $\mathbb E_{P_S}[\ell_{\hat x}]=0$ 时，这个比值条件也需要单独按原始不等式处理，不能直接使用分式。

若 $P_S$ 是等权组件混合

$$
P_S=\frac1I\sum_{i=1}^IP_{S_i},
$$

则全方差公式给出（Appendix A，Eq. (A.19)）：

$$
\operatorname{Var}_{P_S}(\ell)
=
\underbrace{\operatorname{Var}_i
\left(\mathbb E_{P_{S_i}}[\ell]\right)}
_{\text{between-distribution diversity}}
+
\underbrace{\mathbb E_i
\left[\operatorname{Var}_{P_{S_i}}(\ell)\right]}
_{\text{within-distribution diversity}}.
$$

这条式子才是作者要求“双重多样性”的最直接数学来源：组件均值要不同，同一组件内部的模型也不能完全冗余。

但要谨慎：$P_T$ 不可见，$\Delta$ 无法计算，因此作者并没有在攻击阶段显式最小化这个 discrepancy。多样代理只是由上式启发出的覆盖性策略，并非定理保证“多样性越大，真实 discrepancy 必然越小”。

## 7. Theorem 3：代理风险的 PAC-Bayes 平坦性上界

### 7.1 PAC-Bayes 中的角色反转

作者把通常的角色改成：

| PAC-Bayes 元素 | 本文中的对象 |
|---|---|
| instance | 模型参数 $w\sim P_S$ |
| concept | 对抗样本 $\hat x$ |
| training sample | 有限代理模型集 $\mathcal M_S$ |
| population risk | $R_S(\hat x)$ |
| empirical risk | $\widehat R_S(\hat x)$ |

这只处理从有限 $\mathcal M_S$ 泛化到同一个 $P_S$，不处理 $P_T\neq P_S$；后者仍由 Theorem 2 负责。

### 7.2 高斯先验与后验

论文附录此处把原始 $\ell_\infty$ 攻击预算当成了 $\ell_2$ 半径，写成

$$
\hat x=x+\xi,
\qquad
\|\xi\|_2\leq\gamma.
$$

这不是由前文威胁模型推出的合法关系；若 $\gamma$ 仍表示逐像素 $\ell_\infty$ 预算，严格地只有

$$
\|\xi\|_2\leq\sqrt d\,\gamma.
$$

下面先按附录自身记号复述其推导，再在第 13 节评估这一范数缺口。

论文选择（Appendix A，Eq. (A.23)）：

$$
P=\mathcal N(x,\sigma_p^2I),
\qquad
Q=\mathcal N(x+\xi,\sigma^2I).
$$

因此

$$
KL(Q\|P)
=\frac12\left[
\frac{d\sigma^2+\|\xi\|_2^2}{\sigma_p^2}
-d+d\log\frac{\sigma_p^2}{\sigma^2}
\right].
$$

先验中心是原图 $x$，不是零；复杂度依赖对抗扰动 $\|\xi\|_2$，不是整张图的 $\|\hat x\|_2$。

### 7.3 为什么还要离散先验方差

若事后优化，最优值是

$$
\sigma_p^{*2}
=\sigma^2+\frac{\|\xi\|_2^2}{d}.
$$

但 PAC-Bayes 先验必须在看到代理模型样本前固定，不能依赖最终 $\xi$。作者因此在预定义方差网格

$$
\sigma_p=c\exp\!\left(\frac{1-j}{d}\right),
\qquad j\in\mathbb N,
$$

上做 union bound，并分配

$$
\delta_j=\frac{6\delta}{\pi^2j^2},
\qquad
\sum_{j=1}^{\infty}\delta_j=\delta.
$$

这样可以选到接近最优的固定先验，同时把离散选择代价吸收到对数常数项中。

附录对这一步的精确常数并不完全严谨：它先把网格写成标准差 $\sigma_p=c\exp((1-j)/d)$，随后又按方差 $\sigma_p^2$ 代入索引，$c$ 与 $c^2$ 及因子 $2$ 的对应不一致。因此 Theorem 3 的结构性结论比其低阶常数更可信。

### 7.4 从高斯平滑转成半径 $\rho$ 内的最坏经验风险

令 $\epsilon\sim\mathcal N(0,\sigma^2I)$。证明先使用关键假设（Appendix A，Eq. (A.21)）：

$$
R_S(\hat x)
\leq
\mathbb E_\epsilon[R_S(\hat x+\epsilon)].
$$

直觉是 $\hat x$ 已位于低风险局部极小区域，随机扰动平均不会让风险更低。但这不是对任意 $\hat x$ 自动成立的“无损一般性”，而是证明所需的额外局部极小假设。

又因为

$$
\frac{\|\epsilon\|_2^2}{\sigma^2}
\sim\chi_d^2,
$$

利用卡方集中不等式，取

$$
\rho^2
=d\sigma^2
\left(1+\sqrt{\frac{\log K}{d}}\right)^2,
$$

可使

$$
\Pr(\|\epsilon\|_2\leq\rho)
\geq1-\frac1{\sqrt K}.
$$

严格拆分球内外事件时应先得到

$$
\mathbb E_\epsilon
\left[\widehat R_S(\hat x+\epsilon)\right]
\leq
\left(1-\frac1{\sqrt K}\right)
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
+\frac1{\sqrt K},
$$

其中最后一项来自损失上界 $1$。论文附录从倒数第二步到最终式时直接去掉了这个正尾项，也没有明确证明它已被置信常数吸收；严格版本应保留它或重新放大置信项。

在球内用

$$
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
$$

上界经验风险，在球外用损失有界性处理，再合并高斯 KL 和 union-bound 常数，得到 Theorem 3（PDF p. 6，Eq. (22)）：

$$
\boxed{
R_S(\hat x)
\leq
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
+\varepsilon_{\mathrm{PAC}}
},
$$

其中

$$
\varepsilon_{\mathrm{PAC}}
=
\sqrt{
\frac{
\frac d2\log\!\left[
1+\frac{\gamma^2}{\rho^2}
\left(1+\sqrt{\frac{\log K}{d}}\right)^2
\right]
+\log\frac K\delta+\widetilde O(1)
}
{2(K-1)}
},
$$

且论文给出的低阶项为

$$
\widetilde O(1)
=\frac12+2\log\!\left(
2+3d+6r^2K
+4d\log(\sqrt d+\sqrt{\log K})
\right).
$$

### 7.5 为什么这等价于“寻找平坦低谷”

展开第一项：

$$
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
=\widehat R_S(\hat x)
+\left[
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
-\widehat R_S(\hat x)
\right].
$$

括号内正是 sharpness。低经验风险保证代理白盒攻击强；低 sharpness 保证在 $\hat x$ 周围稍微移动也不会迅速变成高攻击失败风险。

## 8. Theorem 4：把两条证据链合并

把 Theorem 2 与 Theorem 3 代回

$$
R_T=R_S+\mathcal E_{\mathrm{trans}},
$$

得到（PDF p. 6，Eq. (23)）：

$$
R_T(\hat x)
\leq
\max_{\|\epsilon\|_2\leq\rho}
\widehat R_S(\hat x+\epsilon)
+\frac1{c_1}D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)
+c_2r+\varepsilon_{\mathrm{PAC}}.
$$

因此作者的逻辑不是“平坦就一定迁移”，而是：

$$
\boxed{
\text{低经验风险}
+\text{低局部尖锐度}
+\text{小代理/目标脆弱性差异}
\Longrightarrow
\text{小的目标风险上界}
}.
$$

只控制其中一项不够。RAP 主要控制前两项；输入变换与模型增强主要试图覆盖第三项；DRAP 的目标是把两条路线结合。

## 9. 从上界到 DRAP

### 9.1 上界中的每一项如何落地

| 上界中的量 | 方法中的近似动作 |
|---|---|
| $\widehat R_S(\hat x)$ | 在代理模型上优化攻击损失 |
| sharpness | 对 $\hat x$ 周围的最坏反向扰动做内层最大化 |
| $D_\phi^{\hat{\mathcal X}_r}(P_T\|P_S)$ | 用多 prototype 与 SGD checkpoints 间接提高脆弱性覆盖 |
| $\varepsilon_{\mathrm{PAC}}$ 中的 $K$ | 增加代理模型样本数 |

discrepancy 含未知 $P_T$，不能直接算。算法真正显式优化的是代理经验风险与 sharpness；多样模型选择只是对 discrepancy 的理论启发式控制。

### 9.2 多样代理模型集

作者设

$$
P_S=\frac1I\sum_{i=1}^{I}P_{S_i},
\qquad
K=In.
$$

理论上有四类 prototype：

1. 标准训练 ConvNet；
2. 标准训练 Metaformer；
3. 对抗训练 ConvNet；
4. 对抗训练 Metaformer。

ImageNet 实验实际用五个组件：ResNet-50、ConvNeXt-T、ViT-B、ResNet-50(AT)、XCiT-S(AT)。因此是“四类 prototype、五个组件”，不是五类 prototype。

每个预训练模型用较大固定学习率继续训练 $40$ 个 epoch，每个 epoch 保存一个 checkpoint。五个学习率依次为

$$
0.05,\quad0.001,\quad0.05,\quad0.5,\quad0.001.
$$

这样

$$
I=5,\qquad n=40,\qquad K=200.
$$

组件间差异形成 between-distribution diversity；同一 SGD 轨迹的 checkpoints 形成 within-distribution diversity。

### 9.3 为什么 RAP 的共享反向扰动不够

RAP 求解（PDF p. 9，Eq. (27)）：

$$
\min_{\hat x}
\max_{\|\epsilon\|_\infty\leq\rho}
\frac1K\sum_{k=1}^K
\ell(f(\hat x+\epsilon,w_k),y).
$$

所有模型共享一个 $\epsilon$。若不同模型的最坏方向冲突，先平均梯度再优化会发生抵消。

DRAP 把最大化移入每个模型内部（PDF p. 9，Eq. (30)）：

$$
\min_{\hat x}
\frac1K\sum_{k=1}^K
\max_{\|\epsilon_k\|_\infty\leq\rho}
\ell(f(\hat x+\epsilon_k,w_k),y).
$$

二者满足

$$
\max_\epsilon\frac1K\sum_kL_k(\epsilon)
\leq
\frac1K\sum_k\max_{\epsilon_k}L_k(\epsilon_k).
$$

所以 DRAP 是更保守、更强的逐模型局部鲁棒目标。它不是 Theorem 4 中共同扰动 sharpness 的精确等价实现，而是对该项的上界式代理。

### 9.4 DRAP 内外层更新

对当前模型 $w_k$，先从 $\epsilon_k=0$ 开始做 $T$ 次内层上升（Eq. (31)）：

$$
\epsilon_k
\leftarrow
\epsilon_k+\beta_\epsilon
\operatorname{sign}
\left(
\nabla_{\epsilon_k}
\ell(f(\hat x+\epsilon_k,w_k),y)
\right).
$$

然后在局部最坏点上求外层梯度

$$
g_k
=\nabla_{\hat x}
\ell(f(\hat x+\epsilon_k,w_k),y),
$$

累积动量

$$
m\leftarrow
\mu m+\frac{g_k}{\|g_k\|_1},
$$

最后更新中心点而非反向点（Eq. (32)）：

$$
\hat x
\leftarrow
\Pi_\gamma
\left[
\hat x-\beta_{\hat x}
\operatorname{sign}(m)
\right].
$$

$\Pi_\gamma$ 把最终 AE 投影回原图 $x$ 的攻击预算球，并限制像素范围。

### 9.5 Algorithm 1 的实际循环

对 $j=0,\ldots,n-1$：

1. 依次遍历 $i=0,\ldots,I-1$；
2. 从组件 $P_{S_i}$ 取第 $j$ 个模型 $w_j^{(i)}$；
3. 若 $j<n_{\mathrm{LS}}$，令 $\epsilon_k=0$，只做普通外层攻击；
4. 若 $j\geq n_{\mathrm{LS}}$，先计算模型特异的 $\epsilon_k$，再更新 $\hat x$；
5. 动量跨组件、跨 checkpoint 持续累积。

这就是 longitudinal update：每次只让一个模型前向/反向，而不是把全部 $K$ 个模型同时放入显存。它是增量求解器，受模型顺序、sign、投影和动量影响，不严格等价于一次全梯度下降。

## 10. 论文记号与公开代码的符号映射

公开代码用“最大化攻击目标”的常见实现，而论文用“最小化攻击失败风险”。两者符号相反：

| 场景 | 论文的 $\ell$ | 代码的 $\widetilde\ell$ |
|---|---|---|
| 非目标攻击 | $-\operatorname{CE}_y$ | $+\operatorname{CE}_y$ |
| 目标攻击 | $+\operatorname{CE}_{y_t}$ | $-\operatorname{CE}_{y_t}$ |

因此论文外层写

$$
\hat x\leftarrow\hat x-\beta_{\hat x}\operatorname{sign}(\nabla\ell),
$$

代码则写成等价的

$$
\hat x\leftarrow\hat x+\beta_{\hat x}\operatorname{sign}(\nabla\widetilde\ell).
$$

“reverse”指相对攻击方向反向：非目标攻击的 inner 会降低真实标签 CE，使样本暂时向正确分类方向移动；outer 再要求即使处于这个局部最坏恢复方向，攻击仍保持有效。

目标攻击的公开代码与论文不完全相同：inner 使用目标 logit $z_{y_t}$ 并沿其负梯度移动，而不是严格最大化目标标签 CE；outer 才使用目标攻击损失。

## 11. 公开代码实际如何运行

公开仓库 `BlackboxBench` 的 `v3` 分支中，核心函数是 `transfer/gradient_calculation.py::rap_new`。

### 11.1 模型顺序

代码使用

$$
\text{checkpoint index}
=\left\lfloor\frac{\text{global iteration}}{I}\right\rfloor,
$$

并循环五个组件，所以顺序为

$$
w_0^{(1)},\ldots,w_0^{(I)},
w_1^{(1)},\ldots,w_1^{(I)},\ldots
$$

这与论文 $j$ 外层、$i$ 内层一致，但代码是确定性 checkpoint 遍历，不是严格 i.i.d. 随机采样。

### 11.2 late start 的计数单位

代码内部执行

$$
\texttt{late\_start}
\leftarrow n_{\mathrm{LS}}I.
$$

默认 $n_{\mathrm{LS}}=5$、$I=5$，所以前 $25$ 次 AE 更新不启用 inner；零基索引首次满足条件的是 $\texttt{iter}=25$，也就是第 $26$ 次更新，而不是第 $5$ 次。

### 11.3 inner 没有显式投影

论文目标写有 $\|\epsilon_k\|_\infty\leq\rho$，但 Algorithm 1 与公开代码都没有 $\Pi_\rho$，也没有对 reverse image 做 clamp。默认只做

$$
T=5
$$

次、每次

$$
\beta_\epsilon=\frac{0.1}{255}
$$

的符号步，因此只有隐式上界

$$
\|\epsilon_k\|_\infty
\leq T\beta_\epsilon
=\frac{0.5}{255}.
$$

若加入显式 $\rho$ 投影且 $\rho\geq T\beta_\epsilon$，投影不会激活，行为仍可相同；只有 $\rho<T\beta_\epsilon$，或额外对 reverse image 做像素 clamp 时，才会改变公开代码行为。

### 11.4 与输入变换组合

代码在 inner reverse step 中明确关闭 DI、SI、Admix 等输入变换，只在 outer 梯度中使用：

$$
g_k
=\nabla_{\hat x}
\ell
\left(f(\mathcal T(\hat x+\epsilon_k),w_k),y\right).
$$

### 11.5 默认参数

ImageNet：

$$
I=5,\quad n=40,\quad K=200,\quad
T=5,\quad n_{\mathrm{LS}}=5,\quad
\beta_\epsilon=\frac{0.1}{255},\quad\mu=1.
$$

非目标攻击：

$$
\gamma=\frac4{255},
\qquad
\beta_{\hat x}=\frac2{255}.
$$

目标攻击：

$$
\gamma=\frac{16}{255},
\qquad
\beta_{\hat x}=\frac8{255}.
$$

CIFAR-10 使用三个组件、每组件 $40$ 个 checkpoint：

$$
I=3,\qquad n=40,\qquad K=120,
$$

其固定学习率为

$$
0.05,\quad0.03,\quad0.02.
$$

两类攻击均使用

$$
\gamma=\frac8{255},
\qquad
\beta_{\hat x}=\frac{8}{255\times10}.
$$

### 11.6 计算量与存储

默认 ImageNet 设置下，梯度计算次数为

$$
N_g
=n_{\mathrm{LS}}I
+(nI-n_{\mathrm{LS}}I)(T+1)
=25+175\times6
=1075.
$$

逐模型反传让峰值显存降至 $10.19\ \mathrm{GB}$，但需要存储每个组件的 $40$ 个 checkpoint，磁盘模型存储约是单 checkpoint 方案的 $40$ 倍。

公开仓库没有完整的 DRAP checkpoint 生成脚本和对应权重，论文也只说沿用各模型 recipe，没有列全优化器、数据增强等细节。因此最难复现的不是攻击循环，而是获得与论文相同的 $200$ 个代理 checkpoints。

代码保存结果时还会做 $8$ 位量化：

$$
\hat x_{\mathrm{saved}}
=\frac{\operatorname{round}(255\hat x)}{255}.
$$

严格对齐公开实现时应保留这一步。

## 12. 实验怎样支持作者的论点

### 12.1 主结果

ImageNet 非目标攻击对 $31$ 个目标模型的总体平均成功率：

| 方法 | 平均成功率 |
|---|---:|
| DRAP | $46.2\%$ |
| SIA | $45.1\%$ |
| CWA | $34.5\%$ |

DRAP 的主要优势出现在对抗训练目标模型上，而 SIA 在普通模型上更强。这与“提高目标脆弱性覆盖，而不只适配易攻击普通模型”的设计动机一致。

主表并非让所有方法使用同一迭代数：非目标设置中 MI、PI、CWA 使用 $10$ 次，RAP 使用 $400$ 次，其余方法通常使用 $200$ 次，DRAP 的 $200=5\times40$。因此 Table II 比较的是作者为各方法采用的推荐协议，而不是严格相同梯度预算；Figure 1 才进一步比较性能与梯度计算量。

目标攻击总体平均成功率为

$$
43.5\%,
$$

明显高于 SIA 的

$$
29.4\%
$$

与 CWA 的

$$
19.5\%.
$$

### 12.2 sharpness 消融

I-FGSM 与 DRAP 组合时：

| 设置 | 总体平均 | Metaformer 集 |
|---|---:|---:|
| 完整 DRAP | $46.1\%$ | $42.6\%$ |
| 去 late start | $45.6\%$ | $42.2\%$ |
| 去 sharpness | $43.6\%$ | $36.3\%$ |

这表明 sharpness 项有实质贡献；late start 的收益较小但较稳定。

### 12.3 逐模型反向扰动消融

| 求解器 | 总体平均 |
|---|---:|
| Flat-RAP，共享 $\epsilon$、全局更新 | $43.9\%$ |
| Flat-CWA，共享 $\epsilon$、逐模型更新 | $44.9\%$ |
| DRAP，逐模型 $\epsilon_k$、逐模型更新 | $46.2\%$ |

它支持模型特异反向扰动，但不是每个目标子集都最优：Flat-RAP 在普通 Metaformer 集为 $47.0\%$，高于 DRAP 的 $42.6\%$。

### 12.4 多样性消融

当 $n$ 从 $0$ 增至 $40$，整体趋势改善，且 $n=40$ 达到峰值；但 $n$ 同时增加多样性与更新次数，因此该实验仍混入算力因素。

分别完全移除四类 prototype 中的某一类后，对应目标集成功率下降到

$$
47.8\%,\quad35.2\%,\quad23.7\%,\quad16.6\%,
$$

相对完整设置下降

$$
32.5,\quad7.4,\quad1.2,\quad3.6
$$

个百分点。普通 ConvNet prototype 的影响最大，但四类覆盖都提供收益。

## 13. 这套理论能证明什么，不能证明什么

### 13.1 能证明的

在论文假设成立时，目标攻击失败风险具有一个由经验代理风险、局部 sharpness、局部模型 discrepancy 和置信项组成的单侧上界。它把平坦性与 adversarial model discrepancy 放入了同一个风险分解；模型多样性只是随后用于间接控制 discrepancy 的算法启发。

### 13.2 不能直接证明的

1. **不能证明 DRAP 一定降低真实 discrepancy。** $P_T$ 不可见，算法没有计算该项；多样性只是间接覆盖策略。
2. **不能证明 DRAP 目标与 Theorem 4 完全等价。** 定理使用共享邻域扰动，DRAP 使用逐模型 $\epsilon_k$，后者是更保守代理。
3. **不能保证数值上是非平凡 bound。** ImageNet 中 $d=299\times299\times3=268203$、$K=200$。若按算法的 $\gamma/\rho\approx8$ 粗略代入，仅主 PAC 项就大于 $37$，而理论损失被要求位于 $[0,1]$，所以论文没有展示一个实际收紧的数值保证。
4. **不能无条件使用实际交叉熵。** PAC-Bayes 与三个推论需要有界损失，实际 CE/负 CE 并不天然位于 $[0,1]$；论文未给出完整的裁剪或归一化桥梁。
5. **实际代理样本并非严格 i.i.d.。** 同一 SGD 轨迹的相邻 checkpoints 强相关，代码还是分层、确定性遍历，与从统一混合 $P_S$ 独立采样不同。
6. **理论范数与算法范数存在间隙。** Theorem 3 是 $\ell_2$ 邻域，主算法使用 $\ell_\infty$。若攻击预算是逐像素 $\gamma$，严格地有

   $$
   \|\xi\|_2\leq\sqrt d\,\gamma,
   $$

   不能直接把同一个数值 $\gamma$ 当作 $\ell_2$ 半径。

7. **公共参数空间是假设。** 论文把不同架构抽象到共同 $\mathcal W$，但没有给出 ResNet 与 ViT 参数分布的实际公共构造。
8. **高斯分布的支撑不匹配。** PAC-Bayes 的先验、后验被称为定义在有界对抗集合 $\hat{\mathcal X}$ 上，但普通高斯有无界支撑；证明没有改用截断高斯或对高斯样本投影。
9. **Theorem 3 的精确常数存在证明缺口。** 先验方差网格的标准差/方差记号不一致，且最终推导丢掉了球外事件贡献的 $1/\sqrt K$ 正项。
10. **Theorem 2 的附录写法有量词滑移。** 附录先对 $K_S^{\hat x}(t)$ 在整个 $\hat{\mathcal X}_r$ 上取 supremum，再用只对当前 $\hat x$ 陈述的可行条件上界它；本文第 5.2 节使用固定 $\hat x$ 的直接推导可以避开这一问题。

## 14. 对现有笔记的校正清单

现有笔记的总体主线、Theorem 2/4 框架、DRAP 流程、主实验数字基本正确。以下内容建议修正：

1. 把“$\widehat R_S$ 是白盒攻击成功率”改成“$\widehat R_S$ 是经验攻击失败风险，越低越好”。
2. $\mathcal E_{\mathrm{trans}}=R_T-R_S$ 是有符号差，不是绝对距离。
3. Theorem 3 的主系数是

   $$
   \frac d2\log(\cdot),
   $$

   不是 $2d\log(\cdot)$。
4. PAC 先验/后验应为

   $$
   P=\mathcal N(x,\sigma_p^2I),
   \qquad
   Q=\mathcal N(x+\xi,\sigma^2I),
   $$

   不是零均值先验。
5. 不要省略方差网格、union bound、卡方集中以及 Eq. (A.21) 的局部极小假设。
6. 区分“四类 prototype”与“五个实际组件”。
7. TV 推论要明确区分正文 $\frac12|u-1|$ 与 Appendix 的 $|u-1|$ 归一化，并说明标准尺度下 $c_1=1$ 需要利用仿射平移 $\alpha=-\frac12$。
8. KL/$\chi^2$ 中的 $c_1,c_2$ 是理论常数，不是 DRAP 调参依据。
9. 把“同时优化 sharpness 和 discrepancy”改成“显式优化 sharpness，用理论启发的代理模型选择间接控制未知 discrepancy”。
10. “跨架构参数通过 padding/截断映射”不是论文陈述；论文只做了公共参数空间假设。
11. 元数据中不应把 `arXiv:2504.16474v2` 填入 DOI；当前 PDF 也没有可核实的正式 DOI、卷期页码或 journal reference。

## 15. 最后再压缩成一条思维链

作者的完整思路可以写成：

$$
\begin{aligned}
&\text{未知目标模型上的攻击}
\\
&\Downarrow
\\
&R_T=R_S+(R_T-R_S)
\\
&\Downarrow
\\
&\underbrace{R_S}_{\text{PAC-Bayes：经验风险+平坦性}}
+
\underbrace{(R_T-R_S)}_{\phi\text{-变分：局部模型差异}}
\\
&\Downarrow
\\
&\text{多 prototype + SGD checkpoints 试图提高脆弱性覆盖，间接控制 discrepancy，}
\quad
\text{逐模型 worst-case 代理推动 AE 进入更平坦的低风险区域}
\\
&\Downarrow
\\
&\text{DRAP：以逐模型 worst-case 代理，在多样代理模型上寻找更平坦的低风险 AE。}
\end{aligned}
$$

最准确的评价是：这篇论文的最大价值不是给出了一个可直接数值计算的紧 bound，而是提供了一个统一的设计坐标系，明确指出迁移攻击需要同时考虑“优化落点是否平坦”和“代理模型是否覆盖未来目标的脆弱性模式”。DRAP 是这个坐标系下有经验支持、但仍带有明显理论到实现间隙的一种算法实例。
