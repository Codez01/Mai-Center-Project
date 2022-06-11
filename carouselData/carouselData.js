import { db } from "../Database/firebase-config";
import { ref, set, onValue } from "firebase/database";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import * as React from "react";
//-------------------------------------------------------

export const getEvents = async () => {
  //get events from firebase
  var EventsData = ref(db, `Events`); //events route in firebase
  var events = []; //events stored in the firebase database

  await new Promise((resolve) => {
    onValue(EventsData, function async(snapshot) {
      //wait for all the events to Load

      snapshot.forEach(function (childSnapshot) {
        const childData = childSnapshot.val();
        var obj = childData;
        events.push(obj); //push data from firebase to the app
        resolve(childSnapshot.val()); //resolve each child when done
      });
    });
  });

  return events; //return events
};
