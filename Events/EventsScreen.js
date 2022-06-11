import Events from "./Events";
import { getEvents } from "./api";
import * as React from "react";
import { Text, View } from "react-native";

function EventsScreen({ navigation }) {
  //====== navigation to event details by clicking on "Details button" =====//
  const pressHandler = (arg) => () => {
    navigation.navigate("EventsDetails", { selectEvent: arg });
  };

  const [events, setEvents] = React.useState([]);
  const [NoEvents, setNoEvents] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      if (events.length == 0) {
        setNoEvents(true);
      } else {
        setNoEvents(false);
      }
      //  to make space before and after the card //
      setEvents([{ key: "empty-left" }, ...events, { key: "empty-right" }]);
    };

    if (events.length === 0) {
      fetchData(events);
    }
  }, [events]);

  //========= pass events data to Events component  ======//

  //if there aren't any events , display text mentioning that there aren't any events ATM.
  return NoEvents ? (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          marginTop: "90%",
          fontWeight: "bold",
        }}
      >
        No Events At The Moment...
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: "10%",
          fontWeight: "bold",
        }}
      >
        אין אירועים כרגע...
      </Text>
    </View>
  ) : (
    <Events events={events} onPress={pressHandler} />
  );
}
export default EventsScreen;
