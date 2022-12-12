import React from "react";

import ReactECharts from "echarts-for-react";

import wine_data from "./Wine-Data.json";

// key which defines the category of the alcohol
const ALCOHOL_CATEGORY_KEY = "Alcohol";


// variables for bar graph which can be changed for altered result

// key which defines what needs to be ploted on y-axis of bar graph
const BAR_GRAPH_KEY = "Malic Acid";
// Display name for y-axis
const BAR_GRAPH_Y_LABEL = "Malic Acid";
// Display name for x-axis
const BAR_GRAPH_X_LABEL = "Alcohol Type";

// variables for scattered graph, can be changed for altered result

// key for x-axis
const SCATTERED_GRAPH_HORIZONTAL_KEY = "Color intensity";
// Display name for x-axis
const SCATTERED_GRAPH_HORIZONTAL_LABEL = "Color Intensity";

// key for y-axis
const SCATTERED_GRAPH_VERTICAL_KEY = "Hue";
// Display name for y-axis
const SCATTERED_GRAPH_VERTICAL_LABEL = "Hue";


// Initialize main component App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatter_plot_data: [], //datatype : array of array containing numeric values like e.g. [[x1,y1], [x2,y2], ...]
      bar_chart_data: [], // datatype : array of numeric values e.g. [a1,a2,a3, ...]
    };
  }
  getAlcoholCategories = (list_of_alcohol, categorize_by) => {
    let allAlcoholCategory = [];
    for (let items of list_of_alcohol) {
      if (!allAlcoholCategory.includes(items[categorize_by])) {
        allAlcoholCategory.push(items[categorize_by]);
      }
    }

    return allAlcoholCategory;
  };
  getAlcoholListByCategory = (data, categorize_by, categorization_value) => {
    var filteredAlcohol = data.filter(
      (alcohols) => alcohols[categorize_by] === categorization_value
    );
    return filteredAlcohol;
  };

  get_property_of_alcohol = (data, property) => {
    let values_of_property = data.map((alcohols) => {
      return alcohols[property];
    });
    return values_of_property;
  };

  get_avg = (arr) => {
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

  get_bar_graph_data = (data) => {
    var allAlcoholCategory = this.getAlcoholCategories(
      data,
      ALCOHOL_CATEGORY_KEY
    );
    var all_average_of_property = [];

    for (let items of allAlcoholCategory) {
      var allAlcoholByProperty = this.getAlcoholListByCategory(
        data,
        ALCOHOL_CATEGORY_KEY,
        items
      );
      var req_property_values = this.get_property_of_alcohol(
        allAlcoholByProperty,
        BAR_GRAPH_KEY
      );
      var avg_malic_acid_qty = this.get_avg(req_property_values);
      
      all_average_of_property.push(avg_malic_acid_qty);
    }

    // return all_avg_malic_acid_qty
    return {
      x_axis: allAlcoholCategory,
      y_axis: all_average_of_property,
    };
  };
  get_scattered_graph_data = (data) => {
    var scatter_plot_data = [];
    for (let items of data) {
      scatter_plot_data.push([
        items[SCATTERED_GRAPH_HORIZONTAL_KEY],
        items[SCATTERED_GRAPH_VERTICAL_KEY],
      ]);
    }
    return scatter_plot_data;
  };
  componentDidMount = () => {
    // read data from the Wine-Data.json located in ./Wine-Data.json file
    // instead of importing json file, we can use fetch to get the data through an api call and use it further
    this.setState({
      // get_scattered_graph_data method is used to get numerical data for scattered graph data 
      scatter_plot_data: this.get_scattered_graph_data(wine_data),

      // get_bar_graph_data gets the numerical data for bar graph
      bar_chart_data: this.get_bar_graph_data(wine_data),
    });
  };

  getOptionForGraph = (type = "bar_graph", graph_data) =>{
    var options = {
      responsive: true,
      scale: true,
      xAxis: {
        type:"",
        data: [],
        name: type === "bar_graph" ? BAR_GRAPH_X_LABEL : SCATTERED_GRAPH_HORIZONTAL_LABEL,
        nameLocation: "center",
      },
      yAxis: {
        type: "",
        name: type === "bar_graph" ? BAR_GRAPH_Y_LABEL : SCATTERED_GRAPH_VERTICAL_LABEL,
        nameLocation: "center",
      },
      series: [
        {
          type: type === "bar_graph" ? "bar" : "scatter",
          data: [],
          smooth: true,
        },
      ],
    };

    if(type === "scattered_graph"){
      delete options["xAxis"]["data"]
      delete options["xAxis"]["type"]
      delete options["yAxis"]["type"]

      options["series"][0]["data"] = graph_data
    }
    else{
      options["xAxis"]["data"] = graph_data["x_axis"]
      options["xAxis"]["type"] = "category"
      options["yAxis"]["type"] = "value"

      options["series"][0]["data"] = graph_data["y_axis"]
    }
    return options
  }

  render() {
    return (
      <div style={{ padding: "20px", maxWidth: "calc(100% - 40px)" }}>
        <h1>Scattered Graph</h1>
        <ReactECharts option={this.getOptionForGraph("scattered_graph" , this.state.scatter_plot_data)} />
        <h1>Bar Graph</h1>
        <ReactECharts option={this.getOptionForGraph("bar_graph" , this.state.bar_chart_data)} />
      </div>
    );
  }
}

export default App;
