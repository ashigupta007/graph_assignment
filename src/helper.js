function getDistinctCategories (raw_data, categorize_by) {
    let all_category = [];
    for (let items of raw_data) {
      if (!all_category.includes(items[categorize_by])) {
        all_category.push(items[categorize_by]);
      }
    }
    return all_category;
  };
  function getElementsByCategory  (data, categorize_by, categorization_value)  {
    let filtered_items = data.filter(
      (items) => items[categorize_by] === categorization_value
    );
    return filtered_items;
  };

  function getPropertyValues (data, property) {
    let values_of_property = data.map((items) => {
      return items[property];
    });
    return values_of_property;
  };

  function getAvg  (arr) {
    // rounding off to 2nd value after decimal.
    return (
      Math.round(
        (arr.reduce(function (x, y) {
          return x + y;
        }, 0) /
          arr.length) *
          100
      ) / 100
    );
  };

 export function getBarGraphData () {
    // get distinct categories
    let all_categories = getDistinctCategories(
      this.raw_data,
      this.x_axis_key
    );

    // contains data for plotting on Y axis
    let avg_values = [];

    for (let items of all_categories) {
        // get all elements of one category
      var all_elements_by_property = getElementsByCategory(
        this.raw_data,
        this.x_axis_key,
        items
      );

    //   get values for calculating the average
      let req_property_values = getPropertyValues(
        all_elements_by_property,
        this.y_axis_key
      );
    //   compute average value for plotting on the y axis
      let avg_value = getAvg(req_property_values);
      avg_values.push(avg_value);
    }

    // return x and y axis values in array
    return {
      x_axis: all_categories,
      y_axis: avg_values,
    };
  };
 export function getScatteredGraphData () {
    let scatter_plot_data = [];
    for (let items of this.raw_data) {
      scatter_plot_data.push([
        items[this.x_axis_key],
        items[this.y_axis_key],
      ]);
    }
    // returns scatter plot data in format of array of array in the format of [[a1,b1], [a2,b2], [a3,b3]]
    return scatter_plot_data;
  };