type GstCalculationProps = {
  price: number | string;
  gstPercentage: '5' | '12' | '18' | '28' | '9';
};

export const calculateGst = ({
  price,
  gstPercentage,
}: GstCalculationProps): number => {
  const gst = Number(price) - Number(price) / (1 + Number(gstPercentage) / 100);
  return gst;
};

export const calculateExclusiveGst = ({
  price,
  gstPercentage,
}: GstCalculationProps): number => {
  const gst = Number(price) * (1 + Number(gstPercentage) / 100) - Number(price);
  return gst;
};

export function getDifference(value: number) {
  const roundedValue = Math.round(value);
  const difference = roundedValue - value;
  return {
    roundedValue: roundedValue,
    difference: difference.toFixed(2),
  };
}
