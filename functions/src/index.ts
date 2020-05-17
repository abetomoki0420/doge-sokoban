import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// const origin = "doge-sokoban.web.app";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getMap = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  // response.set("Access-Control-Allow-Origin", origin);
  const id = request.query.id;

  let res: any;
  const ref = admin
    .firestore()
    .collection("maps")
    .where("id", "==", id);

  ref.get().then(snapshot => {
    snapshot.forEach(doc => {
      res = doc.data();
    });
    response.send(res);
  });
});

export const createMap = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "*");
    // response.set("Access-Control-Allow-Origin", origin);

    const body = request.body;

    await admin
      .firestore()
      .collection("maps")
      .add(body);

    response.send("map created");
  }
);
