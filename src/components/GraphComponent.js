import React from 'react';
import TradingViewWidget, {
  Themes,
  IntervalTypes,
} from 'react-tradingview-widget';

export default function GraphComponent({ pair }) {
  return (
    <TradingViewWidget
      symbol={pair}
      theme={Themes.DARK}
      locale="en"
      interval={IntervalTypes.W}
      autosize
    />
  );
}
