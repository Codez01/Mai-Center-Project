import { db } from "../Database/firebase-config";
import { ref, set, onValue } from "firebase/database";
import * as React from "react";
//-------------------------------------------------------

export const getDrivingRights = async () => {
  //get events from firebase
  var Rights = ref(db, `Rights/DrivingRights`); //Rights route in firebase
  var DrivingRights = []; //Rights stored in the firebase database

  await new Promise((resolve) => {

    onValue(Rights, function async(snapshot) {
      //wait for all the Rights to Load

      snapshot.forEach(function (childSnapshot) {
        const childData = childSnapshot.val();
        var obj = childData;
        DrivingRights.push(obj); //push data from firebase to the app
        resolve(childSnapshot.val()); //resolve each child when done
      });
    });
  });

  return DrivingRights; //return Rights
};
