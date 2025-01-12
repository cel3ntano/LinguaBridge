'use client';
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
import {
  formatDisplayLevel,
  formatDatabaseLevel,
} from '@/lib/utils/formatters';
import Icon from '@/components/common/Icon';

const LEVELS = [
  'A1_Beginner',
  'A2_Elementary',
  'B1_Intermediate',
  'B2_Upper_Intermediate',
  'C1_Advanced',
  'C2_Proficient',
];

const PRICES = [10, 20, 30, 40];

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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguageFilter(formatDatabaseLevel(e.target.value)));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLevelFilter(formatDatabaseLevel(e.target.value)));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : null;
    dispatch(setPriceFilter(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const selectWrapperClasses = 'relative';
  const selectClasses =
    'h-[50px] appearance-none rounded-xl border border-text-primary/10 bg-white px-4 py-3.5 text-lg font-medium leading-5 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors hover:border-accent-primary';
  const iconClasses =
    'absolute right-[18px] top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5 stroke-brand-dark fill-brand-dark';

  return (
    <div className="mb-8">
      <div className="flex items-end gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="language-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Languages
          </label>
          <div className={selectWrapperClasses}>
            <select
              id="language-select"
              value={formatDisplayLevel(language)}
              onChange={handleLanguageChange}
              className={`${selectClasses} w-[220px]`}
              disabled={isLoading}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                  className="text-lg font-medium leading-5 hover:text-text-primary text-text-primary/20"
                >
                  {formatDisplayLevel(lang)}
                </option>
              ))}
            </select>
            <Icon id="#arrow" className={iconClasses} />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="level-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Level of knowledge
          </label>
          <div className={selectWrapperClasses}>
            <select
              id="level-select"
              value={level}
              onChange={handleLevelChange}
              className={`${selectClasses} w-[240px]`}
              disabled={isLoading}
            >
              <option value="">All Levels</option>
              {LEVELS.map((level) => (
                <option
                  key={level}
                  value={level}
                  className="text-lg font-medium leading-5 hover:text-text-primary text-text-primary/20"
                >
                  {formatDisplayLevel(level)}
                </option>
              ))}
            </select>
            <Icon id="#arrow" className={iconClasses} />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="price-select"
            className="mb-2 text-sm font-medium leading-[18px] text-brand-gray"
          >
            Price
          </label>
          <div className={selectWrapperClasses}>
            <select
              id="price-select"
              value={price || ''}
              onChange={handlePriceChange}
              className={`${selectClasses} w-[140px]`}
              disabled={isLoading}
            >
              <option value="">All Prices</option>
              {PRICES.map((price) => (
                <option
                  key={price}
                  value={price}
                  className="text-lg font-medium leading-5 hover:text-text-primary text-text-primary/20"
                >
                  {`${price} $`}
                </option>
              ))}
            </select>
            <Icon id="#arrow" className={iconClasses} />
          </div>
        </div>

        {(language || level || price) && (
          <Button
            variant="reset"
            onClick={handleReset}
            disabled={isLoading}
            aria-label="Reset all filters"
          >
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeacherFilters;
