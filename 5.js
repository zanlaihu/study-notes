function keyPath(paths, obj) {
  if (paths === undefined || obj === undefined) {
    return undefined;
  }

  let result = obj[paths[0]];
  if (paths.length === 1 || result === undefined) {
    return result;
  }

  for (let i = 1; i < paths.length; i++) {
    if (result.hasOwnProperty(paths[i])) {
      result = result[paths[i]];
    } else {
      return undefined;
    }
  }

  return result;
}

/**
 *
 * @param paths
 * @param obj
 * @returns {*}
 *
 */
const obj = {
  a: {
    b: {
      c: {
        d: 3,
      },
    },
  },
};

console.log(keyPath());
