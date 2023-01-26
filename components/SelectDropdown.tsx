import {
    ScrollView,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";

export interface DropdownData<T, U> {
    key: T;
    value: U;
}

interface DropdownItemsProps<T, U> {
    items: DropdownData<T, U>[];
    select: (item: DropdownData<T, U>) => void;
}

function DropdownItems({items, select}: DropdownItemsProps<string, string>) {
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
                    className={`flex-row items-center justify-between ${index === 0 ? "pb-2" : "py-2"} grow ${index + 1 < items.length ? "border-b border-zinc-200" : null}`}
                    onPress={() => select(item)}
                >
                    <Text className={"px-3 text-zinc-700 text-base flex-[1] font-medium"}>
                        {item.value}
                    </Text>
                </TouchableOpacity>
            ))}
        </>
    )
}


interface SelectDropdownProps {
    data: DropdownData<string, string>[]
    placeholder: string
    selected: DropdownData<string, string> | null
    setSelected: (selected: DropdownData<string, string>) => void
    searchOptions?: TextInputProps
    searchBoxStyles?: ViewStyle
    dropdownStyles?: ViewStyle
}

export default function SelectDropdown({data, placeholder, searchOptions, selected, setSelected, searchBoxStyles, dropdownStyles}: SelectDropdownProps) {
    const [value, setValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<DropdownData<string, string>[]>(data);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    const dropdownHeight = useSharedValue(200);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    }

    const style = useAnimatedStyle(() => {
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
                <View className={"flex-row border-2 rounded-md px-2 p-1"} style={[{minHeight: 30}, searchBoxStyles]}>
                    <MaterialIcons name="search" size={24} color="black" />
                    <TextInput
                        placeholder={placeholder}
                        className={"p-0 m-0 ml-2 grow"}
                        value={value}
                        onChangeText={onSearching}
                        {...searchOptions}
                    />
                    <MaterialIcons name={"close"} size={24} color="black" onPress={onDropdownToggle} />
                </View>
            ) : (
                <TouchableOpacity
                    onPress={onDropdownToggle}
                    className={"flex-row border-2 rounded-md px-2 p-1"}
                    style={[{minHeight: 30}, searchBoxStyles]}
                >
                    <Text className={"text-zinc-700 text-base flex-[1] font-medium my-auto grow ml-2"}>{selected ? selected.value : placeholder}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>
            )}
            <Animated.View className={"border-2 rounded-md mt-1"} style={[{display: isAnimationFinished ? "none" : "flex"}, style, dropdownStyles]}>
                <ScrollView
                    className={`flex-col px-2`}
                    contentContainerStyle={{paddingVertical: 10, overflow:'hidden'}}
                    nestedScrollEnabled={true}
                >
                    <DropdownItems items={filteredData} select={onSelect} />
                </ScrollView>
            </Animated.View>
        </>
    )
}
