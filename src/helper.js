// function for calculating bar graph data , returns an object with keys y_axis, x_axis containing numerical data of x and category data of y axis
export function getBarGraphData(raw_data, x_axis_key, y_axis_key) {
  let categories = [];
  let category_wise_data = {};

  for (let items of raw_data) {
    if (!categories.includes(items[x_axis_key])) {
      // if a new category is identified
      // create key data and num_elem, data contains sum of elements, num_elem contains number of elements
      categories.push(items[x_axis_key]);
      category_wise_data[items[x_axis_key]] = {
        data: 0,
        num_elem: 0,
      };
    }
    // appends data and num_elem to the current category
    let curr_item = category_wise_data[items[x_axis_key]];
    curr_item.data += items[y_axis_key];
    curr_item.num_elem += 1;
  }
  return {
    x_axis: categories,
    // calculating avrage of y_axis data for each category
    y_axis: Object.keys(category_wise_data).map(function (key) {
      return (
        Math.round(
          (category_wise_data[key]["data"] /
            category_wise_data[key]["num_elem"]) *
            100
        ) / 100
      );
    }),
  };
}
export function getScatteredGraphData(raw_data, x_axis_key, y_axis_key) {
  let scatter_plot_data = [];
  for (let items of raw_data) {
    scatter_plot_data.push([items[x_axis_key], items[y_axis_key]]);
  }
  // returns scatter plot data in format of array of array in the format of [[a1,b1], [a2,b2], [a3,b3]]
  return scatter_plot_data;
}
