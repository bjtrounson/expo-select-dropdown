import DropdownData from "../interfaces/DropdownData";
interface DropdownItemsProps {
    items: DropdownData<any, any>[];
    item: DropdownData<any, any>;
    index: number;
    select: (item: DropdownData<any, any>) => void;
    usePressable?: boolean;
}
export default function DropdownItem({ items, item, index, select, usePressable }: DropdownItemsProps): import("react").JSX.Element;
export {};
