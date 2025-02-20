import { SafeAreaView, Text, View } from 'react-native';
import { SelectDropdown, DropdownData } from 'expo-select-dropdown';
import { useState } from 'react';
const SAMPLE_DATA : DropdownData<string, string>[] = [
  {key: '1', value: 'Item 1'},
  {key: '2', value: 'Item 2'},
  {key: '3', value: 'Item 3'},
];

export default function App() {
  const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Expo Select Dropdown Example</Text>
        <Group name="Views">
          <SelectDropdown
            data={SAMPLE_DATA}
            placeholder="Select an item"
            selected={selected}
            setSelected={setSelected}
            noResultsText="No results found"
            searchOptions={{
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
        </Group>
      </View>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
