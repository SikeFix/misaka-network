<template>
  <section class="nf">
    <div class="code">404</div>
    <p>该节点不在御坂网络中</p>
    <RouterLink to="/" class="btn btn-primary">返回首页</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 120px 16px 60px;
  text-align: center;
}

.code {
  font-family: var(--mono);
  font-size: 96px;
  font-weight: 800;
  color: var(--volt);
  text-shadow: 0 0 30px rgba(92, 200, 255, 0.5);
  line-height: 1;
}

p {
  color: var(--text-2);
}
</style>
