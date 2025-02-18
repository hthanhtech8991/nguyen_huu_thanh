import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Empty, Image, Input } from 'antd';
import { getFirstChars } from '../utils/helper';
import { SearchOutlined } from '@ant-design/icons';

type SelectOptionType = {
    dataSource?: Array<{ value: string; label: string, code: string }>;
    onSelect?: (value: string) => void;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

const CountrySelect = ({ dataSource = [], onSelect }: SelectOptionType) => {
    const [search, setSearch] = useState('');

    const filteredCountries = dataSource.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase())
    );

    const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div
            style={style}
            className="flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
            onClick={() => {
                onSelect && onSelect(filteredCountries[index].value);
                setSearch('');
            }}
        >
            <Image
                width={30}
                src={`https://img.geonames.org/flags/x/${getFirstChars(filteredCountries[index].code, 2)}.gif`}
            />
            {filteredCountries[index].label}
        </div>
    );

    return (
        <div className="w-64 rounded-lg items-center bg-white justify-center">
            <Input
                prefix={<SearchOutlined className="w-4 h-4 text-gray-500 mr-2" />}
                type="text"
                placeholder="Search..."
                className="w-full outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filteredCountries === null || filteredCountries.length === 0 ? (
                <div className='gap-2 p-4'>
                    <Empty />
                </div>
            ) : <List
                height={300}
                itemCount={filteredCountries.length}
                itemSize={50}
                width={'100%'}
            >
                {renderRow}
            </List>}
        </div>
    );
}

export default CountrySelect;
