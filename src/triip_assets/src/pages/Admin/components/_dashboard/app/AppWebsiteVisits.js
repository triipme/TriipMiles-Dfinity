import React, { useEffect, useMemo, useState } from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";
import RosettaApi from "../../../../../services/rosetta";
import { async } from "q";
import moment from "moment";

// ----------------------------------------------------------------------

const CHART_DATA = [
  // {
  //   name: "Team A",
  //   type: "column",
  //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  // },
  // {
  //   name: "Team B",
  //   type: "area",
  //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  // },
  {
    name: "Team C",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];
const rosetta = new RosettaApi();
const ADDRESS_ADMIN =
  "1258F4461440E1149DD1B42A9D566B82EA46014BEF1FBCD2D67124B7496FA477".toLocaleLowerCase();
export default function AppWebsiteVisits() {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      try {
        const rs = await rosetta.getTransactionsByAccount(ADDRESS_ADMIN);
        setData(rs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 2] },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient"] },
    labels: data?.map(t => moment(t?.timestamp).format("YYYY-MM-DDTHH:mm")).filter(Boolean),
    xaxis: {
      type: "datetime"
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: y => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(8)} ICP`;
          }
          return y;
        }
      }
    }
  });
  const Ysend = useMemo(() => {
    return data?.map(t => (t.account1Address === ADDRESS_ADMIN ? Number(t.amount) / 1e8 : 0));
  }, [data]);
  const Yreceive = useMemo(() => {
    return data?.map(t => (t.account2Address === ADDRESS_ADMIN ? Number(t.amount) / 1e8 : 0));
  }, [data]);
  return (
    <Card>
      <CardHeader title="Triip ICP" />
      {/* <CardHeader title="Triip ICP" subheader="(+43%) than last year" /> */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Send",
              type: "line",
              data: Ysend
            },
            {
              name: "Receive",
              type: "area",
              data: Yreceive
            }
          ]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
