import { CURRENCY } from './constants';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatArea(value: number): string {
  return `${value.toLocaleString('en-ZA')} m²`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-ZA');
}