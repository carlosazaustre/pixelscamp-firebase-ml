<template>
  <div>
    <label class="cameraBtn" for="image">📷</label>
    <input type="file" id="image" v-on:change="uploadImage" />
    <progress v-if="uploadValue < 100" v-bind:value="uploadValue" max="100">
      {{ uploadValue }} %
    </progress>
    <figure v-if="uploadValue === 100" class="imageContainer">
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
      imageUrl: null,
      uploadValue: 0
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
        .ref('/upload')
        .on('value', snapshot => {
          let isHotdog = snapshot.val().photo.isHotdog
          this.$emit('upload', { isHotdog })
        })
    },

    detachListeners () {
      firebase.database().ref('/upload').off()
    },

    uploadImage (event) {
      const file = event.target.files[0]
      const task = firebase.storage().ref(`/uploads/${file.name}`).put(file)
      
      task.on('state_changed', snapshot => {
          // Changes while the file is uploading
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, error => {
          // An error happens
          return console.error(error.message)
        }, () => {
          // Upload completed
          this.uploadValue = 100
          this.imageUrl = task.snapshot.downloadURL
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
  progress {
    display: block;
    position: absolute;
    top: 50vh;
    bottom: 50vh;
    width: 100%;
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

