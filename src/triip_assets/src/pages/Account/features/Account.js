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
        <Box>
          <ButtonPrimary onClick={() => setIsOpen(!isOpen)} title="Link a new account" />
        </Box>
        {/* <Typography variant="h3" textAlign="end">
          125125
          <Typography variant="body1">ICP</Typography>
        </Typography> */}
      </Stack>
      {profile?.wallets?.at(0)?.map(w => (
        <Wallet key={w} aid={w} onClickCard={() => handlePressCard(w)} />
      ))}
      <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)}>
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
        <ContentModalStyled width={{ sm: "700px !important" }}>
          <ScrollHidden
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
            {transactions?.map((tran, trani) => (
              <Box key={trani} p={2} mb={4} boxShadow={theme.shadows[10]} borderRadius={3}>
                <Stack flexDirection="row">
                  <Typography variant="h5">{Number(tran?.fee) / 1e8}</Typography>
                </Stack>
                <Stack flexDirection="row">
                  {/* <Typography width={350} overflow="hidden" textOverflow="ellipsis">
                    {tran?.account1Address}
                  </Typography> */}
                </Stack>
                <Typography>{moment(tran?.timestamp).format("LL")}</Typography>
                <Typography>To: {tran?.account2Address}</Typography>
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
