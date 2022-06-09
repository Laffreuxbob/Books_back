<template>

  <form class="row  col-lg-8 offset-lg-2">

    <div class="form-group col-lg-5" >
      <label for="newTile">Title</label>
      <input type="text" class="form-control" id="newTitle" placeholder="new title" v-model="new_title">
    </div>

    <div class="form-group col-lg-5">
      <label for="newSummary">Summary</label>
      <textarea type="textarea" class="form-control" id="newSummary" placeholder="new summary" v-model="new_summary"></textarea>
    </div>


    <div class="form-group col-lg-5">
      <label for="newAuthor">Author</label>
      <input type="text" class="form-control" id="newAuthor" placeholder="new author" v-model="new_author">
    </div>


    <div class="form-group col-lg-5">
      <label for="newImg">Image</label>
      <input type="file" class="form-control" id="newImg" placeholder="Pick a picture" >
    </div>

    <div class="form-group col-lg-5">
      <label for="newDate">Date</label>
      <input type="date" class="form-control" id="newDate" placeholder="new date" v-model="new_date">
    </div>

    <div class="form-group col-lg-5">
      <input type="range" id="newRating" class="form-control" name="newRating" min="0" max="10"  v-model="new_rating">
<!--      <input type="range" class="form-control" id="newRating" placeholder="new rate" v-model="new_rating">-->

      <label for="newRating">Rating</label>

    </div>



<!--      <input type="number" class="form-control" id="newRating" placeholder="new title" v-model="new_rating">-->
<!--      <input type="range" id="newRating" name="newRating"-->
<!--             min="0" max="11"  v-model="new_rating">-->

    <div class="form-group col-lg-5">
      <label for="newTag">Tag</label>
      <input type="text" class="form-control" id="newTag" placeholder="new tag" v-model="new_tag">
    </div>

    <div id="actions" class="col-lg-8 offset-lg-2">
      <button  class="btn btn-primary col-lg-2 offset-lg-2" v-on:click="add_item">Submit</button>
      <button  type="reset" class="btn btn-primary col-lg-2 offset-lg-4" v-on:click="add_item">Reset</button>
    </div>

  </form>


</template>

<script>
export default {
  name: "AddForm",
  data() {
    return {
      new_item: {},
      new_title: '',
      new_author: '',
      new_summary: '',
      new_img: '',
      new_date:'',
      new_rating: 'rate',
      new_tag: ''
    }
  },
  methods: {
    add_item() {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.new_title,
          author: this.new_author,
          summary: this.new_summary,
          img: this.new_img,
          date: this.new_date,
          rating: this.new_rating,
          tag: this.new_tag,
        })
      };
      fetch('http://127.0.0.117:1398/book', requestOptions)
          .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
    // add_item() {
    //   fetch('http://127.0.0.117:11717/item/add', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({a: 7, str: 'Some string: &=&'})
    //   }).then(res => res.json())
    //       .then(res => console.log(res));
    // }
  }
}
</script>

<style scoped>

.form-group {
  margin-top: 3%;
}

#actions{
  margin-top: 4%;
}


</style>