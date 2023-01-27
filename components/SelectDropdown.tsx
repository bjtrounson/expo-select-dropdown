import {
    ScrollView,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
    StyleSheet
} from "react-native";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import DropdownItems from "./DropdownItems";
import DropdownData from "../interfaces/DropdownData";

export interface SelectDropdownProps {
    data: DropdownData<any, any>[]
    placeholder: string
    selected: DropdownData<any, any> | null
    setSelected: (selected: DropdownData<any, any>) => void
    searchOptions?: TextInputProps
    searchBoxStyles?: ViewStyle
    dropdownStyles?: ViewStyle
}

export default function SelectDropdown({data, placeholder, searchOptions, selected, setSelected, searchBoxStyles, dropdownStyles}: SelectDropdownProps) {
    const [value, setValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<DropdownData<string, string>[]>(data);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState(true);

    const dropdownHeight = useSharedValue(200);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(dropdownHeight.value, config),
        };
    });

    const onSelect = (item: DropdownData<string, string>) => {
        setSelected(item);
        setValue(item.value);
        onDropdownToggle();
    }

    const onDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        dropdownHeight.value = isDropdownOpen ? 0 : 200;
        if (isDropdownOpen) setTimeout(() => setIsAnimationFinished(isDropdownOpen), 300);
        else setIsAnimationFinished(isDropdownOpen);
    }

    const onSearching = (text: string) => {
        setValue(text);
        const filtered = data.filter((item) => item.value.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    }

    return (
        <>
            { isDropdownOpen ? (
                <View style={[style.dropdownSearchBox, searchBoxStyles]}>
                    <MaterialIcons name="search" size={24} color="black" />
                    <TextInput
                        placeholder={placeholder}
                        style={style.dropdownSearchInput}
                        value={value}
                        onChangeText={onSearching}
                        {...searchOptions}
                    />
                    <MaterialIcons name={"close"} size={24} color="black" onPress={onDropdownToggle} />
                </View>
            ) : (
                <TouchableOpacity
                    onPress={onDropdownToggle}
                    style={[style.selectedButton, searchBoxStyles]}
                >
                    <Text style={style.selectedText}>
                        {selected ? selected.value : placeholder}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>
            )}
            <Animated.View
                style={[
                    {display: isAnimationFinished ? "none" : "flex"},
                    animatedStyle, style.dropdown, dropdownStyles
                ]}>
                <ScrollView
                    style={style.dropdownScroll}
                    contentContainerStyle={{paddingVertical: 10, overflow:'hidden'}}
                    nestedScrollEnabled={true}
                >
                    <DropdownItems items={filteredData} select={onSelect} />
                </ScrollView>
            </Animated.View>
        </>
    )
}

const style = StyleSheet.create({
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
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
        marginVertical: "auto",
        marginLeft: 8,
    },
    selectedButton: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "black",
        paddingHorizontal: 8,
        paddingVertical: 4,
        minHeight: 30,
    },
});

