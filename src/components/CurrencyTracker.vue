<script setup>
import { TickerTape,Ticker } from 'vue-tradingview-widgets';

const options = {
symbols: [
  { proName: "BINANCE:BTCUSDT", title: "Bitcoin / USDT" },
  { proName: "BINANCE:ETHUSDT", title: "Ethereum / USDT" },
  { proName: "BINANCE:BNBUSDT", title: "BNB / USDT" },
  { proName: "BINANCE:SOLUSDT", title: "Solana / USDT" },
  { proName: "BINANCE:XRPUSDT", title: "XRP / USDT" },
  { proName: "BINANCE:DOGEUSDT", title: "Dogecoin / USDT" },
  { proName: "BINANCE:TONUSDT", title: "Toncoin / USDT" },
  { proName: "BINANCE:ADAUSDT", title: "Cardano / USDT" },
  { proName: "BINANCE:AVAXUSDT", title: "Avalanche / USDT" },
  { proName: "BINANCE:SHIBUSDT", title: "Shiba Inu / USDT" },
  { proName: "BINANCE:DOTUSDT", title: "Polkadot / USDT" },
  { proName: "BINANCE:LINKUSDT", title: "Chainlink / USDT" },
  { proName: "BINANCE:WBTCUSDT", title: "Wrapped BTC / USDT" },
  { proName: "BINANCE:NEARUSDT", title: "NEAR Protocol / USDT" },
  { proName: "BINANCE:MATICUSDT", title: "Polygon / USDT" },
  { proName: "BINANCE:UNIUSDT", title: "Uniswap / USDT" },
  { proName: "BINANCE:LEOUSDT", title: "LEO Token / USDT" },
  { proName: "BINANCE:ATOMUSDT", title: "Cosmos / USDT" },
  { proName: "BINANCE:STETHUSDT", title: "stETH / USDT" },
  { proName: "BINANCE:ICPUSDT", title: "Internet Computer / USDT" },
  { proName: "BINANCE:ETCUSDT", title: "Ethereum Classic / USDT" },
  { proName: "BINANCE:FILUSDT", title: "Filecoin / USDT" },
  { proName: "BINANCE:LDOUSDT", title: "Lido DAO / USDT" },
  { proName: "BINANCE:HBARUSDT", title: "Hedera / USDT" },
  { proName: "BINANCE:APTUSDT", title: "Aptos / USDT" },
  { proName: "BINANCE:CROUSDT", title: "Cronos / USDT" },
  { proName: "BINANCE:ARBUSDT", title: "Arbitrum / USDT" },
  { proName: "BINANCE:VETUSDT", title: "VeChain / USDT" },
  { proName: "BINANCE:IMXUSDT", title: "Immutable / USDT" },
  { proName: "BINANCE:OPUSDT", title: "Optimism / USDT" },
  { proName: "BINANCE:RNDRUSDT", title: "Render / USDT" },
  { proName: "BINANCE:STXUSDT", title: "Stacks / USDT" },
  { proName: "BINANCE:TUSDUSDT", title: "TrueUSD / USDT" },
  { proName: "BINANCE:EGLDUSDT", title: "MultiversX / USDT" },
  { proName: "BINANCE:THETAUSDT", title: "Theta / USDT" },
  { proName: "BINANCE:SANDUSDT", title: "The Sandbox / USDT" },
  { proName: "BINANCE:MKRUSDT", title: "Maker / USDT" },
  { proName: "BINANCE:QNTUSDT", title: "Quant / USDT" },
  { proName: "BINANCE:AXSUSDT", title: "Axie Infinity / USDT" },
  { proName: "BINANCE:XTZUSDT", title: "Tezos / USDT" }
],
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: true,
  displayMode: "adaptive",
  locale: "in"
};
</script>


<template>
  
<TickerTape :options="options"  class="border border-[#212d4a] bg-[#131722] "/>

<Ticker :options="options"  class="border border-[#212d4a] bg-[#131722] "/>

</template>
 