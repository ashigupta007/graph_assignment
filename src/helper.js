function getDistinctCategories (raw_data, categorize_by) {
    let allCategory = [];
    for (let items of raw_data) {
      if (!allCategory.includes(items[categorize_by])) {
        allCategory.push(items[categorize_by]);
      }
    }
    return allCategory;
  };
  function getElementsByCategory  (data, categorize_by, categorization_value)  {
    var filteredItems = data.filter(
      (items) => items[categorize_by] === categorization_value
    );
    return filteredItems;
  };

  function get_property_values (data, property) {
    let values_of_property = data.map((items) => {
      return items[property];
    });
    return values_of_property;
  };

  function get_avg  (arr) {
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

 export function get_bar_graph_data () {
    // get distinct categories
    var all_categories = getDistinctCategories(
      this.raw_data,
      this.x_axis_key
    );

    // contains data for plotting on Y axis
    var avg_values = [];

    for (let items of all_categories) {
        // get all elements of one category
      var allElementsByProperty = getElementsByCategory(
        this.raw_data,
        this.x_axis_key,
        items
      );

    //   get values for calculating the average
      var req_property_values = get_property_values(
        allElementsByProperty,
        this.y_axis_key
      );
    //   compute average value for plotting on the y axis
      var avg_value = get_avg(req_property_values);
      avg_values.push(avg_value);
    }

    // return x and y axis values in array
    return {
      x_axis: all_categories,
      y_axis: avg_values,
    };
  };
 export function get_scattered_graph_data () {
    var scatter_plot_data = [];
    for (let items of this.raw_data) {
      scatter_plot_data.push([
        items[this.x_axis_key],
        items[this.y_axis_key],
      ]);
    }
    // returns scatter plot data in format of array of array in the format of [[a1,b1], [a2,b2], [a3,b3]]
    return scatter_plot_data;
  };