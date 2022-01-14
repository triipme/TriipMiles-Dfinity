import React, { useMemo } from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AppConversionRates({ data }) {
  const data_chart = useMemo(() => {
    let des_arr = {};
    data?.forEach(destination => {
      des_arr[destination] = des_arr[destination] ? des_arr[destination] + 1 : 1;
    });
    return des_arr;
  }, [data]);
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: seriesName => fNumber(seriesName),
        title: {
          formatter: seriesName => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 }
    },
    xaxis: {
      categories: Object.keys(data_chart)
    }
  });

  return (
    <Card>
      {/* <CardHeader title="Top Destination" subheader="(+43%) than last year" /> */}
      <CardHeader title="Top Destination" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: Object.values(data_chart) }]}
          options={chartOptions}
          height={394}
        />
      </Box>
    </Card>
  );
}
