
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function(n) {
  if (n == 1) {
    return [0];
  } else {
    let permutation = [...Array(n).keys()];
    for (let _ = 0; _ < 2 * n; ++_) {
      let i, j;
      do {
        i = getRandomInt(n);
        j = getRandomInt(n);
      } while (i == j);
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    return permutation;
  }
}
