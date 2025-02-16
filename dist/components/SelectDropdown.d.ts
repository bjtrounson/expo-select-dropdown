import React from 'react';
import { TextInputProps, ViewStyle } from "react-native";
import DropdownData from "../interfaces/DropdownData";
import { TagData } from "../interfaces/TagData";
export interface SelectDropdownProps {
    testID?: string;
    testIDDropdown?: string;
    data: DropdownData<any, any>[];
    placeholder: string;
    selected: DropdownData<any, any> | null;
    setSelected: (selected: DropdownData<any, any>) => void;
    usePressable?: boolean;
    tags?: TagData[];
    searchOptions?: TextInputProps;
    searchBoxStyles?: ViewStyle;
    dropdownStyles?: ViewStyle;
}
export default function SelectDropdown({ testID, testIDDropdown, data, tags, placeholder, searchOptions, selected, setSelected, searchBoxStyles, dropdownStyles, usePressable }: SelectDropdownProps): React.JSX.Element;
