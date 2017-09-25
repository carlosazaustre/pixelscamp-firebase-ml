<template>
  <div>
    <label class="cameraBtn" for="image">📷</label>
    <input type="file" id="image" v-on:change="uploadImage" />
    <figure class="imageContainer">
      <img v-bind:src="imageUrl">
    </figure>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app-image',
  data () {
    return {
      imageUrl: null
    }
  },

  created () {
    this.initialize()
  },

  destroyed () {
    this.detachListeners()
  },

  methods: {
    initialize () {
      firebase.database()
        .ref('/uploads')
        .on('value', snapshot => {
          let isHotdog = snapshot.val().photo.isHotdog
          this.$emit('upload', { isHotdog })
        })
    },

    detachListeners () {
      firebase.database().ref('/uploads').off()
    },

    uploadImage (event) {
      const file = event.target.files[0]
      return firebase.storage()
        .ref(`/uploads/${file.name}`)
        .put(file)
        .then(snapshot => {
          this.imageUrl = snapshot.metadata.downloadURLs[0]
        })
    }
  }
}
</script>

<style scoped>
  .cameraBtn {
    background-color: #1149cb;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 1em;
    right: calc(50% - 30px);
  }
  .imageContainer {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  input[type="file"] {
    display: none;
  }
</style>

