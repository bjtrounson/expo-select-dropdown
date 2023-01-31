import SelectDropdown from './components/SelectDropdown';
import DropdownData from "./interfaces/DropdownData";
import {useState} from "react";
import {View, StyleSheet} from "react-native";
import {TagData} from "./interfaces/TagData";

export default function App() {
    const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);
    const data = [
        {key: "1", value: "Toothbrush", location: "Bathroom", date: "2021-05-01", time: "12:00"},
        {key: "2", value: "Laptop", location: "Bathroom", date: "2021-05-01", time: "12:00"},
        {key: "3", value: "Sunglasses", location: "Bedroom", date: "2021-05-01", time: "12:00"},
        {key: "4", value: "Baseball", location: "Bathroom", date: "2021-05-01", time: "12:00"},
        {key: "5", value: "Scissors", location: "Bedroom", date: "2021-06-01", time: "1:00"},
        {key: "6", value: "Bicycle", location: "Bedroom", date: "2021-05-01", time: "12:00"},
        {key: "7", value: "Camera", location: "Bathroom", date: "2021-06-01", time: "1:00"},
        {key: "8", value: "Umbrella", location: "Bedroom", date: "2021-06-01", time: "12:00"},
        {key: "9", value: "Backpack", location: "Bathroom", date: "2021-05-01", time: "1:00"},
        {key: "10", value: "Water bottle", location: "Bedroom", date: "2021-06-01", time: "12:00"},
    ]
    const [tags] = useState<TagData[]>([
        {key: "1", name: "Location", onFilter: () => {
            return data.filter((item) => item.location.toLowerCase().includes("Bathroom".toLowerCase()));
        }},
        {key: "2", name: "Date", onFilter: () => {
            return data.filter((item) => item.date.toLowerCase().includes("2021-05-01".toLowerCase()));
        }},
        {key: "3", name: "Time", onFilter: () => {
            return data.filter((item) => item.time.toLowerCase().includes("12:00".toLowerCase()));
        }}
  ])

  return (
      <View style={styles.container}>
          <SelectDropdown
              data={data.map((item) => {return {key: item.key, value: item.value}})}
              tags={tags}
              placeholder={"Select option"}
              selected={selected}
              setSelected={setSelected}
              searchOptions={{cursorColor: "#007bff"}}
              searchBoxStyles={{borderColor: "#007bff"}}
              dropdownStyles={{borderColor: "#007bff"}}
          />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
});
