import _ from "lodash";
export const paginate = (items, pageNumber, pageSize) => {

  const startIndex = (pageNumber - 1) * pageSize;
  console.log( _(items).slice(startIndex).take(pageSize).value())
  return _(items).slice(startIndex).take(pageSize).value();
};