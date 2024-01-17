import { Grid } from "@mui/material";
import React, { PureComponent } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const ExpensesChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const groupedExpenses = data.reduce((acc, expense) => {
    const expensesType = expense.expensesType_name;

    // If the expensesType is not in the accumulator, add it with an empty array
    if (!acc[expensesType]) {
      acc[expensesType] = [];
    }

    // Push the current expense to the expensesType array
    acc[expensesType].push(expense);

    return acc;
  }, {});

  const groupedExpensesArray = Object.entries(groupedExpenses).map(
    ([expensesType, expenses]) => ({
      expensesType: expensesType, // Convert expensesType back to a number if needed
      totalExpenses: expenses.reduce((total, exp) => total + exp.expenses, 0),
    })
  );
  const newEvents = groupedExpensesArray.map((res) => ({
    name: res.expensesType,
    pv: res.totalExpenses,
  }));
  const data4 = groupedExpensesArray.map((res) => ({
    name: res.expensesType,
    value: res.totalExpenses,
  }));

  return (
    <div>
      <Grid item container>
        <Grid xs={6} md={6} xl={6}>
          <ResponsiveContainer width={"100%"} height={500}>
            <BarChart
              width={500}
              height={300}
              data={newEvents}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="pv"
                name="จำนวนเงิน"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid xs={6} md={6} xl={6}>
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data4}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExpensesChart;
