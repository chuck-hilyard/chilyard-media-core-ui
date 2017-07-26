export default function(items, searchText, showFields) {
  let filtered = [];

  if (searchText && searchText !== '') {
    let parts = searchText.split(/\s+/); // split the input by space

    // iterate each item, each word and each field
    items.forEach((item) => {
      let allPartsMatch = true;
      parts.forEach((part) => {
        let partMatch = false;
        showFields.forEach((field) => {
          let regex = new RegExp(part, 'i');
          if (regex.test(item[field.field] + '')) {
            partMatch = true;
          }
        });
        allPartsMatch = allPartsMatch && partMatch;
      });
      if (allPartsMatch) {
        filtered.push(item);
      }
    });
  }
  else {
    filtered = items;
  }
  return filtered;
}
