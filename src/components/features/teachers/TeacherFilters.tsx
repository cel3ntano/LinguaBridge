import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchLanguageOptions,
  applyFilters,
} from '@/store/filters/filtersOperations';
import {
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
  resetFilters,
} from '@/store/filters/filtersSlice';
import {
  selectLanguageFilter,
  selectLevelFilter,
  selectPriceFilter,
  selectAvailableLanguages,
  selectIsLoading,
} from '@/store/filters/filtersSelectors';
import Button from '@/components/common/Button';
import CustomSelect from '@/components/common/CustomSelect';
import {
  formatDisplayLevel,
  formatDatabaseLevel,
} from '@/lib/utils/formatters';
import { PRICE_OPTIONS, TEACHER_LEVELS } from '@/constants/teachers';

const TeacherFilters = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguageFilter);
  const level = useAppSelector(selectLevelFilter);
  const price = useAppSelector(selectPriceFilter);
  const languages = useAppSelector(selectAvailableLanguages);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchLanguageOptions());
  }, [dispatch]);

  const handleFiltersChange = useCallback(async () => {
    try {
      await dispatch(applyFilters()).unwrap();
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleFiltersChange();
  }, [language, level, price, handleFiltersChange]);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleLanguageChange = (value: string) => {
    dispatch(
      setLanguageFilter(value === 'all' ? '' : formatDatabaseLevel(value)),
    );
  };

  const handleLevelChange = (value: string) => {
    dispatch(setLevelFilter(value === 'all' ? '' : formatDatabaseLevel(value)));
  };

  const handlePriceChange = (value: string) => {
    dispatch(setPriceFilter(value === 'all' ? null : parseInt(value, 10)));
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:gap-5 sm:flex-row sm:items-end">
        <div className="flex flex-col w-full sm:w-auto">
          <label
            htmlFor="language-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Languages
          </label>
          <CustomSelect
            value={language}
            onChange={handleLanguageChange}
            options={languages.map((lang) => ({
              value: lang,
              label: formatDisplayLevel(lang),
            }))}
            placeholder="All Languages"
            disabled={isLoading}
            width="w-full sm:w-[220px]"
          />
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label
            htmlFor="level-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Level of knowledge
          </label>
          <CustomSelect
            value={level}
            onChange={handleLevelChange}
            options={TEACHER_LEVELS.map((level) => ({
              value: level,
              label: formatDisplayLevel(level),
            }))}
            placeholder="All Levels"
            disabled={isLoading}
            width="w-full sm:w-[200px]"
          />
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label
            htmlFor="price-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Price
          </label>
          <CustomSelect
            value={price?.toString() || 'all'}
            onChange={handlePriceChange}
            options={PRICE_OPTIONS.map((price) => ({
              value: price.toString(),
              label: price.toString(),
            }))}
            formatDisplayValue={(value) => `${value} $`}
            placeholder="All prices"
            disabled={isLoading}
            width="w-full sm:w-[124px]"
          />
        </div>

        {(language || level || price) && (
          <div className="w-full sm:w-auto">
            <Button
              variant="reset"
              onClick={handleReset}
              disabled={isLoading}
              aria-label="Reset all filters"
              className="w-full sm:w-auto"
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherFilters;
