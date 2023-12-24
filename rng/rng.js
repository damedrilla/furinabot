export default function rng(high) {
  const sides = high;
  return Math.floor(Math.random() * sides) + 1;
}
