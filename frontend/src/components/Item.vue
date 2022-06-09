<template>

  <tr class="col-lg-1">
    <td>
      <span v-show="!create_mode"> {{ item.title }} </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_title" :placeholder="item.title " class="col-lg-12"> </span>
    </td>
    <td>
      <span v-show="!create_mode"> {{ item.author }} </span>
    </td>
    <td>
      <span v-show="!create_mode"> {{ item.tag }} </span>
    </td>
    <td>
      <span v-show="!create_mode"> {{ item.rating }} </span>
    </td>

    <td class="col-lg-3" id="actions">

      <span>
        <button v-on:click="showdetails()" class="btn btn-info col-lg-4 col-xs-12"> Details </button>
        <button v-on:click="delete_item(item)" class="btn btn-danger col-lg-4 col-xs-12"> Delete </button>
      </span>

      <span>
        <button v-on:click="update_item(item)" class="btn btn-warning col-lg-4 col-xs-12" v-show="!create_mode"> Update </button>
        <button v-on:click="save_item(item)" class="btn btn-success col-lg-4 col-xs-12" v-show="create_mode"> Save </button>
        <button v-on:click="debug()" class="btn btn-secondary col-lg-4 col-xs-12"> debug </button>
      </span>

    </td>
  </tr>

  <tr v-show="details">
    <td>
      <span>
          {{ item.summary }}
      </span>
    </td>
  </tr>

</template>

<script>
export default {
  name: "SingleItem",
  props: ['item'],
  emits: ["single_delete", "single_update"],
  data () {
    return {
      create_mode: false,
      updated_title: '',
      details: false
    }
  },
  methods: {
    debug() {
      console.log("test")
    },
    delete_item(obj){
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_to_delete: obj._id })
      };
      fetch('http://127.0.0.117:1398/book', requestOptions)
          .then(async response => {
            const data = await response
            // check for error response
            if (response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .then(
              this.$emit('single_delete', obj)
          )
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
    showdetails(){
      this.details = !this.details
    },
    update_item() {
      this.create_mode = !this.create_mode
    },
    save_item(obj) {
      this.create_mode = !this.create_mode;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_to_update: obj._id,
          updated_title: this.updated_title !== '' ? this.updated_title : obj.title,
        })
      };

      fetch('http://127.0.0.117:1398/book', requestOptions)
          .then(
              async response => {
                if(response.status === 200) {
                  this.$emit('single_update')
                }
          })

          .catch(error => {
            console.error('There was an error!', error);
          });
    }
  }
}
</script>

<style scoped>
#actions {

}

.btn {

}
</style>