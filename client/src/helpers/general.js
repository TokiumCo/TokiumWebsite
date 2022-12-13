export const formatWalletAddress = (address) => {
  const len = address.length;
  const formatted = address.substring(0, 3) +"..." + address.substring(len - 3);
  return formatted;
}