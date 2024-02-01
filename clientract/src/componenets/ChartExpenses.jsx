import React, { Component } from "react";
import Chart from "react-apexcharts";
export default class ChartExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        responsive: [
            {
              breakpoint: 400,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        
        dataLabels: {
          enabled: false,
          
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "Germany",
          ],
          
        },
      },
    };
  }
  async componentDidMount() {
    try {
      // Call your API service here


      // Process response data and set state
      const { expenses } = this.props;
      const newData = expenses.map(res => res.total_expenses);
      const newCategories = expenses.map(res => res.expensesType_name);

      this.setState({
        series: [
          {
           
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
        <div id="chart" style={{color:"black"}}>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
