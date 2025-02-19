import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Space } from "antd";
import { SwapOutlined } from '@ant-design/icons';
import SelectCurrency from './SelectCurrency';
import dummySymbolsJson from '../dummyData/dummySymbols.json';
import exchangeRatesJson from '../dummyData/dummyRate.json';
import bgExchange from '../assets/bg-exchange.webp'

type TypeCountries = {
  code: string;
  value: string;
  label: string;
}[];
const dummySymbols: Record<string, string> = dummySymbolsJson;
const exchangeRates: Record<any, any> = exchangeRatesJson;
const ExchangeCurrencyForm = () => {
  const countries: TypeCountries = useMemo(() => {
    return Object.keys(dummySymbols).map(code => ({
      code,
      value: code,
      label: dummySymbols[code],
    }));
  }, []);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [selectedExchangeCurrencyFrom, setSelectedExchangeCurrencyFrom] = useState<any>(countries[151]);
  const [selectedExchangeCurrencyTo, setSelectedExchangeCurrencyTo] = useState<any>(countries[156]);
  const [amountExchangeCurrencyFrom, setAmountExchangeCurrencyFrom] = useState<any>('');
  const [amountExchangeCurrencyTo, setAmountExchangeCurrencyTo] = useState<any>('');



  useEffect(() => {
    if (amountExchangeCurrencyFrom !== '' && !isNaN(amountExchangeCurrencyFrom)) {
      setAmountExchangeCurrencyTo(calculateAmount(parseFloat(amountExchangeCurrencyFrom), selectedExchangeCurrencyFrom.value, selectedExchangeCurrencyTo.value));
    }
  }, [selectedExchangeCurrencyTo, amountExchangeCurrencyFrom, selectedExchangeCurrencyFrom]);

  const calculateAmount = (amount: number, fromCurrency: string, toCurrency: string): string => {
    const rate = exchangeRates[fromCurrency.toLowerCase()]?.[toCurrency.toLowerCase()];
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
        label: country.label,
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
      label: selectedExchangeCurrencyTo.label,
      value: selectedExchangeCurrencyTo.value,
    }));
    setSelectedExchangeCurrencyTo((prev: any) => ({
      ...prev,
      code: selectedExchangeCurrencyFrom.code,
      label: selectedExchangeCurrencyFrom.label,
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
      <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-start mb-4 text-[#9fe870] responsive-text">Currency Converter</h2>
      <motion.div
        className="bg-cover bg-center shadow-lg pb-4 rounded-3xl sm:rounded-3xl items-center justify-center"
        style={{ backgroundImage: `url(${bgExchange})` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='bg-white flex flex-col rounded-3xl gap-4  p-4 sm:gap-8 bg-white sm:p-6'>
          <motion.div
            className='flex flex-col sm:flex-row  gap-4  rounded-3xl sm:rounded-3xl items-center justify-center'>
            <Space.Compact className="w-full sm:w-auto">
              <div className="flex flex-col items-start gap-2 w-full sm:w-full">
                <label className='text-zinc-500'>Amount</label>
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
                className="text-zinc-500 rotate-90 sm:rotate-0"
                onClick={handleSwapCurrencies}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SwapOutlined className="text-2xl text-current cursor-pointer" />
              </motion.div>
            </div>

            <Space.Compact className="w-full sm:w-auto">
              <div className="flex flex-col items-start gap-2 w-full sm:w-full">
                <label className='text-zinc-500'>Converted to</label>
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
          <div className='flex items-start gap-4 items-center justify-center'>
            <Button className="rounded-4xl" size="large" color="lime" variant="outlined">Track the exchange rate</Button>
            <Button 
              className="bg-[#ff5733] hover:bg-[#e04e2c] border-none text-white rounded-lg"

              color="lime" variant="solid" size="large">Send  money</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>

  );
};

export default memo(ExchangeCurrencyForm);
