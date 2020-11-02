<template>
  <v-container>
    <v-form class="d-flex flex-column align-center">
      <v-col cols="12">
        <v-text-field
          class="title-text-field"
          solo
          :maxlength="100"
          autocomplete="off"
          label="Title"
          v-model="details.title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="desc-text-field-container">
        <v-textarea
          @keyup.enter.prevent="addItem"
          :spellcheck="false"
          auto-grow
          full-width
          class="desc-text-field roboto-font"
          autocomplete="off"
          label="Describe your notes..."
          v-model="details.description"
          solo
        ></v-textarea>
      </v-col>
    </v-form>
    <v-btn
      v-if="mode === 'add'"
      :disabled="disableBtn"
      :loading="loadingAdd"
      class="p-absolute publish-btn text-capitalize"
      color="primary"
      @click="addItem"
    >Publish</v-btn>
    <v-btn
      v-if="mode === 'edit'"
      :loading="loading"
      :disabled="disableBtn"
      class="p-absolute publish-btn text-capitalize"
      color="primary"
      @click="editItem"
    >Update</v-btn>
  </v-container>
</template>

<script>
import { db } from "../firebase/db";
export default {
  name: "AddNotes",
  data() {
    return {
      details: {
        title: "",
        description: ""
      },
      disableBtn: true,
      notesData: {},
      note: [],
      mode: "add",
      createdNote: false,
      editedNote: false,
      loading: false,
      loadingAdd: false,
    };
  },
  watch: {
    details: {
      handler() {
        const { title, description } = this.details;
        if (title.length > 0 && description.length > 0) {
          this.disableBtn = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.mode = "edit";
      this.getItemData(id);
    }
  },
  methods: {
    async addItem() {
      const { title, description } = this.details;
      if (title && description) {
        await db.collection("Notes").add({
          title: title,
          description: description,
          completed: false
          })
          .then(() => {
            this.$router.push({ name: 'Notes' })
          });
      }
    },
    getItemData(id) {
      // const { title, description } = this.details;
      console.log('id', id)
      db.collection("Notes")
      .doc(id)
      .get()
      .then((res) => {
        console.log(res.data())
        res.data.map((item) => {
          console.log(item)
        })
        // res.data().forEach((doc) => {
        //   this.notesData.push({
        //     id: doc.id,
        //     title: title,
        //     description: description
        //   })
        // })
      })
      // .then((res) => {
      //   console.log(res.id, '=>', res.data());
      //   this.details = this.notesList.filter(note => note.id === id)[0];
      // })
      .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    editItem() {
      const { title, description } = this.details;
      const { id } = this.$route.params;

      db.collection("Notes").doc(id).update({
        title: title,
        description: description
      })
    },
  },
  firestore: {
    Notes: db.collection("Notes")
  }
};
</script>

<style scoped>
label {
  height: 100%;
}

.title-text-field >>> .v-input__slot {
  padding: 1rem 3rem !important;
  background: none !important;
  box-shadow: none !important;
}
.title-text-field >>> label {
  font-size: 1.8rem;
}
.title-text-field >>> input {
  font-size: 1.8rem;
  font-weight: 400;
  padding-bottom: 1.2rem;
  height: 40px;
}
.desc-text-field-container {
  margin-top: -3rem;
}
.desc-text-field >>> .v-input__slot {
  padding: 1rem 3rem !important;
  background: none !important;
  box-shadow: none !important;
}
.desc-text-field >>> label {
  font-size: 1.6rem;
}
.desc-text-field >>> textarea {
  font-size: 1.6rem;
  position: relative;
  padding: 9px 12px 0px 0px;
}
.publish-btn {
  font-size: 1.4rem !important;
  font-weight: 400;
  z-index: 5;
  margin-left: 3rem;
}
</style>
