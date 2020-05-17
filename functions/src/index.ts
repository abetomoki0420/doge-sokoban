import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getMap = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  const id = request.query.id;

  await admin
    .database()
    .ref(`/maps/${id}`)
    .once("value", snapshot => {
      response.send(snapshot);
    });
});
