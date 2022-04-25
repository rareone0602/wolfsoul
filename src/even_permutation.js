function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function check(permutation, keypoint) {
  const n = permutation.length;
  let parity = 0;
  for (let i = 0; i < n; ++i) if (permutation[i] != keypoint) {
    for (let j = 0; j < i; ++j) if (permutation[j] != keypoint) {
      parity ^= permutation[j] < permutation[i];
    }
  }
  return parity == 0;
}

function Fisher_Yates(n) {
  let permutation = [...Array(n).keys()];
    for (let i = 0; i < n - 1; ++i) {
      let j = i + getRandomInt(n - i);
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  return permutation;
}

export default function(n, keypoint) {
  let permutation;
  do {
    permutation = Fisher_Yates(n);
  } while (!check(permutation, keypoint))
  return permutation;
}
