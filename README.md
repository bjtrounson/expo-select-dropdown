|                                                                                                                                                        |                                                                                                                                                                                                           |                                                                                                                                                                                                                             |                                                                                                                                                    |                                                                                                                                                                                    |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <a href="https://www.npmjs.com/package/expo-select-dropdown">![NPM VERSION](https://img.shields.io/npm/v/expo-select-dropdown?style=for-the-badge)</a> | <a href="https://www.npmjs.com/package/expo-select-dropdown">![NPM WEEKLY DOWNLOADS](https://img.shields.io/npm/dw/expo-select-dropdown?color=%232CA215&label=WEEKLY%20DOWNLOADS&style=for-the-badge)</a> | <a href="https://github.com/danish1658/react-native-dropdown-select-list/stargazers">![GITHUB STAR](https://img.shields.io/github/stars/bjtrounson/expo-select-dropdown?label=Give%20Us%20A%20Star&style=for-the-badge)</a> | <a href="https://www.npmjs.com/package/expo-select-dropdown">![LICENSE](https://img.shields.io/npm/l/expo-select-dropdown?style=for-the-badge)</a> | <a href="https://www.npmjs.com/package/expo-select-dropdown">![NPM LIFETIME DOWNLOADS](https://img.shields.io/npm/dt/expo-select-dropdown?color=%232CA215&style=for-the-badge)</a> |

<h1 align="center">
Expo / React Native Select Dropdown
</h1>

<h3>Installation</h3>
<h4> Dependencies </h4>
This library current requires Reanimated v2 please install using there official <a href="https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation">documentation link</a> (This dependency will probably be remove later)

    npm install expo-select-dropdown
OR

    yarn add expo-select-dropdown
<h2>Example</h2>
![](https://i.imgur.com/85xkCdR.gif)

<h2>Usage</h2>

    import {SelectDropdown, DropdownData} from "expo-select-dropdown";
    
    export default function App() {  
     const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);  
     const [data] = useState<DropdownData<string, string>[]>([  
          {key: "1", value: "Toothbrush"}, 
          {key: "2", value: "Laptop"}, 
          {key: "3", value: "Sunglasses"},  
	      {key: "4", value: "Baseball"}, 
	      {key: "5", value: "Scissors"}, 
	      {key: "6", value: "Bicycle"},  
	      {key: "7", value: "Camera"}, 
	      {key: "8", value: "Umbrella"}, 
	      {key: "9", value: "Backpack"},  
	      {key: "10", value: "Water bottle"}  
     ]);
       
     return (  
          <SelectDropdown  
		      data={data}  
              placeholder={"Select option"}  
              selected={selected}  
              setSelected={setSelected}  
              searchOptions={{cursorColor: "#007bff"}}  
              searchBoxStyles={{borderColor: "#007bff"}}  
              dropdownStyles={{borderColor: "#007bff"}}  
          />  
      );  
    }

<h2>SelectDropdownProps</h2>

    interface SelectDropdownProps {  
	    data: DropdownData<any, any>[]  
	    placeholder: string  
	    selected: DropdownData<any, any> | null  
	    setSelected: (selected: DropdownData<any, any>) => void  
	    searchOptions?: TextInputProps  
        searchBoxStyles?: ViewStyle  
        dropdownStyles?: ViewStyle  
    }


**Work In Progress**
- [ ] Filter option added for searching items (optional)
- [ ]  Tags for the filters
- [ ] Make search setting optional
- [ ] Improved default styling
- [ ] Dependency clean up

