const functions = require('firebase-functions')
const admin = require('firebase-admin')
const vision = require('@google-cloud/vision')()

admin.initializeApp()

exports.isHotdog = functions.storage.object()
  .onFinalize((object) => {
    const image = {
      source: {imageUri: `gs://${object.bucket}/${object.name}`}
    }

    // Use Google Cloud Vision API to detect labels from the file image
    return vision.labelDetection(image)
      .then(results => {
        // Take all label annotations from response
        const labels = results[0].labelAnnotations

        // Check if a label is named 'Hot dog'
        let isHotdog = false
        labels.map(label => {
          console.info(results)
          if (label.description === 'hot dog') {
            isHotdog = true
          }
        })

        // Place the value in database to update the view
        return admin.database().ref('/uploads/photo').update({ isHotdog })
      })
  })
