import { create } from 'zustand';

const CACHE_KEY = 'datika_exchange_rate';
const CURRENCY_KEY = 'datika_currency_preference';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

interface CachedRate {
  usdPerMXN: number;
  timestamp: number;
}

interface CurrencyState {
  currency: 'MXN' | 'USD';
  usdPerMXN: number;
  loadingRate: boolean;
  setCurrency: (currency: 'MXN' | 'USD') => void;
  setUsdPerMXN: (rate: number) => void;
  setLoadingRate: (loading: boolean) => void;
  fetchExchangeRate: () => Promise<void>;
  convertPrice: (priceMXN: number) => number;
  formatPrice: (priceMXN: number) => string;
  formatPriceNumber: (priceMXN: number) => string;
  getCurrencyLabel: () => string;
}

const loadCachedRate = (): number | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedRate = JSON.parse(cached);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_DURATION) {
        return parsed.usdPerMXN;
      }
    }
  } catch {
    // Ignorar errores
  }
  return null;
};

const saveCachedRate = (rate: number) => {
  if (typeof window === 'undefined') return;
  try {
    const cached: CachedRate = { usdPerMXN: rate, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Ignorar errores
  }
};

const loadSavedCurrency = (): 'MXN' | 'USD' => {
  if (typeof window === 'undefined') return 'MXN';
  try {
    const saved = localStorage.getItem(CURRENCY_KEY);
    return saved === 'USD' ? 'USD' : 'MXN';
  } catch {
    return 'MXN';
  }
};

const saveCurrency = (currency: 'MXN' | 'USD') => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CURRENCY_KEY, currency);
    console.log('💾 Moneda guardada:', currency);
  } catch {
    // Ignorar errores
  }
};

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: loadSavedCurrency(),
  usdPerMXN: loadCachedRate() ?? 0.055,
  loadingRate: false,

  setCurrency: (currency: 'MXN' | 'USD') => {
    saveCurrency(currency);
    set({ currency });
    console.log('💱 Moneda cambiada a:', currency);
  },

  setUsdPerMXN: (rate: number) => set({ usdPerMXN: rate }),

  setLoadingRate: (loading: boolean) => set({ loadingRate: loading }),

  fetchExchangeRate: async () => {
    const { loadingRate } = get();
    if (loadingRate) return;

    const cached = loadCachedRate();
    if (cached !== null) {
      set({ usdPerMXN: cached });
      console.log('💱 Usando tipo de cambio cacheado:', cached);
      return;
    }

    set({ loadingRate: true });

    try {
      const response = await fetch('/api/exchange-rate', {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await response.json();

      if (data.success && data.usdPerMXN) {
        set({ usdPerMXN: data.usdPerMXN });
        saveCachedRate(data.usdPerMXN);
        console.log('💱 Tipo de cambio actualizado:', data.usdPerMXN);
      }
    } catch (error) {
      console.error('❌ Error obteniendo tipo de cambio:', error);
    } finally {
      set({ loadingRate: false });
    }
  },

  convertPrice: (priceMXN: number) => {
    const { currency, usdPerMXN } = get();
    if (currency === 'MXN') return priceMXN;
    return priceMXN * usdPerMXN;
  },

  formatPrice: (priceMXN: number) => {
    const { currency, convertPrice } = get();
    const converted = convertPrice(priceMXN);

    if (currency === 'MXN') {
      return `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
    }

    return `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  },

  formatPriceNumber: (priceMXN: number) => {
    const { convertPrice } = get();
    const converted = convertPrice(priceMXN);
    return converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  getCurrencyLabel: () => {
    const { currency } = get();
    return currency;
  },
}));