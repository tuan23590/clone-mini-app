export function getDefaultOptions(product) {
  return {
    size: product.sizes?.[0],
    color: product.colors?.[0].name,
  };
}

export function isIdentical(option1, option2) {
  return option1.size === option2.size && option1.color === option2.color;
}
