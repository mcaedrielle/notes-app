<template>
  <v-container>
    <!-- Notes List -->
    <v-row class="content-row">
      <template v-for="Note in Notes">
        <v-col v-if="Note.completed" cols="4" class="content-column" :key="Note.id">
          <v-card class="pa-2 content-card p-relative">
            <div class="d-flex align-center"></div>
            <v-card-title class="break-word content-card-title">{{ Note.title }}</v-card-title>
            <div
              class="grey--text content-card-description roboto-font note-description"
            >{{ Note.description}}</div>
            <div class="p-absolute content-card-actions-container">
              <span>
                <v-btn @click="removeFromCompleted(Note.id)" color="primary">
                  Remove from Completed
                </v-btn>
              </span>
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <div
      v-if="Notes.length === 0"
      class="img-content-container d-flex flex-column align-center"
    >
      <h2 class="img-content-text">
        No notes added yet. Click on the
        <v-icon size="24">mdi-plus-circle-outline</v-icon>&nbsp; button to
        create a new note!
      </h2>
    </div>
  </v-container>
</template>

<script>
import { db } from "../firebase/db";

export default {
  name: "CompletedNotes",
  data() {
    return {
      Notes: [],
      newItem: "",
    };
  },
  methods: {
    removeFromCompleted(id) {
      db.collection("Notes").doc(id).update({
        completed: false
      })
    },
    goToEditNotes(id) {
      this.$router.push({
        name: "EditNotes",
        params: {
          id
        }
      });
    },
    deleteItem(id) {
      db.collection("Notes")
        .doc(id)
        .delete();
    },
    async addItem() {
      if (this.newItem) {
        await db.collection("Notes").add({ title: this.newItem });
        await db.collection("Notes").add({ description: this.newItem });
        this.newItem = "";
      }
    },
  },
  firestore: {
    Notes: db.collection("Notes")
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.note-description {
  padding: 16px;
}
</style>
