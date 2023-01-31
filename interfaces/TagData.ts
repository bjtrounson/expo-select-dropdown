import DropdownData from "./DropdownData";

export interface TagData {
    key: any;
    name: string;
    onFilter: () => DropdownData<any, any>[] | undefined;
}
