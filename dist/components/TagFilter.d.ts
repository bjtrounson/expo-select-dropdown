import { TagData } from "../interfaces/TagData";
import DropdownData from "../interfaces/DropdownData";
interface TagFilterProps {
    tags: TagData[] | null | undefined;
    isFilterOpen: boolean;
    setIsFilterOpen: () => void;
    setFilteredData: (data: DropdownData<any, any>[]) => void;
    resetData: () => void;
}
declare const TagFilter: ({ tags, isFilterOpen, setIsFilterOpen, setFilteredData, resetData }: TagFilterProps) => import("react").JSX.Element | null;
export default TagFilter;
