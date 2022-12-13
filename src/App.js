import React from "react";

import ReactECharts from "echarts-for-react";

import wine_data from "./Wine-Data.json";

import "./assets/style.css"

import {get_bar_graph_data , get_scattered_graph_data} from "./helper"
import {getOptionForGraph} from "./graph_option_generator"
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

  componentDidMount = () => {
    // read data from the Wine-Data.json located in ./Wine-Data.json file
    // instead of importing json file, we can use fetch to get the data through an api call and use it further

    var barGraph = {
      raw_data : wine_data,
      x_axis_key : ALCOHOL_CATEGORY_KEY,
      y_axis_key : BAR_GRAPH_KEY,
    }
    var scatteredGraph = {
      raw_data : wine_data,
      x_axis_key : SCATTERED_GRAPH_HORIZONTAL_KEY,
      y_axis_key : SCATTERED_GRAPH_VERTICAL_KEY,
    }

    this.setState({
      // get_scattered_graph_data method is used to get numerical data for scattered graph data 
      scatter_plot_data: get_scattered_graph_data.call(scatteredGraph),


      // get_bar_graph_data gets the numerical data for bar graph
      bar_chart_data: get_bar_graph_data.call(barGraph),
    });
  };

  render() {
    return (
      <div>
        <h1>Scattered Graph</h1>
        <ReactECharts option={getOptionForGraph.call(
          {
            type : "scatter" ,
            data : {
              plotting_data : this.state.scatter_plot_data,
              label_x : SCATTERED_GRAPH_HORIZONTAL_LABEL,
              label_y : SCATTERED_GRAPH_VERTICAL_LABEL
            }
          }
          )} />
        <h1>Bar Graph</h1>
        <ReactECharts option={getOptionForGraph.call(
          {
            type : "bar" , 
            data : {
              plotting_data : this.state.bar_chart_data,
              label_x : BAR_GRAPH_X_LABEL,
              label_y : BAR_GRAPH_Y_LABEL
            }
          }
          
          )} />
      </div>
    );
  }
}

export default App;
