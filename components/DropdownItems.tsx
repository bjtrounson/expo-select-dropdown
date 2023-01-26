import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import DropdownData from "../interfaces/DropdownData";

interface DropdownItemsProps<T, U> {
    items: DropdownData<T, U>[];
    select: (item: DropdownData<T, U>) => void;
}

export default function DropdownItems({items, select}: DropdownItemsProps<string, string>) {
    if (items.length === 0) return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "gray"}}>No results found</Text>
        </View>
    )

    return (
        <>
            {items.map((item, index) => (
                <TouchableOpacity
                    key={item.key}
                    style={[style.container, index === 0 && style.firstItem, index === items.length - 1 && style.lastItem]}
                    onPress={() => select(item)}
                >
                    <Text style={style.text}>
                        {item.value}
                    </Text>
                </TouchableOpacity>
            ))}
        </>
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
