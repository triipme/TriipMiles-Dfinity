import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Menu } from "../container";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import RosettaApi from "../../../services/rosetta";
import { ButtonPrimary, Empty, InputText, ScrollHidden } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { ContentModalStyled } from "../../Home/Home.style";
import { useForm } from "react-hook-form";
import { ERRORS } from "../../../utils/constants";
import moment from "moment";
import toast from "react-hot-toast";
import { profile } from "../../../slice/user/userSlice";

const rosettaApi = new RosettaApi();

const Account = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm();
  const { actor, profile: profileData } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLink, setIsOpenLink] = useState(false);
  const [transactions, setTransactions] = useState();
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const handleAddWallet = async data => {
    if (!!actor?.addWallet) {
      try {
        await rosettaApi.accountBalanceByAddress(data["account-id"]);
        const rs = await actor?.addWallet(data["account-id"]);
        if ("ok" in rs) {
          console.log(rs);
          dispatch(profile({ ...rs?.ok[0], _id: rs?.ok[1] }));
          setIsOpenLink(false);
          reset();
        }
      } catch (error) {
        console.error(error);
        toast.error("Link New Wallet Failed");
      } finally {
        setIsOpenLink(false);
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
          {/* <Box>
            <ButtonPrimary onClick={() => setIsOpen(!isOpen)} title="New Transaction" />
          </Box> */}
          <Box ml={1}>
            <ButtonPrimary
              onClick={() => setIsOpenLink(!isOpenLink)}
              title={profileData?.wallets?.at(0) ? "Change wallet" : "Link a new wallet"}
            />
          </Box>
        </Stack>
      </Stack>
      {profileData?.wallets?.at(0)?.length > 0 ? (
        profileData?.wallets
          ?.at(0)
          ?.map(w => <Wallet key={w} aid={w} onClickCard={() => handlePressCard(w)} />)
      ) : (
        <Empty />
      )}
      {/* <Wallet
        aid={profileData?.wallets?.at(0)[0]}
        onClickCard={() => handlePressCard(profileData?.wallets?.at(0)[0])}
      /> */}

      {/* Modal Form New Transaction */}
      <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <ContentModalStyled width={{ sm: "600px !important" }}>
          <ScrollHidden>
            <FormNewTransaction source={profileData?.wallets?.at(0)[0]} />
          </ScrollHidden>
        </ContentModalStyled>
      </Modal>
      {/* Modal Form Link Wallet */}
      <Modal open={isOpenLink} onClose={() => setIsOpenLink(!isOpenLink)}>
        <ContentModalStyled>
          <ScrollHidden
            sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack flex={1} justifyContent="space-between">
              <Typography variant="h4" align="center" mb={3}>
                {profileData?.wallets?.at(0) ? "Change wallet" : "Link a new wallet"}
              </Typography>
              <Typography variant="body1" mb={1}>
                Enter Address
              </Typography>
              <InputText
                control={control}
                name="account-id"
                helperTextError={ERRORS}
                placeHolder="Address"
              />
              <Typography variant="caption" mb={2} color={theme.palette.grey[500]}>
                If you add a new address, it will replace the current address!. Triip ICP will
                transfer to new wallet next time.
              </Typography>
              <ButtonPrimary
                onClick={handleSubmit(handleAddWallet)}
                title="Add"
                loading={isSubmitting}
              />
            </Stack>
          </ScrollHidden>
        </ContentModalStyled>
      </Modal>
      {/* Modal Transaction */}
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

const FormNewTransaction = ({ source }) => {
  const [balanceAddress, setBalanceAddress] = useState();
  const [statusAddressTo, setStatusAddressTo] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting }
  } = useForm();
  const { actor_transfer } = useSelector(state => state.user);
  const handleAddress = async data => {
    try {
      const checkAddress = await rosettaApi.getAccountBalance(data["address"]);
      const rs = await rosettaApi.getAccountBalance(source);
      setBalanceAddress((Number(rs) / 1e8).toFixed(8));
      setStatusAddressTo(checkAddress?.message !== "Request failed with status code 500");
      if (checkAddress?.message === "Request failed with status code 500") {
        setError("address", {
          type: "manual",
          message: "Address Not Found!"
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleTransfer = async data => {
    // if (!!actor_transfer?.transfer) {
    //   try {
    //     const rs = await actor_transfer?.transfer({ e8s: data["amount"] * 1e8 }, data["address"]);
    //     console.log(rs);
    //     toast.success(`${rs}`);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };
  return (
    <>
      {statusAddressTo ? (
        <>
          <Typography variant="h4" align="center" mb={3}>
            Enter ICP Amount
          </Typography>
          <Typography align="center" variant="body1" fontSize={24}>
            Current Balance
          </Typography>
          <Typography align="center" variant="h5">
            {balanceAddress}
          </Typography>
          <InputText
            control={control}
            name="amount"
            helperTextError={ERRORS}
            placeHolder="Amount"
            label="Amount"
            rules={{
              maxLength: 10
            }}
          />
          <ButtonPrimary onClick={handleSubmit(handleTransfer)} title="Continue" />
          <Typography mt={2} variant="h5">
            Source
          </Typography>
          <Typography overflow="hidden" textOverflow="ellipsis" variant="body1">
            {source.toLowerCase()}
          </Typography>
          <Typography mt={2} variant="h5">
            Destination
          </Typography>
          <Typography overflow="hidden" textOverflow="ellipsis" variant="body1">
            {getValues()?.address}
          </Typography>
          <Typography mt={2} variant="h5">
            Transaction Fee (billed to source)
          </Typography>
          <Typography overflow="hidden" textOverflow="ellipsis" variant="body1">
            0.0001 ICP
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h4" align="center" mb={3}>
            New Transaction
          </Typography>
          <Typography variant="h5">Enter Address</Typography>
          <InputText
            control={control}
            name="address"
            helperTextError={ERRORS}
            helperTextErrorCustom={errors?.address?.message}
            placeHolder="Address"
            rules={{
              pattern: /^[a-zA-Z0-9]/
            }}
          />
          <ButtonPrimary onClick={handleSubmit(handleAddress)} title="Continue" />
        </>
      )}
    </>
  );
};

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
  }, [aid]);
  return (
    <CardContainer onClick={onClickCard}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" alignItems="center">
          <Box
            component="img"
            style={{ maxWidth: 50, maxHeight: 50, marginRight: 10 }}
            src="https://aws1.discourse-cdn.com/business4/uploads/dfn/original/1X/88096d6782c2e395172166d097da5d86e738bbe5.png"
          />
          <Typography variant="h5">DFINITY</Typography>
        </Stack>
        <Typography variant="h4" textAlign="end">
          {(Number(balance?.value) / 1e8).toFixed(8)}
          <Typography variant="body2">{balance?.currency?.symbol ?? "ICP"}</Typography>
        </Typography>
      </Stack>
      <Typography overflow="hidden" textOverflow="ellipsis" variant="subtitle1" marginTop={3}>
        {aid?.toLowerCase()}
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
