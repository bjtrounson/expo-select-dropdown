import SelectDropdown from './components/SelectDropdown';
import DropdownData from "./interfaces/DropdownData";
import {useState} from "react";
import {View, StyleSheet} from "react-native";

export default function App() {
  const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);
  const [data] = useState<DropdownData<string, string>[]>([
      {key: "1", value: "Toothbrush"}, {key: "2", value: "Laptop"}, {key: "3", value: "Sunglasses"},
      {key: "4", value: "Baseball"}, {key: "5", value: "Scissors"}, {key: "6", value: "Bicycle"},
      {key: "7", value: "Camera"}, {key: "8", value: "Umbrella"}, {key: "9", value: "Backpack"},
      {key: "10", value: "Water bottle"}, {key: "11", value: "Headphones"}, {key: "12", value: "Car keys"},
  ]);
  return (
      <View style={styles.container}>
          <SelectDropdown
              data={data}
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
