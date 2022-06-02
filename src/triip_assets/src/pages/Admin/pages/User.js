import React, { useEffect } from "react";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { Collapse } from "react-collapse";
import { UserListHead, UserListToolbar, UserMoreMenu } from "../components/_dashboard/user";
//
import { useDispatch, useSelector } from "react-redux";
import { useGetFile } from "../../../hooks";
import { getAllTP } from "../../../slice/admin/adminSlice";
import toast, { useToaster, useToasterStore } from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "tpid", label: "Id", alignRight: false },
  { id: "destination", label: "Destination", alignRight: false },
  { id: "created_at", label: "Created At", alignRight: false },
  // { id: "is_received", label: "Received", alignRight: false },
  { id: "have_proof", label: "Proof", alignRight: false },
  { id: "status_approve", label: "Approval status", alignRight: false }
  // { id: "status", label: "Status", alignRight: false },
  // { id: "" }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return parseInt(b[0][1].created_at) - parseInt(a[0][1].created_at);
  });
  if (query) {
    return filter(array, _tp => _tp.tpid.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}

function switchColorApproveStatus(value) {
  switch (value) {
    case "approved":
      return "success";
    case "waitting":
      return "default";
    case "watting":
      return "default";
    default:
      return "error";
  }
}
function switchLabelApproveStatus(value) {
  switch (value) {
    case "approved":
      return "APPROVED";
    case "waitting":
      return "WAITTING";
    case "watting":
      return "WAITTING";
    default:
      return "REJECTED";
  }
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);
  const { actor } = useSelector(state => state.user);
  const { toasts: t } = useToaster();
  useEffect(() => {
    (async () => {
      try {
        const rs = await actor?.getAllTPAdmin();
        if ("ok" in rs) {
          setData(rs?.ok);
          console.log(rs.ok);
        } else {
          throw rs?.err;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [t.length]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.tpid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, tpid) => {
    const selectedIndex = selected.indexOf(tpid);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, tpid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Travel Plan | Triip Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Travel Plan
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}>
            New Travel Plan
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {data?.length > 0 && (
                  <TableBody>
                    {filteredUsers
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map(row => {
                        const { uid, is_received, created_at, ...tp } = row[1];
                        const isItemSelected = selected.indexOf(row[0]) !== -1;
                        return (
                          <React.Fragment key={row[0]}>
                            <TableRow
                              hover
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}>
                              <TableCell padding="checkbox">
                                {/* <Checkbox
                                  checked={isItemSelected}
                                  onChange={event => handleClick(event, row[0])}
                                /> */}
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Box
                                  onClick={() =>
                                    setIsExpanded(row[0] === isExpanded ? "" : row[0])
                                  }>
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar alt={row[0]} src={tp?.travel_plan?.img[0]} />
                                    <Typography
                                      variant="subtitle2"
                                      noWrap
                                      width={120}
                                      textOverflow="ellipsis">
                                      {row[0]}
                                    </Typography>
                                  </Stack>
                                </Box>
                              </TableCell>
                              <TableCell align="left">{tp?.travel_plan?.destination[0]}</TableCell>
                              <TableCell align="left">
                                {moment.unix(parseInt(created_at / BigInt(1e9))).format("L")}
                              </TableCell>
                              {/* <TableCell align="left">{is_received ? "Yes" : "No"}</TableCell> */}
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={row?.at(2)?.length > 0 ? "success" : "default"}>
                                  {row?.at(2)?.length > 0 ? "SUBMITTED" : "WAITTING"}
                                </Label>
                              </TableCell>

                              <TableCell align="center">
                                {row?.at(2)?.length > 0 ? (
                                  <Label color={switchColorApproveStatus(row?.at(2)[0].status)}>
                                    {switchLabelApproveStatus(row?.at(2)[0].status)}
                                  </Label>
                                ) : (
                                  <Typography>-</Typography>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <UserMoreMenu
                                  id_proof={row[0]}
                                  proof={row[2]}
                                  allow_approve={row?.at(2)?.length > 0}
                                />
                              </TableCell>
                            </TableRow>
                            {isExpanded === row[0] && (
                              <TableRow>
                                <TableCell colSpan={8}>
                                  <Collapse isOpened={isExpanded === row[0]}>
                                    <ProofDetail
                                      tp={row[1]?.travel_plan}
                                      proof={row[2]}
                                      vetted={row[3]}
                                      staff={row[4]}
                                    />
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

const ProofDetail = ({ tp, proof, vetted, staff }) => {
  const [img] = useGetFile(proof[0]?.proof?.img_key[0]);
  const { activities, join_type, specific_date, timeEnd, timeStart, days, public_mode } = tp;
  const { activities: acts, join_type: join_type_static } = useSelector(
    state => state.static.travelplan
  );
  return (
    <Box>
      {!!proof?.at(0) ? (
        <Stack flexDirection="row">
          <Box
            component="img"
            objectFit="contain"
            sx={{
              maxHeight: 350,
              maxWidth: 400
            }}
            src={img?.image}
          />
          <Box px={3}>
            <Typography mb={1}>
              <b>Approval status</b>:{" "}
              <Label color={switchColorApproveStatus(proof[0].status)}>
                {switchLabelApproveStatus(proof[0].status)}
              </Label>
            </Typography>
            {vetted?.at(0)?.updated_at && (
              <Typography mb={1}>
                <b>Vetted staff</b>: {staff[0] ?? "Admin"}
              </Typography>
            )}
            <Typography mb={1}>
              <b>User principal</b>: {proof[0].uid + ""}
            </Typography>
            <Typography mb={1} sx={{ flex: 1 }}>
              <b>Categories</b>: {acts?.filter((_, inact) => activities[0][inact]).join(",")}
            </Typography>
            {specific_date[0] ? (
              <>
                <Typography mb={1}>
                  <b> Start date</b>: {moment.unix(timeStart).format("LL").toString()}
                </Typography>
                <Typography mb={1}>
                  <b>End date</b>: {moment.unix(timeEnd).format("LL").toString()}
                </Typography>
              </>
            ) : (
              <Typography mb={1}>
                <b>Number of days</b>: {days + ""} days
              </Typography>
            )}
            <Typography mb={1}>
              <b>Travelplan type</b>: {join_type_static[join_type - 1]}
            </Typography>
            <Typography mb={1}>
              <b>Public</b>: {public_mode[0] + ""}
            </Typography>
            <Typography mb={1}>
              <b>Created at</b>:{" "}
              {moment.unix(parseInt(proof[0].created_at / BigInt(1e9))).format("LL")}
            </Typography>
            {vetted?.at(0)?.updated_at && (
              <Typography mb={1}>
                <b>Updated at</b>: {moment.unix(parseInt(vetted?.at(0)?.updated_at)).format("LL")}
              </Typography>
            )}
          </Box>
        </Stack>
      ) : (
        <Typography align="center">This don't have proof of travel</Typography>
      )}
    </Box>
  );
};
