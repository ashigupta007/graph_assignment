import React from "react";

import ReactECharts from "echarts-for-react";

// importing raw data
import wine_data from "./Wine-Data.json";

import "./assets/style.css";

// helper function for generating data for graphs
import { getBarGraphData, getScatteredGraphData } from "./helper";

// option generator for graph
import { getOptionForGraph } from "./graph_option_generator";


// importing basic settings for the graph
import {
  ALCOHOL_CATEGORY_KEY,
  BAR_GRAPH_KEY,
  BAR_GRAPH_Y_LABEL,
  BAR_GRAPH_X_LABEL,
  SCATTERED_GRAPH_HORIZONTAL_KEY,
  SCATTERED_GRAPH_HORIZONTAL_LABEL,
  SCATTERED_GRAPH_VERTICAL_KEY,
  SCATTERED_GRAPH_VERTICAL_LABEL,
} from "./project_property";

// Initialize main component App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatter_plot_data: [], //datatype : array of array containing numeric values like [[x1,y1], [x2,y2], ...]
      bar_chart_data: {
        x_axis: [],
        y_axis: [],
      }, // datatype : array of numeric values e.g. {x_axis : [a1,a2,a3, ...] , y_axis : [b1,b2,b3, ...]}
    };
  }

  componentDidMount = () => {
    // read data from the Wine-Data.json located in ./Wine-Data.json file
    // instead of importing json file, we can use fetch to get the data through an api call and use it further

    this.setState({
      // get_scattered_graph_data method is used to get numerical data for scattered graph data
      scatter_plot_data: getScatteredGraphData(wine_data, SCATTERED_GRAPH_HORIZONTAL_KEY, SCATTERED_GRAPH_VERTICAL_KEY ),

      // get_bar_graph_data gets the numerical data for bar graph
      bar_chart_data: getBarGraphData(wine_data ,ALCOHOL_CATEGORY_KEY ,  BAR_GRAPH_KEY),
    });
  };

  render() {
    return (
      <div>
        <Chart
          title="Scattered Graph"
          type="scatter"
          label_x={SCATTERED_GRAPH_HORIZONTAL_LABEL}
          label_y={SCATTERED_GRAPH_VERTICAL_LABEL}
          data={this.state.scatter_plot_data}
        />

        <Chart
          title="Bar Graph"
          type="bar"
          label_x={BAR_GRAPH_X_LABEL}
          label_y={BAR_GRAPH_Y_LABEL}
          data={this.state.bar_chart_data}
        />
      </div>
    );
  }
}

export default App;


// component for rendering charts
function Chart(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <ReactECharts
        option={getOptionForGraph.call({
          type: props.type,
          data: {
            plotting_data: props.data,
            label_x: props.label_x,
            label_y: props.label_y,
          },
        })}
      />
    </div>
  );
}
