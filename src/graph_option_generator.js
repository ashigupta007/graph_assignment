// generating the options prop required for EchartsForReact library

export function getOptionForGraph (){
    // generic options object
    let options = {
      responsive: true,
      scale: true,
      xAxis: {
        name: this.data.label_x,
        nameGap : 30,
        nameLocation: "center",
      },
      yAxis: {
        name: this.data.label_y,
        nameGap : 20,
        nameLocation: "center",
      },
      series: [
        {
          type: this.type,
          data: [],
          smooth: true,
        },
      ],
      tooltip : {}
    };
    // altering options object according to type of graph
    if(this.type === "scatter"){
      options["series"][0]["data"] = this.data.plotting_data
    }
    else if(this.type === "bar"){
      options["xAxis"]["data"] =this.data.plotting_data["x_axis"]
      options["xAxis"]["type"] = "category"
      options["yAxis"]["type"] = "value"

      options["series"][0]["data"] = this.data.plotting_data["y_axis"]
    }
    else{
        throw new Error('Graph Type is not valid')
    }

    return options
}