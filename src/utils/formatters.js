const numberFormatter = new Intl.NumberFormat("ko-KR");

export const formatNumber = (value) => numberFormatter.format(value);
export const formatPercent = (value) => `${value}%`;
