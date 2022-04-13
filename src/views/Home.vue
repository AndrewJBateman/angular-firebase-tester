<template>
  <div class="home">
    <MainHeader msg="List of data" />
  </div>
  <base-dialog v-if="visibleDialog" title="Planet details" :data="modalData">
    <template #default>
      <img align="left" src="../assets/planet.png" alt />
      <ul>
        <li>
          <strong>Planet Name:</strong>
          {{ modalData.name }}
        </li>
        <li>
          <strong>Diameter:</strong>
          {{ modalData.diameter }}
        </li>
        <li>
          <strong>Climate:</strong>
          {{ modalData.climate }}
        </li>
        <li>
          <strong>Population:</strong>
          {{ modalData.population }}
        </li>
      </ul>
    </template>
    <template #actions>
      <base-button @click="toggleDialog">Close</base-button>
    </template>
  </base-dialog>

  <div class="search-wrapper panel-heading col-sm-12">
    <input class="icon" type="text" v-model="searchTerm" placeholder="Search" />
  </div>

  <div style="overflow-x: auto">
    <table>
      <tr>
        <th>#</th>
        <th v-on:click="sortedArray">Name</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Created</th>
        <th>Edited</th>
        <th>Planet Name</th>
      </tr>
      <tr v-for="(character, index) in filteredResults" :key="index">
        <td>{{ index }}</td>
        <td>{{ character.name }}</td>
        <td>{{ character.height }}</td>
        <td>{{ character.mass }}</td>
        <td>{{ character.created.slice(0, -17) }}</td>
        <td>{{ character.edited.slice(0, -17) }}</td>
        <td style="padding: 5px">
          <base-button mode="flat" @click="toggleDialog(character.homeworld)">
            {{ character.homeworld.name }}
          </base-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"

export default {
  name: "home",
  components: {
    MainHeader
  },
  data() {
    return {
      ascending: true,
      visibleDialog: false,
      searchTerm: ""
    }
  },
  methods: {
    // pass in map return date in timestamp format
    sortedArray() {
      this.characters.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase()
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
    },
    // pass in characters
    toggleDialog(characters) {
      this.modalData = characters
      this.visibleDialog = !this.visibleDialog
    }
  },
  computed: {
    characters() {
      return this.$store.state.characters
    },
    filteredResults() {
      // match keyword against name.
      const pattern = new RegExp(this.searchTerm, "i")
      const filteredData = this.characters.filter((characters) => {
        return characters.name.match(pattern) // return
      })
      return filteredData
    }
  },
  mounted() {
    this.$store.dispatch("getData")
  }
}
</script>

<style scoped>
ul {
  text-align: left;
  margin-left: 40%;
  margin-top: 8%;
  text-decoration: none;
  list-style-type: none;
}
li {
  margin-bottom: 14px;
}
input[type="text"] {
  background-color: #d1d1d1;
}
.icon {
  padding-left: 25px;
  background: url("https://static.thenounproject.com/png/101791-200.png")
    no-repeat left;
  background-size: 20px;
  font-size: 1rem;
}
.asc:after {
  content: "\25B2";
}
.desc:after {
  content: "\25BC";
}
* {
  box-sizing: border-box;
}
.row {
  margin-left: -5px;
  margin-right: -5px;
}
.column {
  float: left;
  width: 50%;
  padding: 5px;
}
/* Clearfix (clear floats) */
.row::after {
  content: "";
  clear: both;
  display: table;
}
/* tables */
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
  font-size: 1rem;
  margin: 2% 0%;
}
table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}
table tr:nth-child(even) {
  background-color: #f2f2f2;
}
table tr:nth-child(odd) {
  background-color: #091422;
}
table tr:hover {
  background-color: #ddd;
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #35495e;
  color: white;
}
</style>
