import { StatusBar } from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import SelectDropdown, {DropdownData} from './components/SelectDropdown';
import {useState} from "react";

export default function App() {
  const [selected, setSelected] = useState<DropdownData<string, string>>({key: "", value: ""});
  const [data] = useState<DropdownData<string, string>[]>([
      {key: "1", value: "1"}, {key: "2", value: "2"}, {key: "3", value: "3"},
      {key: "4", value: "4"}, {key: "5", value: "5"}, {key: "6", value: "6"},
      {key: "7", value: "7"}, {key: "8", value: "8"}, {key: "9", value: "9"},
      {key: "10", value: "10"}, {key: "11", value: "11"}, {key: "12", value: "12"},
  ]);
  return (
    <SafeAreaView className={"m-8"}>
      <SelectDropdown
          data={data}
          placeholder={"Search for stores"}
          selected={selected}
          setSelected={setSelected}
          searchOptions={{cursorColor: "#007bff"}}
          searchBoxStyles={{borderColor: "#007bff"}}
          dropdownStyles={{borderColor: "#007bff"}}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
