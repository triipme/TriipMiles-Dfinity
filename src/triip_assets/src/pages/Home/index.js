import React, { useState } from "react";
import { Typography, Modal, Container, Button, Box, Grid, Tabs, Fade } from "@mui/material/index";
import { Banner, StepItemImage, TabPanelButton, TabStyled } from "./Home.style";
import HomeForm from "./Home.form";
import { Images } from "../../theme";
import { Footer } from "../../containers";
import ReactPlayer from "react-player/lazy";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleTab = (_, v) => setTab(v);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Banner
        sx={{
          p: 0,
          backgroundImage: `url(${Images.home.guess})`
        }}
      />
      <Container maxWidth="md" sx={{ my: 10, textAlign: "center" }}>
        <Typography sx={{ my: 2 }} variant="h4">
          Own the world’s first sustainable travel co-op
        </Typography>
        <Typography sx={{ my: 2 }} variant="body1">
          Become a co-owner today to earn money for future trips while saving our home planet
        </Typography>
        <Button variant="primary" onClick={handleOpenModal}>
          Create travel plan to earn $ICP
        </Button>
        <Modal open={isOpen} onClose={handleCloseModal} sx={{ zIndex: "7 !important" }}>
          <Fade in={isOpen}>
            <div>
              <HomeForm handleIsOpenParent={setIsOpen} />
            </div>
          </Fade>
        </Modal>
      </Container>
      <Banner
        sx={{
          display: "grid",
          placeItems: "center",
          p: 0,
          backgroundImage: `url(${Images.home.login})`
        }}>
        <ReactPlayer width="75%" height="85%" url="https://www.youtube.com/embed/78hvrYFh26w" />
      </Banner>
      <Container maxWidth="lg" sx={{ textAlign: "center", my: 10 }}>
        <Typography sx={{ my: 2 }} variant="h4">
          Our strategic partners
        </Typography>
        <Grid sx={{ my: 3 }} container rowSpacing={5} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
          {Images.home.partners.map(item => (
            <Grid key={item.alt} item xs={6} lg={3} sx={{ display: "grid", placeItems: "center" }}>
              <Box
                sx={{ width: "80%", height: "80px", objectFit: "contain" }}
                component="img"
                src={item.url}
                alt={item.alt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box padding={{ xs: 2, sm: 10 }} sx={{ textAlign: "center", backgroundColor: "#f3f3f3" }}>
        <Typography sx={{ my: 2 }} variant="h4">
          The fastest-growing blockchain travel co-op
        </Typography>
        <Grid container>
          <Grid item xs={6} md={3} order={{ xs: 2, md: 1 }}>
            <FeatureItem icon={Images.icon.user} title="430,000+" subtitle="trust users" />
            <FeatureItem
              icon={Images.icon.travelplan}
              title="30,000+"
              subtitle="travel plan submitted"
            />
            <FeatureItem
              icon={Images.icon.volumn}
              title="40,000,000+"
              subtitle="80,000+ Tours & Activites"
            />
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              component="img"
              src={Images.home.app}
              maxWidth={{ xs: "70%", md: "50%" }}
              maxHeight="100%"
              sx={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={6} md={3} order={{ xs: 3, md: 3 }}>
            <FeatureItem
              icon={Images.icon.reward}
              subtitle="The only travel app based-on blockchain network rewards users whatever they completed."
              type="end"
            />
            <FeatureItem
              icon={Images.icon.ai}
              subtitle="AI-powered KYC & Travel Plan solutions"
              type="end"
            />
            <FeatureItem
              icon={Images.icon.secure}
              subtitle="Safe security payment by international standards."
              type="end"
            />
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg" sx={{ textAlign: "center", my: 10 }}>
        <Typography sx={{ my: 2 }} variant="h4">
          It’s easy to get started
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <StepItem
              title="1. Create your account"
              subtitle="Signing up for your own Triip account is easy and free"
              image={Images.home.step[0]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StepItem title="2. Confirm your email address" image={Images.home.step[1]} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StepItem
              title="3. Earn TIIM everyday"
              subtitle="Many activities with excited prizes are waiting you everyday"
              image={Images.home.step[2]}
            />
          </Grid>
        </Grid>
      </Container>
      <Box padding={{ xs: 4, sm: 2, md: 10 }} sx={{ backgroundColor: "#f3f3f3" }}>
        <Typography sx={{ my: 2, textAlign: "center" }} variant="h4">
          Utilities and services
        </Typography>
        <Tabs
          value={tab}
          onChange={handleTab}
          variant="fullWidth"
          orientation={matches ? "horizontal" : "vertical"}>
          <TabStyled label="Hotel Booking" />
          <TabStyled label="Travel" />
          <TabStyled label="Online Shopping" />
        </Tabs>
        <TabPanel
          title="Sign up Now"
          value={tab}
          index={0}
          data={[
            "More than 28 million reported accommodation listings, including over 6.2 million homes, apartments, and other unique places to stay.",
            "Better than the best price",
            "Large inventory from Booking.com and Agoda",
            "Easily booking with TriipMiles"
          ]}>
          Hotel Booking
        </TabPanel>
        <TabPanel
          title="Book Now"
          value={tab}
          index={1}
          data={[
            "100,000+ activies in 100+ countries",
            "Best price guranateed",
            "Quick payment, instant ticket receipt",
            "Easily booking with TIIM"
          ]}>
          Travel
        </TabPanel>
        <TabPanel
          title="Shop Now"
          value={tab}
          index={2}
          data={[
            "Personalized design, affordable prices",
            "Global shipping",
            "High quality materials",
            "Easily booking with TIIM"
          ]}>
          Online Shopping
        </TabPanel>
      </Box>
      <Footer />
    </Container>
  );
};

const FeatureItem = ({ icon, title, subtitle, type = "start" }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: type, textAlign: type, my: 8 }}>
      <img src={icon} alt="" style={{ height: 60, margin: 0 }} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  );
};
const StepItem = ({ image, title, subtitle }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <StepItemImage src={image} alt="" />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{subtitle} </Typography>
    </Box>
  );
};

const TabPanel = ({ value, index, children, data, title }) => {
  return (
    <Box hidden={value !== index}>
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={12} md={6} sx={{ justifyContent: "start" }}>
          {data.map(item => (
            <Box
              key={item}
              sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}
              marginTop={{ xs: 2, md: 5 }}>
              <img src={Images.icon.check} alt={item} style={{ height: 50, marginRight: 20 }} />
              <Typography variant="h6" sx={{ flex: 1 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          pl={{ xs: 0, md: 5 }}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={Images.home.tab[index]}
            alt=""
            style={{
              marginTop: 50,
              maxWidth: "100%",
              maxHeight: 400,
              objectFit: index === 0 ? "contain" : "cover"
            }}
          />
          <TabPanelButton sx={{ mt: 5 }}>{title}</TabPanelButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
