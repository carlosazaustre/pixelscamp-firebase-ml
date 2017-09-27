# Cloud Functions and Machine Learning APIs - PixelsCamp 2018 Talk

## Requirements
* [Node.js v6.x](https://nodejs.org)
* [Firebase Tools](https://www.npmjs.com/package/firebase-tools)

## Libraries Used
* Vue.js v2
* Firebase (Storage, Database and Functions)
* Google-Cloud/Vision
* Browserify with Vueify and Babelify (babel-preset-env) to transpiling
* Yarn as Package Manager

## Setup
1. Create a Firebase project on [Firebase Console](https://console.firebase.google.com)
2. Enable Cloud Storage for Firebase 
3. Enable public access to Cloud Storage for Firebase in your project
```js
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```
4. Enable public access to read in RealTime Database
```js
{
  "rules": {
    ".read": "true",
    ".write": "auth !== null"
  }
}
```
5. Enable [Cloud Vision API in Google Cloud Console](https://console.cloud.google.com/apis/api/vision.googleapis.com/overview) for your project (Requires enable Billing)

## License
MIT (c) 2017 Carlos Azaustre