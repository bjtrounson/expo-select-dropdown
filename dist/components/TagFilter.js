import { View, StyleSheet, ScrollView, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
const TagFilter = ({ tags, isFilterOpen, setIsFilterOpen, setFilteredData, resetData }) => {
    const [filterEnabled, setFilterEnabled] = useState(null);
    useEffect(() => {
        if (filterEnabled != null && tags) {
            const filteredData = tags[filterEnabled].onFilter();
            setFilteredData(filteredData ? filteredData : []);
        }
        else
            resetData();
    }, [filterEnabled]);
    if (!tags)
        return null;
    return (<View style={style.dropdownOptions}>
            <MaterialCommunityIcons style={{ flexGrow: 1, marginVertical: "auto" }} name={isFilterOpen ? "filter" : "filter-outline"} size={20} onPress={setIsFilterOpen}/>
            <ScrollView style={{ display: isFilterOpen ? "flex" : "none" }}>
                {tags.map((tag, index) => (<View style={{ flexDirection: "row", marginLeft: "auto" }} key={index}>
                        {filterEnabled === index ? (<MaterialIcons style={{ alignSelf: "center", marginRight: 2 }} onPress={() => setFilterEnabled(null)} name="radio-button-checked" size={15} color="black"/>)
                : (<MaterialIcons style={{ alignSelf: "center", marginRight: 2 }} onPress={() => setFilterEnabled(index)} name="radio-button-unchecked" size={15} color="black"/>)}
                        <Text>{tag.name}</Text>
                    </View>))}
            </ScrollView>
        </View>);
};
const style = StyleSheet.create({
    dropdownOptions: {
        flex: 1,
        flexDirection: "row",
        padding: 4,
        borderBottomWidth: 1,
        borderColor: "#E4E4E7"
    }
});
export default TagFilter;
//# sourceMappingURL=TagFilter.js.map