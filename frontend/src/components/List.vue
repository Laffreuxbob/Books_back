<template>
  <div class="container">

    <div class="row">
      <div class="col-12">
        <label for="searchbar">Search :
          <input type="text" id="searchbar" name="searchbar" v-model="search">
        </label>


    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Titre</th>
        <th scope="col">Auteur</th>
        <th scope="col">Category</th>
        <th scope="col">Note</th>

      </tr>
      </thead>
      <tbody>
            <SingleItem v-for="item in items"
                        v-bind:key="item.title"
                        v-show="search_method(item)"
                        @single_delete="single_delete"
                        @single_update="single_update"
                        :item='item'/>
      </tbody>
    </table>
  </div>

    </div>
  </div>



</template>

<script>

import SingleItem from "@/components/Item";

export default {
  name: 'ItemList',
  components: {
    SingleItem
  },
  data() {
    return {
      items: [],
      search: '',
    }
  },
  mounted() {
    fetch("http://127.0.0.117:1398/book")
        .then((response) => response.json())
        .then((data) => {
          this.items = data;
        });

  },
  methods: {
    debug(obj) {
      console.log(obj)
    },
    search_method(obj){
      console.log(obj.title)
      return true
    },
    single_delete(obj) {
      this.items = this.items.reduce((previous, current) => (current._id !==  obj._id && previous.push(current),previous),[])
    },
    single_update() {
      console.log("reload")
      fetch("http://127.0.0.117:1398/book")
          .then((response) => response.json())
          .then((data) => {
            this.items = data;
          });
    }
  }
}
</script>

<style scoped>
 button { margin-left: 5%}
</style>