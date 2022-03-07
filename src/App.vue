<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavBar
  }
}
</script>

<template>
  <NavBar />
  <div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>