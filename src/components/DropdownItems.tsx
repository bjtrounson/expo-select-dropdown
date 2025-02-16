import {Text, StyleSheet, Pressable} from "react-native";
import DropdownData from "../interfaces/DropdownData";

interface DropdownItemsProps {
    items: DropdownData<any,any>[];
    item: DropdownData<any, any>;
    index: number;
    select: (item: DropdownData<any, any>) => void;
    usePressable?: boolean;
}

export default function DropdownItem({items, item, index, select, usePressable}: DropdownItemsProps) {
    if (usePressable) return (
        <Pressable
            testID={`dropdown-item-${item.key}`}
            key={item.key}
            style={[style.container, index === 0 && style.firstItem, index === items.length - 1 && style.lastItem]}
            onPress={() => select(item)}
        >
            <Text style={style.text}>
                {item.value}
            </Text>
        </Pressable>
    );

    return (
        <Pressable
            testID={`dropdown-item-${item.key}`}
            key={item.key}
            style={[style.container, index === 0 && style.firstItem, index === items.length - 1 && style.lastItem]}
            onPress={() => select(item)}
        >
            <Text style={style.text}>
                {item.value}
            </Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
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
