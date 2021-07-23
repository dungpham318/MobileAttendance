import React from 'react'
import { Line } from 'react-chartjs-2'


const LineChart = (props) => {

  const data = {
    labels: props.label,
    datasets: [
      {
        label: '',
        data: props.data,
        fill: false,
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        backgroundColor: [
          // 'rgba(54, 162, 235, 1)',
        ],
        borderColor: props.borderColor,
        borderWidth: 3,
      },
    ],
  }

  return (
    <>
      <Line
        data={data}
        options={{
          title: {
            display: props.displayTitle,
            text: props.title,
            fontSize: 20,
          },
          legend: {
            display: props.displayLegend,
            position: props.legendPosition,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
    </>
  )
}

LineChart.defaultProps = {
  displayLegend: true,
  legendPosition: "bottom",
  location: "City",
  borderColor: 'rgba(54, 162, 235, 1)'
}
export default LineChart