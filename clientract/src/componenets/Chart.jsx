import React, { Component } from "react";

import Chart from "react-apexcharts";
export default class ChartCaseType extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Case Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
    };
   
  }
  async componentDidMount() {
    try {
      // Call your API service here


      // Process response data and set state
      const { inYear } = this.props;
      const newData = inYear.map(res => res.counth);
      const newCategories = inYear.map(res => res.month_name);

      this.setState({
        series: [
          {
            name: "Case",
            data: newData,
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: newCategories,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div>
        <div id="chart" style={{ color: "black" }}>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
