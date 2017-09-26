const functions = require('firebase-functions')
const admin = require('firebase-admin')
const vision = require('@google-cloud/vision')()

admin.initializeApp(functions.config().firebase)

exports.isHotdog = functions.storage.object()
  .onChange(event => {
    const object = event.data

    // Exit if it a deletion or deployment event.
    if (object.resourceState === 'not_exists' || !object.name) {
      return console.error('This is a deletion/deploy event.')
    }

    // File reference on Google Cloud Storage
    const file = `gs://${object.bucket}/${object.name}`

    // Use Google Cloud Vision API to detect labels from the file image
    return vision.labelDetection({
      source: { imageUri: file }
    })
    .then(response => {
      // Take all label annotations from response
      const labels = response[0].labelAnnotations

      // Check if a label is named 'Hot dog'
      let isHotdog = false
      for (let label of labels) {
        if (label.description === 'hot dog') {
          isHotdog = true
          return
        }
      }

      // Place the value in database to update the view
      return admin.database().ref('/upload/photo').update({ isHotdog })
    })
  })
