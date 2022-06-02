import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import NumberFormat from 'react-number-format';
import DataTable from 'react-data-table-component';

import {
  Button,
  TableContainer,
  Paper,
  Grid
} from "@mui/material";
import Page from "../../components/Page";

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [loadingRetry, setLoadingRetry] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { actor } = useSelector(state => state.user);
  const columns = useMemo(
    () => [
      {
        name: 'Caller',
        selector: row => row.caller,
        format: row => row.caller.toText(),
        sortable: false,
        wrap: true,
      },
      {
        name: 'Block Index',
        selector: row => row.blockIndex,
        format: row => row.blockIndex?.toString(),
        sortable: true,
        wrap: true,
      },
      {
        name: 'Address',
        selector: row => row.toAddress,
        sortable: false,
        wrap: true,
      },
      {
        name: 'Amount',
        selector: row => row.amount,
        sortable: false,
        cell: row => (
          <NumberFormat
            value={parseICP(row.amount.e8s)} displayType={'text'}
            thousandSeparator={true} suffix={' ICP'}
          />
        ),
        ignoreRowClick: true,
      },
      {
        name: 'Fee',
        selector: row => row.fee,
        sortable: false,
        cell: row => (
          <NumberFormat
            value={parseICP(row.fee.e8s)} displayType={'text'}
            thousandSeparator={true} suffix={' ICP'}
          />
        ),
      },
      {
        name: 'Reference Type',
        selector: row => row.refType,
        sortable: false,
      },
      {
        name: 'Reference ID',
        selector: row => row.refId,
        sortable: false,
        wrap: true,
      },
      {
        name: 'Timestamp',
        selector: row => row.timestamp,
        format: row => moment.unix(parseInt(row.timestamp / BigInt(1e9))).format("lll"),
        sortable: true,
      },
      {
        name: 'Tx Error',
        selector: row => row.txError,
        sortable: false,
        wrap: true,
      },
      {
        name: 'Retry',
        selector: row => row.uuid,
        sortable: false,
        cell: row => (
          row.txError?.length > 0 && (<Button
            onClick={() =>
              handleRetry(row.uuid)
            }
            style={{
              backgroundColor: 'red'
            }}
            variant="contained"
            className="info-btn">
            {
              'Retry'
            }
          </Button>)
        ),
        ignoreRowClick: true,
        button: true,
        allowOverflow: true,
      },
    ],
    []
  );

  async function getTransactions() {
    try {
      if (!!actor?.listTransactions) {
        const result = await actor.listTransactions();
        if ("ok" in result) {
          setTransactions(result.ok);
          setLoading(false);
        } else {
          throw result.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);

  async function handleRetry(uuid) {
    if (!!loadingRetry[uuid]) {
      toast('Loading...');
      return;
    }
    try {
      if (!!actor?.retryTransaction) {
        const loadings = loadingRetry;
        loadings[uuid] = true;
        setLoadingRetry(loadings);
        const result = await actor.retryTransaction(uuid);
        if ("ok" in result) {
          toast.success("Success !.");
          getTransactions();
        } else {
          toast.error(result.err);
        }
        loadings[uuid] = false;
        setLoadingRetry(loadings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Transactions | Triip Admin">
      <TableContainer component={Paper}>
        <Grid
          className="infor-manual"
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start">
          <DataTable title="Transactions" columns={columns} data={transactions} progressPending={loading} pagination />
        </Grid>
      </TableContainer>
    </Page>
  );
};

function parseICP(amount) {
  return parseInt(amount) / 1e9;
}

export default Transactions;
