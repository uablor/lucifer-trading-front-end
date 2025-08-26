<template>
  <div class="crypto-hero-container">
    <!-- Hero Section -->
    <a-row class="hero-section" :gutter="[32, 32]" align="middle">
      <a-col :xs="24" :lg="12" class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            {{ $t("homepage.hero.title") }}
            <span class="title-highlight">Trading Platform</span>
          </h1>
          <p class="hero-description">
            {{ $t("homepage.hero.description") }}
          </p>
          <div class="hero-actions">
            <a-button type="primary" size="large" class="btn-trade" @click="triggerLogin" :loading="isLoading">
              <template #icon>
                <TrophyOutlined />
              </template>
              {{ $t("homepage.hero.tradeNow") }}
            </a-button>
            <a-button size="large" class="btn-demo" ghost @click="openDemo">
              <template #icon>
                <PlayCircleOutlined />
              </template>
              Try Demo
            </a-button>
          </div>

          <!-- Stats Cards -->
          <div class="stats-container">
            <a-row :gutter="[16, 16]">
              <a-col :span="8">
                <a-statistic title="24h Volume" :value="24567890" :precision="0" prefix="$" class="stat-card" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="Active Traders" :value="12456" suffix="+" class="stat-card" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="Markets" :value="150" suffix="+" class="stat-card" />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :lg="12" class="hero-visual">
        <div class="hero-image-container">
          <div class="floating-cards">
            <a-card v-for="(crypto, index) in featuredCryptos" :key="crypto.id" class="floating-crypto-card" :style="{
              animationDelay: `${index * 0.2}s`,
              transform: `translateY(${index * 20}px)`
            }">
              <div class="crypto-mini-info">
                <img :src="crypto.icon" :alt="crypto.name" class="mini-crypto-icon" />
                <div class="mini-crypto-data">
                  <span class="mini-crypto-name">{{ crypto.symbol }}</span>
                  <span :class="['mini-crypto-change', getChange24h(crypto.symbol) > 0 ? 'positive' : 'negative']">
                    {{ getChange24h(crypto.symbol) > 0 ? "+" : "" }}{{ getChange24h(crypto.symbol) }}%
                  </span>
                </div>
              </div>
            </a-card>
          </div>
        </div>
      </a-col>
    </a-row>

    <!-- Crypto Ticker Section -->
    <div class="crypto-ticker-section">
      <a-card class="ticker-card" :bordered="false">
        <div class="ticker-header">
          <a-typography-title :level="4" class="ticker-title">
            <BellOutlined class="ticker-icon" />
            {{ $t("crypto.tickerTitle") }}
          </a-typography-title>
          <a-switch v-model:checked="autoScroll" size="small" checked-children="Auto" un-checked-children="Manual" />
        </div>

        <div class="crypto-ticker-wrapper">
          <div class="crypto-ticker-container" :class="{ 'paused': !autoScroll }">
            <div class="crypto-ticker-track">
              <a-card v-for="crypto in [...cryptos, ...cryptos]" :key="`${crypto.id}-${Math.random()}`"
                class="crypto-ticker-card" hoverable :bordered="false" @click="selectCrypto(crypto)">
                <div class="crypto-ticker-content">
                  <div class="crypto-header">
                    <a-avatar :src="crypto.icon" :size="32" class="crypto-avatar" />
                    <div class="crypto-info">
                      <span class="crypto-symbol">{{ crypto.symbol }}</span>
                      <span class="crypto-pair">{{ crypto.name }}</span>
                    </div>
                  </div>

                  <div class="crypto-metrics">
                    <div class="crypto-price">
                      ${{ getPrice(crypto.symbol) }}
                    </div>
                    <a-tag :color="getChange24h(crypto.symbol) >= 0 ? 'green' : 'red'" class="crypto-change-tag">
                      <ArrowUpOutlined v-if="getChange24h(crypto.symbol) >= 0" />
                      <ArrowDownOutlined v-else />
                      {{ Math.abs(getChange24h(crypto.symbol)) }}%
                    </a-tag>
                  </div>
                </div>
              </a-card>
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- Market Overview -->
    <div class="market-overview">
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :lg="16">
          <a-card title="Market Overview" class="overview-card">
            <a-table :columns="tableColumns" :data-source="coins" :pagination="false" size="small">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <div class="token-cell">
                    <a-avatar :src="getTokenIcon(record.symbol)" :size="24" />
                    <div class="token-info">
                      <span class="token-symbol">{{ record.symbol }}</span>
                      <span class="token-name">{{ record.name }}</span>
                    </div>
                  </div>
                </template>
                <template v-else-if="column.key === 'price'">
                  <span class="price-text">${{ record.price.toLocaleString() }}</span>
                </template>
                <template v-else-if="column.key === 'change24h'">
                  <a-tag :color="record.change24h >= 0 ? 'green' : 'red'">
                    {{ record.change24h >= 0 ? '+' : '' }}{{ record.change24h }}%
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>

        <a-col :xs="24" :lg="8">
          <a-card title="Quick Actions" class="actions-card">
            <a-space direction="vertical" :size="16" style="width: 100%;">
              <a-button type="primary" block size="large" @click="triggerLogin">
                <UserOutlined />
                Start Trading
              </a-button>
              <a-button block size="large">
                <FileTextOutlined />
                View Markets
              </a-button>
              <a-button block size="large">
                <BarChartOutlined />
                Price Alerts
              </a-button>
            </a-space>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  TrophyOutlined,
  PlayCircleOutlined,
  BellOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';

// Types
interface CryptoData {
  id: number;
  name: string;
  icon: string;
  symbol: string;
}

interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

// Router (you'll need to import your router)
// import router from '@/router';

// Reactive data
const isLoading = ref(false);
const autoScroll = ref(true);

// Static crypto icons (you'll need to import these)
import btcIcon from '@/assets/images/iconCrypto/bitcoin-btc-logo.png';
import bchIcon from '@/assets/images/iconCrypto/bitcoin-cash-bch-logo.png';
import ethIcon from '@/assets/images/iconCrypto/ethereum-eth-logo.png';
import solIcon from '@/assets/images/iconCrypto/solana-sol-logo.png';
import adaIcon from '@/assets/images/iconCrypto/cardano-ada-logo.png';
import dogeIcon from '@/assets/images/iconCrypto/dogecoin-doge-logo.png';
import shibaIcon from '@/assets/images/iconCrypto/shiba-inu-shib-logo.png';
import bnbIcon from '@/assets/images/iconCrypto/binance-coin-bnb-logo.png';


const cryptos = ref<CryptoData[]>([
  { id: 1, name: "BTC/USDT", icon: btcIcon, symbol: "BTC" },
  { id: 2, name: "ETH/USDT", icon: ethIcon, symbol: "ETH" },
  { id: 3, name: "SOL/USDT", icon: solIcon, symbol: "SOL" },
  { id: 4, name: "ADA/USDT", icon: adaIcon, symbol: "ADA" },
  { id: 5, name: "DOGE/USDT", icon: dogeIcon, symbol: "DOGE" },
  { id: 6, name: "SHIBA/USDT", icon: shibaIcon, symbol: "SHIBA" },
  { id: 7, name: "BNB/USDT", icon: bnbIcon, symbol: "BNB" },
  { id: 8, name: "BCH/USDT", icon: bchIcon, symbol: "BCH" },
]);

const featuredCryptos = ref<CryptoData[]>(cryptos.value.slice(0, 4));

const coins = ref<CoinData[]>([
  { symbol: "BTC", name: "Bitcoin", price: 95787.96, change24h: -0.28 },
  { symbol: "ETH", name: "Ethereum", price: 3649.57, change24h: 0.16 },
  { symbol: "BNB", name: "Binance Coin", price: 748.79, change24h: 14.74 },
  { symbol: "BCH", name: "Bitcoin Cash", price: 565.4, change24h: 5.36 },
  { symbol: "SOL", name: "Solana", price: 235.91, change24h: 3.35 },
  { symbol: "USDT", name: "Tether", price: 1, change24h: 0 },
]);

// Table columns
const tableColumns: TableColumnsType = [
  {
    title: 'Asset',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 120,
    align: 'right',
  },
  {
    title: '24h Change',
    dataIndex: 'change24h',
    key: 'change24h',
    width: 100,
    align: 'right',
  },
];

// Methods
const getPrice = (symbol: string): string => {
  const coin = coins.value.find(coin => coin.symbol === symbol);
  return coin ? coin.price.toFixed(2) : 'N/A';
};

const getChange24h = (symbol: string): number => {
  const coin = coins.value.find(coin => coin.symbol === symbol);
  return coin ? parseFloat(coin.change24h.toFixed(2)) : 0;
};

const getTokenIcon = (symbol: string): string => {
  const crypto = cryptos.value.find(c => c.symbol === symbol);
  return crypto ? crypto.icon : '';
};

const triggerLogin = async (): Promise<void> => {
  isLoading.value = true;
  try {
    // router.push("/login");
    console.log('Navigate to login');
  } catch (error) {
    console.error('Navigation failed:', error);
  } finally {
    isLoading.value = false;
  }
};

const openDemo = (): void => {
  console.log('Open demo');
};

const selectCrypto = (crypto: CryptoData): void => {
  console.log('Selected crypto:', crypto);
};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<style scoped>

.crypto-hero-container {
  padding: 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.crypto-hero-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  padding: 0px 24px;
  position: relative;
  z-index: 2;
}

.hero-content {
  /* color: white; */
}

.hero-title {
  font-size: 3.5rem !important;
  font-weight: 800 !important;
  margin-bottom: 24px !important;
  line-height: 1.2 !important;
  /* color: white !important; */
}

.title-highlight {
  background: linear-gradient(45deg, #7903ff, #09ff99);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.hero-description {
  font-size: 1.25rem;
  /* color: rgba(255, 255, 255, 0.8); */
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn-trade {
  background: linear-gradient(45deg, #22db31, #1890ff);
  border: none;
  height: 50px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(34, 219, 49, 0.4);
  transition: all 0.3s ease;
}

.btn-trade:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 219, 49, 0.6);
}

.btn-demo {
  height: 50px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  /* color: white; */
  transition: all 0.3s ease;
}

.btn-demo:hover {
  /* border-color: white; */
  /* color: white; */
  transform: translateY(-2px);
}

.stats-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-card :deep(.ant-statistic-title) {
  /* color: rgba(255, 255, 255, 0.8); */
}

.stat-card :deep(.ant-statistic-content) {
  /* color: white; */
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.hero-image-container {
  position: relative;
  height: 500px;
}

.floating-cards {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.floating-crypto-card {
  position: relative;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.crypto-mini-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-crypto-icon {
  width: 32px;
  height: 32px;
}

.mini-crypto-data {
  display: flex;
  flex-direction: column;
}

.mini-crypto-name {
  font-weight: 600;
  color: #1890ff;
}

.mini-crypto-change.positive {
  color: #52c41a;
}

.mini-crypto-change.negative {
  color: #ff4d4f;
}

/* Crypto Ticker Section */
.crypto-ticker-section {
  padding: 40px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.ticker-card {
  background: transparent;
  box-shadow: none;
}

.ticker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.ticker-title {
  color: #1890ff !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ticker-icon {
  color: #722ed1;
}

.crypto-ticker-wrapper {
  overflow: hidden;
  width: 100%;
}

.crypto-ticker-container {
  width: 100%;
}

.crypto-ticker-track {
  display: flex;
  animation: scroll-left 30s linear infinite;
  gap: 16px;
}

.crypto-ticker-container.paused .crypto-ticker-track {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.crypto-ticker-card {
  flex: 0 0 280px;
  border-radius: 12px;
  /* background: white; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.crypto-ticker-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.crypto-ticker-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crypto-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.crypto-info {
  display: flex;
  flex-direction: column;
}

.crypto-symbol {
  font-weight: 600;
  color: #1890ff;
  font-size: 16px;
}

.crypto-pair {
  color: #8c8c8c;
  font-size: 12px;
}

.crypto-metrics {
  text-align: right;
}

.crypto-price {
  font-weight: 600;
  font-size: 16px;
  color: #262626;
  margin-bottom: 4px;
}

.crypto-change-tag {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Market Overview */
.market-overview {
  padding: 40px 24px 80px;
  /* background: white; */
  position: relative;
  z-index: 2;
}

.overview-card,
.actions-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.token-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.token-info {
  display: flex;
  flex-direction: column;
}

.token-symbol {
  font-weight: 600;
  color: #1890ff;
}

.token-name {
  color: #8c8c8c;
  font-size: 12px;
}

.price-text {
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', monospace;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-trade,
  .btn-demo {
    width: 100%;
  }

  .crypto-ticker-card {
    flex: 0 0 240px;
  }

  .floating-cards {
    position: static;
    transform: none;
    margin-top: 40px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 40px 16px;
  }

  .crypto-ticker-section,
  .market-overview {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hero-title {
    font-size: 2rem !important;
  }
}
</style>