export function getOptionForGraph (){
    var options = {
      responsive: true,
      scale: true,
      xAxis: {
        type:"",
        data: [],
        name: this.data.label_x,
        nameLocation: "center",
      },
      yAxis: {
        type: "",
        name: this.data.label_y,
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

    if(this.type === "scatter"){
      delete options["xAxis"]["data"]
      delete options["xAxis"]["type"]
      delete options["yAxis"]["type"]

      options["series"][0]["data"] = this.data.plotting_data
    }
    else{
      options["xAxis"]["data"] =this.data.plotting_data["x_axis"]
      options["xAxis"]["type"] = "category"
      options["yAxis"]["type"] = "value"

      options["series"][0]["data"] = this.data.plotting_data["y_axis"]
    }
    return options
}