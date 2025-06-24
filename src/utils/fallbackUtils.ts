interface Data {
  // Define your data structure here
}

interface Defaults {
  // Define your defaults structure here
}

function mergeDataAndDefaults(
  data: Data,
  defaults: Defaults
): Record<string, any> {
  try {
    const result: Record<string, any> = {};
    if (
      data === null ||
      data === undefined ||
      defaults === null ||
      defaults === undefined
    ) {
      throw new Error("Data or defaults cannot be null or undefined");
    }
    for (const key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        if (data[key] === undefined) {
          result[key] = defaults[key];
        } else {
          result[key] = data[key] !== undefined ? data[key] : defaults[key];
        }
      }
    }
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        result[key] === undefined
      ) {
        result[key] = data[key];
      }
    }
    return result;
  } catch (error) {
    console.error("Error in mergeDataAndDefaults:", error);
    throw error;
  }
}
