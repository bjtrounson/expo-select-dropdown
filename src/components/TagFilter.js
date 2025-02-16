"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var react_1 = require("react");
var TagFilter = function (_a) {
    var tags = _a.tags, isFilterOpen = _a.isFilterOpen, setIsFilterOpen = _a.setIsFilterOpen, setFilteredData = _a.setFilteredData, resetData = _a.resetData;
    var _b = (0, react_1.useState)(null), filterEnabled = _b[0], setFilterEnabled = _b[1];
    (0, react_1.useEffect)(function () {
        if (filterEnabled != null && tags) {
            var filteredData = tags[filterEnabled].onFilter();
            setFilteredData(filteredData ? filteredData : []);
        }
        else
            resetData();
    }, [filterEnabled]);
    if (!tags)
        return null;
    return (<react_native_1.View style={style.dropdownOptions}>
            <vector_icons_1.MaterialCommunityIcons style={{ flexGrow: 1, marginVertical: "auto" }} name={isFilterOpen ? "filter" : "filter-outline"} size={20} onPress={setIsFilterOpen}/>
            <react_native_1.ScrollView style={{ display: isFilterOpen ? "flex" : "none" }}>
                {tags.map(function (tag, index) { return (<react_native_1.View style={{ flexDirection: "row", marginLeft: "auto" }} key={index}>
                        {filterEnabled === index ? (<vector_icons_1.MaterialIcons style={{ alignSelf: "center", marginRight: 2 }} onPress={function () { return setFilterEnabled(null); }} name="radio-button-checked" size={15} color="black"/>)
                : (<vector_icons_1.MaterialIcons style={{ alignSelf: "center", marginRight: 2 }} onPress={function () { return setFilterEnabled(index); }} name="radio-button-unchecked" size={15} color="black"/>)}
                        <react_native_1.Text>{tag.name}</react_native_1.Text>
                    </react_native_1.View>); })}
            </react_native_1.ScrollView>
        </react_native_1.View>);
};
var style = react_native_1.StyleSheet.create({
    dropdownOptions: {
        flex: 1,
        flexDirection: "row",
        padding: 4,
        borderBottomWidth: 1,
        borderColor: "#E4E4E7"
    }
});
exports.default = TagFilter;
