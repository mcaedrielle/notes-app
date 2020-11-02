<template>
  <v-container>
    <v-row class="content-row">
      <template v-for="Note in Notes">
        <v-col cols="4" class="content-column" :key="Note.id">
          <v-card class="pa-2 content-card p-relative">
            <div class="d-flex align-center"></div>
            <v-card-title class="break-word content-card-title">{{ Note.title }}</v-card-title>
            <div
              class="grey--text content-card-description roboto-font note-description"
            >{{ Note.description}}</div>
            <div class="p-absolute content-card-actions-container">
              <v-btn
                v-if="!Note.completed"
                icon
                @click="completeNote(Note.id)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="primary" size="20">mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn
                v-if="Note.completed"
                icon
                @click="removeFromCompleteNote(Note.id)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="primary" size="20">mdi-check-circle</v-icon>
              </v-btn>
              <v-btn color="info" icon @click="goToEditNotes(Note.id)">
                <v-icon size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="error" icon>
                <v-icon size="20" @click="deleteItem(Note.id)">mdi-delete-outline</v-icon>
              </v-btn>
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
  name: "Notes",
  data() {
    return {
      Notes: [],
      newItem: "",
    };
  },
  methods: {
    completeNote(id) {
      db.collection("Notes").doc(id).update({
        completed: true
      })
    },
    removeFromCompleteNote(id) {
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
