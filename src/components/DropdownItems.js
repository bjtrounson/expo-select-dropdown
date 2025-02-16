"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DropdownItem;
var react_native_1 = require("react-native");
function DropdownItem(_a) {
    var items = _a.items, item = _a.item, index = _a.index, select = _a.select, usePressable = _a.usePressable;
    if (usePressable)
        return (<react_native_1.Pressable testID={"dropdown-item-".concat(item.key)} key={item.key} style={[style.container, index === 0 && style.firstItem, index === items.length - 1 && style.lastItem]} onPress={function () { return select(item); }}>
            <react_native_1.Text style={style.text}>
                {item.value}
            </react_native_1.Text>
        </react_native_1.Pressable>);
    return (<react_native_1.TouchableOpacity testID={"dropdown-item-".concat(item.key)} key={item.key} style={[style.container, index === 0 && style.firstItem, index === items.length - 1 && style.lastItem]} onPress={function () { return select(item); }}>
            <react_native_1.Text style={style.text}>
                {item.value}
            </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
}
var style = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        flexGrow: 1,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    text: {
        flex: 1,
        fontWeight: "500",
        fontSize: 16,
        paddingHorizontal: 12,
        color: "#3F3F46",
    },
    firstItem: {
        paddingBottom: 8,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
});
