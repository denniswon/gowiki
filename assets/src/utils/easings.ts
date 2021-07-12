function expIn(t) {  // starts slow
  return tpmt(1 - +t);
}

function expOut(t) {  // starts fast
  return 1 - tpmt(t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
}

function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

export const easings = {
  expIn,
  expOut,
  expInOut,
}