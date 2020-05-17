import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

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
    body.id = create_UUID();

    await admin
      .firestore()
      .collection("maps")
      .add(body);

    response.send("map created");
  }
);

export const getMapList = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    // response.set("Access-Control-Allow-Origin", origin);

    let res: any = [];
    const ref = admin.firestore().collection("maps");

    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        res.push(doc.data());
      });
      response.send(res.filter((r: any) => r.id).map((r: any) => r.id));
    });
  }
);
