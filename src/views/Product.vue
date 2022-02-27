<template>
<h1>Product</h1>
  <p>{{name}}</p>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  props: ['name']
}
</script>