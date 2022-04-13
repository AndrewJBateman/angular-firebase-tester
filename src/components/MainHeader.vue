<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Description of data
      <a href="https://swapi.dev/" target="_blank" rel="noopener">SWAPI</a>.
    </p>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "main_header",
  props: {
    msg: String
  },
  methods: {
    loadFetch() {
      let url = "https://swapi.dev/api/people"
      let response = fetch(url)
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #137fd8;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
