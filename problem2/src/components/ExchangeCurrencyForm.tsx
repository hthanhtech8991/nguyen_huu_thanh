import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input, Space } from "antd";
import { SwapOutlined } from '@ant-design/icons';
import SelectCurrency from './SelectCurrency';
import dummySymbols from '../dummyData/dummySymbols.json';
import exchangeRates from '../dummyData/dummyRate.json';

type TypeCountries = {
  code: string;
  value: string;
  label: string;
}[];

const ExchangeCurrencyForm = () => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [selectedExchangeCurrencyFrom, setSelectedExchangeCurrencyFrom] = useState<any>({ code: "jpy", name: "Japanese Yen", value: "jpy" });
  const [selectedExchangeCurrencyTo, setSelectedExchangeCurrencyTo] = useState<any>({ code: "vnd", name: "Vietnam", value: "vnd" });
  const [amountExchangeCurrencyFrom, setAmountExchangeCurrencyFrom] = useState<any>('');
  const [amountExchangeCurrencyTo, setAmountExchangeCurrencyTo] = useState<any>('');

  const countries: TypeCountries = useMemo(() => {
    return Object.keys(dummySymbols).map(code => ({
      code,
      value: code,
      label: dummySymbols[code],
    }));
  }, []);

  useEffect(() => {
    if (amountExchangeCurrencyFrom !== '' && !isNaN(amountExchangeCurrencyFrom)) {
      setAmountExchangeCurrencyTo(calculateAmount(parseFloat(amountExchangeCurrencyFrom), selectedExchangeCurrencyFrom.value, selectedExchangeCurrencyTo.value));
    }
  }, [selectedExchangeCurrencyTo, amountExchangeCurrencyFrom, selectedExchangeCurrencyFrom]);

  const calculateAmount = (amount: number, fromCurrency: string, toCurrency: string): string => {
    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      return (amount * rate).toLocaleString();
    }
    return '';
  };

const handleSelectCountry = useCallback((countryCode: string, isFrom: boolean) => {
  const country = countries.find((c) => c.code === countryCode);

  if (country) {
    const updatedCountry = {
      code: country.code.toLowerCase(),
      name: country.label,
      value: country.value.toLowerCase(),
    };

    if (isFrom) {
      setSelectedExchangeCurrencyFrom(updatedCountry);
      setOpenFrom(false);
    } else {
      setSelectedExchangeCurrencyTo(updatedCountry);
      setOpenTo(false);
    }
  }
}, [countries]);

  const handleSwapCurrencies = () => {
    setSelectedExchangeCurrencyFrom((prev: any) => ({
      ...prev,
      code: selectedExchangeCurrencyTo.code,
      name: selectedExchangeCurrencyTo.name,
      value: selectedExchangeCurrencyTo.value,
    }));
    setSelectedExchangeCurrencyTo((prev: any) => ({
      ...prev,
      code: selectedExchangeCurrencyFrom.code,
      name: selectedExchangeCurrencyFrom.name,
      value: selectedExchangeCurrencyFrom.value,
    }));

    if (!isNaN(amountExchangeCurrencyFrom) && amountExchangeCurrencyFrom !== '') {
      setAmountExchangeCurrencyTo(calculateAmount(parseFloat(amountExchangeCurrencyFrom), selectedExchangeCurrencyFrom.value, selectedExchangeCurrencyTo.value));
    }
    if (!isNaN(amountExchangeCurrencyTo) && amountExchangeCurrencyTo !== '') {
      setAmountExchangeCurrencyFrom(calculateAmount(parseFloat(amountExchangeCurrencyTo), selectedExchangeCurrencyTo.value, selectedExchangeCurrencyFrom.value));
    }
  };

  const handleAmountFromChange = async (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setAmountExchangeCurrencyFrom(numericValue);
      setAmountExchangeCurrencyTo(calculateAmount(numericValue, selectedExchangeCurrencyFrom.value, selectedExchangeCurrencyTo.value));
    } else {
      setAmountExchangeCurrencyFrom('');
      setAmountExchangeCurrencyTo('');
    }
  };

  const handleAmountToChange = useCallback(async (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setAmountExchangeCurrencyTo(numericValue);
      setAmountExchangeCurrencyFrom(calculateAmount(numericValue, selectedExchangeCurrencyTo.value, selectedExchangeCurrencyFrom.value));
    } else {
      setAmountExchangeCurrencyFrom('');
      setAmountExchangeCurrencyTo('');
    }
  }, [selectedExchangeCurrencyFrom, selectedExchangeCurrencyTo]);

  return (
    <motion.div className="flex flex-col sm:px-4 md:px-8 lg:px-16 xl:px-32"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-blue-400 text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">Currency Converter</h2>

  <motion.div
    className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white shadow-lg p-4 sm:p-6 rounded-md items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <Space.Compact className="w-full sm:w-auto">
      <div className="flex flex-col items-start gap-2 w-full sm:w-full">
        <label className='text-zinc-800'>Amount</label>
        <Space.Compact className="w-full">
          <Input
            value={amountExchangeCurrencyFrom}
            onChange={(e) => handleAmountFromChange(e.target.value)}
            addonAfter={<SelectCurrency
              dataSource={countries}
              selectedCountry={selectedExchangeCurrencyFrom}
              handleSelectCountry={(code) => handleSelectCountry(code, true)}
              open={openFrom}
              setOpen={setOpenFrom}
            />}
            allowClear size="large" placeholder="Enter amount"
          />
        </Space.Compact>
      </div>
    </Space.Compact>

    <div className='flex flex-col items-center gap-4'>
    <label>&nbsp;</label>

      <motion.div
        className="swap-button text-blue-500"
        onClick={handleSwapCurrencies}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SwapOutlined className="text-2xl text-current cursor-pointer" />
      </motion.div>
    </div>

    <Space.Compact className="w-full sm:w-auto">
      <div className="flex flex-col items-start gap-2 w-full sm:w-full">
        <label className='text-zinc-800'>Amount</label>
        <Space.Compact className="w-full">
          <Input
            value={amountExchangeCurrencyTo}
            onChange={(e) => handleAmountToChange(e.target.value)}
            addonAfter={<SelectCurrency
              dataSource={countries}
              selectedCountry={selectedExchangeCurrencyTo}
              handleSelectCountry={(code) => handleSelectCountry(code, false)}
              open={openTo}
              setOpen={setOpenTo}
            />}
            allowClear size="large" placeholder="Enter amount"
          />
        </Space.Compact>
      </div>
    </Space.Compact>
  </motion.div>
</motion.div>

  );
};

export default memo(ExchangeCurrencyForm);
