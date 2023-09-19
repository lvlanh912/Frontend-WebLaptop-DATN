export default function removeEmptyFields(obj) {
    for (const key in obj) {
      if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  }