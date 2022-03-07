<template>
  <h2 v-if="connectionNeeded !== ''" class="text-center my-5 text-danger fst-italic">{{connectionNeeded}}</h2>
  <h1 class="text-center">Se connecter</h1>
  <LoginForm />
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {LoginForm},
  props: [
      'connectionNeeded'
  ],
}
</script>