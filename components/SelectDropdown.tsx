import {
    ScrollView,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
    StyleSheet,
    Animated
} from "react-native";
import {useRef, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import DropdownItems from "./DropdownItems";
import DropdownData from "../interfaces/DropdownData";
import {TagData} from "../interfaces/TagData";
import TagFilter from "./TagFilter";

export interface SelectDropdownProps {
    data: DropdownData<any, any>[]
    placeholder: string
    selected: DropdownData<any, any> | null
    setSelected: (selected: DropdownData<any, any>) => void
    tags?: TagData[]
    searchOptions?: TextInputProps
    searchBoxStyles?: ViewStyle
    dropdownStyles?: ViewStyle
}

export default function SelectDropdown({data, tags, placeholder, searchOptions, selected, setSelected, searchBoxStyles, dropdownStyles}: SelectDropdownProps) {
    const [value, setValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<DropdownData<string, string>[]>(data);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCloseAnimationFinished, setIsCloseAnimationFinished] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const dropdownHeight = useRef(new Animated.Value(0)).current;

    const resetData = () => {
        setFilteredData(data);
        setValue("");
    }

    const onSelect = (item: DropdownData<string, string>) => {
        setSelected(item);
        setValue(item.value);
        onDropdownToggle(false);
    }

    const onDropdownToggle = (open: boolean) => {
        setIsDropdownOpen(open);
        if (open) {
            setIsCloseAnimationFinished(false)
            Animated.timing(dropdownHeight, {
                toValue: 200,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(dropdownHeight, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(({finished}) => setIsCloseAnimationFinished(finished));
        }
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
                    <MaterialIcons style={style.searchIcon} name="search" size={24} color="black" />
                    <View style={style.searchDivider} />
                    <TextInput
                        placeholder={placeholder}
                        style={style.dropdownSearchInput}
                        value={value}
                        onChangeText={onSearching}
                        {...searchOptions}
                    />
                    <MaterialIcons style={style.exitIcon} name={"close"} size={24} color="black" onPress={() => onDropdownToggle(false)} />
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => onDropdownToggle(true)}
                    style={[style.dropdownSearchBox, searchBoxStyles]}
                >
                    <Text style={style.selectedText}>
                        {selected ? selected.value : placeholder}
                    </Text>
                    <MaterialIcons style={style.exitIcon} name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>
            )}
            <Animated.View
                style={[
                    style.dropdown,
                    {display: isCloseAnimationFinished ? "none" : "flex", height: dropdownHeight},
                    dropdownStyles
                ]}>
                <ScrollView
                    style={style.dropdownScroll}
                    contentContainerStyle={{paddingVertical: 10, overflow:'hidden'}}
                    nestedScrollEnabled={true}
                >
                    <TagFilter
                        tags={tags}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={() => {
                            setIsFilterOpen(!isFilterOpen)
                            resetData()
                        }}
                        setFilteredData={setFilteredData}
                        resetData={resetData}
                    />
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

