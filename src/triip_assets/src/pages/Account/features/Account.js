import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Menu } from "../container";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import RosettaApi from "../../../services/rosetta";
import { ButtonPrimary, InputText, ScrollHidden } from "../../../components";
import { useSelector } from "react-redux";
import { ContentModalStyled } from "../../Home/Home.style";
import { useForm } from "react-hook-form";
import { ERRORS } from "../../../utils/constants";
import moment from "moment";

const rosettaApi = new RosettaApi();

const Account = props => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm();
  const { actor, profile } = useSelector(state => state.user);
  console.log(actor);
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState();
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const handleAddWallet = async data => {
    if (!!actor?.addWallet) {
      try {
        const rs = await actor?.addWallet(data["account-id"]);
        console.log(rs);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handlePressCard = async w => {
    setIsOpenTransaction(!isOpenTransaction);
    (async () => {
      try {
        const rs = await rosettaApi.getTransactionsByAccount(w);
        console.log(rs);
        setTransactions(rs);
      } catch (error) {
        console.error(error);
      }
    })();
  };
  return (
    <div>
      <Stack flexDirection="row" justifyContent="space-between" marginBottom={5}>
        <Typography variant="h3">Accounts</Typography>
        <Stack flexDirection="row" alignItems="center">
          <Box>
            <ButtonPrimary onClick={() => {}} title="New Transaction" />
          </Box>
          <Box ml={1}>
            <ButtonPrimary onClick={() => setIsOpen(!isOpen)} title="Link a new account" />
          </Box>
        </Stack>
        {/* <Typography variant="h3" textAlign="end">
          125125
          <Typography variant="body1">ICP</Typography>
        </Typography> */}
      </Stack>
      {profile?.wallets?.at(0)?.map(w => (
        <Wallet key={w} aid={w} onClickCard={() => handlePressCard(w)} />
      ))}
      <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)} keepMounted>
        <ContentModalStyled>
          <ScrollHidden
            sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack flex={1} justifyContent="space-between">
              <Typography variant="h4" align="center" mt={3}>
                Link a new account
              </Typography>
              <InputText control={control} name="account-id" helperTextError={ERRORS} />
              <ButtonPrimary onClick={handleSubmit(handleAddWallet)} title="Add" />
            </Stack>
          </ScrollHidden>
        </ContentModalStyled>
      </Modal>
      <Modal open={isOpenTransaction} onClose={() => setIsOpenTransaction(!isOpenTransaction)}>
        <ContentModalStyled width={{ sm: "700px !important" }} pb={5}>
          <ScrollHidden
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
            {transactions?.reverse()?.map((tran, trani) => (
              <Box
                key={trani}
                p={2}
                mb={transactions?.length - 1 === trani ? 0 : 2}
                boxShadow={theme.shadows[5]}
                borderRadius={1}>
                <Stack flexDirection="row" alignItems="center">
                  <Box maxWidth="35%" mr={1}>
                    <Typography width="100%" textOverflow="ellipsis" overflow="hidden">
                      {tran?.hash}
                    </Typography>
                    <Typography>{moment(tran?.timestamp).format("LL")}</Typography>
                  </Box>
                  <Box maxWidth="40%" mr={1}>
                    <Typography whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                      <b>From:</b> {tran?.account1Address}
                    </Typography>
                    <Typography whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                      <b>To:</b> {tran?.account2Address}
                    </Typography>
                  </Box>
                  <Typography align="center" width="25%" variant="body1">
                    <b>{(Number(tran?.amount) / 1e8).toFixed(8)}</b> ICP
                  </Typography>
                </Stack>
              </Box>
            ))}
          </ScrollHidden>
        </ContentModalStyled>
      </Modal>
    </div>
  );
};

Account.propTypes = {};

const Wallet = ({ aid, onClickCard }) => {
  const [balance, setBalance] = useState();
  useEffect(() => {
    (async () => {
      try {
        const memo = await rosettaApi.accountBalanceByAddress(aid);
        setBalance(memo?.balances[0]);
        console.log(memo);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <CardContainer onClick={onClickCard}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" alignItems="center">
          <Box
            component="img"
            style={{ maxWidth: 50, maxHeight: 50, marginRight: 10 }}
            src="https://aws1.discourse-cdn.com/business4/uploads/dfn/original/1X/88096d6782c2e395172166d097da5d86e738bbe5.png"
          />
          <Typography variant="h5">Internet Computer (DFINITY)</Typography>
        </Stack>
        <Typography variant="h4" textAlign="end">
          {balance?.value / 1e8}
          <Typography variant="body2">{balance?.currency?.symbol}</Typography>
        </Typography>
      </Stack>
      <Typography variant="subtitle1" marginTop={3}>
        {aid}
      </Typography>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  borderRadius: 20,
  padding: "15px 30px 30px",
  boxShadow: theme.shadows[17],
  marginBottom: 40
}));

export default Account;
