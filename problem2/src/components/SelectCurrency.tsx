import { Popover, Image } from "antd";
import { getFirstChars } from "../utils/helper";
import SelectOption from "./SelectOption";
interface SelectCurrencyProps {
    dataSource?: Array<{ value: string; label: string, code: string }>;
    selectedCountry: { code: string, name: string, value: string };
    handleSelectCountry: (countryCode: string) => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectCurrency = ({
    dataSource,
    selectedCountry,
    handleSelectCountry,
    open,
    setOpen,
}: SelectCurrencyProps) => {
    return (
        <Popover
            content={<SelectOption
                dataSource={dataSource}
                onSelect={handleSelectCountry}
                open={open}
                setOpen={setOpen}
            />}
            title=""
            trigger="click"
            open={open}
            onOpenChange={setOpen}
        >
            <div className="flex flex-row cursor-pointer justify-center items-center gap-2 border-0 p-0 m-0">
                <Image
                    src={`https://img.geonames.org/flags/x/${getFirstChars(selectedCountry.code, 2)}.gif`}
                    width={30}
                    preview={false}
                />
                <h5>{selectedCountry.name}</h5>
            </div>
        </Popover>
    );
};

export default SelectCurrency;
