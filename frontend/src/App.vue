<template>
  <div class="app">
    <header class="app-header">
      <h1 class="logo">MercApp</h1>
      <nav class="nav">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/product/new">Nuevo producto</RouterLink>
        <RouterLink to="/cart">Carrito</RouterLink>
        <RouterLink to="/about">Acerca de</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="loading">Cargando vista...</div>
        </template>
      </Suspense>
    </main>

    <footer class="app-footer">
      <small>MercApp – Unidad 3</small>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #20232a;
  color: #fff;
}
.logo {
  margin: 0;
  font-size: 1.3rem;
}
.nav {
  display: flex;
  gap: 1rem;
}
.nav a {
  color: #fff;
  text-decoration: none;
}
.nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
.app-main {
  flex: 1;
  padding: 1.5rem;
}
.app-footer {
  text-align: center;
  padding: 0.75rem;
  background: #f5f5f5;
}
.loading {
  text-align: center;
}
</style>
