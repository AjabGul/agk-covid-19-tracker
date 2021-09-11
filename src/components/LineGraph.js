import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {numeral} from "numeral";


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "DD/MM/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};


function LineGraph({ casesType='cases' }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchGraphData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120");
      const data = await response.json();
      // console.log(data)
      let chartData = buildChartData(data, casesType);
      setData(chartData);
        // console.log(chartData)
    };

    fetchGraphData();
  }, [casesType]);

  return (
    <div>
      {/* data?.length > 0 && ==> data && data.length > 0 &&  */}
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
                label: "Cases World Wide",
                fill: true,
                backgroundColor: 'pink',
                borderColor: 'orange',
                borderWidth: 2,
              },
            ],
          }}

          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;