function getAlcoholCategories (list_of_alcohol, categorize_by) {
    let allAlcoholCategory = [];
    for (let items of list_of_alcohol) {
      if (!allAlcoholCategory.includes(items[categorize_by])) {
        allAlcoholCategory.push(items[categorize_by]);
      }
    }

    return allAlcoholCategory;
  };
  function getAlcoholListByCategory  (data, categorize_by, categorization_value)  {
    var filteredAlcohol = data.filter(
      (alcohols) => alcohols[categorize_by] === categorization_value
    );
    return filteredAlcohol;
  };

  function get_property_of_alcohol (data, property) {
    let values_of_property = data.map((alcohols) => {
      return alcohols[property];
    });
    return values_of_property;
  };

  function get_avg  (arr) {
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
    var allAlcoholCategory = getAlcoholCategories(
      this.wine_data,
      this.ALCOHOL_CATEGORY_KEY
    );
    var all_average_of_property = [];

    for (let items of allAlcoholCategory) {
      var allAlcoholByProperty = getAlcoholListByCategory(
        this.wine_data,
        this.ALCOHOL_CATEGORY_KEY,
        items
      );
      var req_property_values = get_property_of_alcohol(
        allAlcoholByProperty,
        this.BAR_GRAPH_KEY
      );
      var avg_malic_acid_qty = get_avg(req_property_values);
      
      all_average_of_property.push(avg_malic_acid_qty);
    }

    // return all_avg_malic_acid_qty
    return {
      x_axis: allAlcoholCategory,
      y_axis: all_average_of_property,
    };
  };
 export function get_scattered_graph_data () {
    var scatter_plot_data = [];
    for (let items of this.wine_data) {
      scatter_plot_data.push([
        items[this.SCATTERED_GRAPH_HORIZONTAL_KEY],
        items[this.SCATTERED_GRAPH_VERTICAL_KEY],
      ]);
    }
    return scatter_plot_data;
  };