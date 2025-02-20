"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectDropdown;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_2 = require("react");
var vector_icons_1 = require("@expo/vector-icons");
var TagFilter_1 = __importDefault(require("./TagFilter"));
var DropdownItems_1 = __importDefault(require("./DropdownItems"));
function SelectDropdown(_a) {
    var testID = _a.testID, testIDDropdown = _a.testIDDropdown, data = _a.data, tags = _a.tags, placeholder = _a.placeholder, searchOptions = _a.searchOptions, selected = _a.selected, setSelected = _a.setSelected, searchBoxStyles = _a.searchBoxStyles, dropdownStyles = _a.dropdownStyles, usePressable = _a.usePressable;
    var _b = (0, react_2.useState)(""), value = _b[0], setValue = _b[1];
    var _c = (0, react_2.useState)(data), filteredData = _c[0], setFilteredData = _c[1];
    var _d = (0, react_2.useState)(false), isDropdownOpen = _d[0], setIsDropdownOpen = _d[1];
    var _e = (0, react_2.useState)(false), isFilterOpen = _e[0], setIsFilterOpen = _e[1];
    var dropdownHeight = (0, react_2.useRef)(new react_native_1.Animated.Value(0)).current;
    var resetData = function () {
        setFilteredData(data);
        setValue("");
    };
    var onSelect = function (item) {
        setSelected(item);
        setValue(item.value);
        onDropdownToggle(false);
    };
    var onDropdownToggle = function (open) {
        if (open) {
            setIsDropdownOpen(open);
            react_native_1.Animated.timing(dropdownHeight, {
                toValue: 200,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
        else {
            react_native_1.Animated.timing(dropdownHeight, {
                toValue: 10,
                duration: 600,
                useNativeDriver: false
            }).start(function () { return setIsDropdownOpen(open); });
        }
    };
    var onSearching = function (text) {
        setValue(text);
        var filtered = data.filter(function (item) { return item.value.toLowerCase().includes(text.toLowerCase()); });
        setFilteredData(filtered);
    };
    return (<>
            {isDropdownOpen ? (<react_native_1.View testID={testID} style={[style.dropdownSearchBox, searchBoxStyles]}>
                    <vector_icons_1.MaterialIcons style={style.searchIcon} name="search" size={24} color="black"/>
                    <react_native_1.View style={style.searchDivider}/>
                    <react_native_1.TextInput placeholder={placeholder} style={style.dropdownSearchInput} value={value} onChangeText={onSearching} {...searchOptions}/>
                    <vector_icons_1.MaterialIcons style={style.exitIcon} name={"close"} size={24} color="black" onPress={function () { return onDropdownToggle(false); }}/>
                </react_native_1.View>) : (<react_native_1.TouchableOpacity testID={testID} onPress={function () { return onDropdownToggle(true); }} style={[style.dropdownSearchBox, searchBoxStyles]}>
                    <react_native_1.Text style={style.selectedText}>
                        {selected ? selected.value : placeholder}
                    </react_native_1.Text>
                    <vector_icons_1.MaterialIcons style={style.exitIcon} name="keyboard-arrow-down" size={24} color="black"/>
                </react_native_1.TouchableOpacity>)}
            {isDropdownOpen ? <react_native_1.Animated.View testID={testIDDropdown} style={[
                style.dropdown,
                { maxHeight: dropdownHeight },
                dropdownStyles
            ]}>

                <react_native_1.FlatList style={style.dropdownScroll} contentContainerStyle={{ paddingVertical: 10, overflow: 'hidden' }} nestedScrollEnabled={true} data={filteredData} keyExtractor={function (item, index) { return index.toString(); }} ListHeaderComponent={<TagFilter_1.default tags={tags} isFilterOpen={isFilterOpen} setIsFilterOpen={function () {
                    setIsFilterOpen(!isFilterOpen);
                    resetData();
                }} setFilteredData={setFilteredData} resetData={resetData}/>} renderItem={function (_a) {
                var item = _a.item, index = _a.index;
                if (filteredData.length === 0) {
                    return (<react_native_1.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <react_native_1.Text style={{ color: "gray" }}>No results found</react_native_1.Text>
                                </react_native_1.View>);
                }
                return (<DropdownItems_1.default key={index} index={index} items={filteredData} item={item} select={onSelect} usePressable={usePressable}/>);
            }}>
                </react_native_1.FlatList>
            </react_native_1.Animated.View> : null}
        </>);
}
var style = react_native_1.StyleSheet.create({
    dropdown: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "black",
        marginTop: 4,
    },
    dropdownScroll: {
        flexDirection: "column",
        paddingHorizontal: 8,
    },
    dropdownSearchBox: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "black",
        paddingHorizontal: 8,
        paddingVertical: 4,
        minHeight: 30,
    },
    dropdownSearchInput: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        marginLeft: 8,
    },
    selectedText: {
        flexGrow: 1,
        color: "#3F3F46",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        marginVertical: "auto",
        marginLeft: 8,
        paddingVertical: 4,
    },
    searchIcon: {
        paddingVertical: 4,
        paddingRight: 6,
        marginVertical: "auto"
    },
    exitIcon: {
        alignSelf: "center"
    },
    searchDivider: {
        marginVertical: 4,
        borderRightWidth: 1,
        borderColor: "#E4E4E7"
    }
});
