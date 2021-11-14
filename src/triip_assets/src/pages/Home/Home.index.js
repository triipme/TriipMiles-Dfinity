import React, { useState } from "react";
import { Typography, Modal, Container, Button, Box, Grid, Tabs } from "@mui/material/index";
import { Banner, StepItemImage, TabPanelButton, TabStyled } from "./Home.style";
import HomeForm from "./Home.form";
import { Images } from "../../theme";
import { Footer } from "../../containers";
import { useToaster } from "react-hot-toast";
import ReactPlayer from "react-player/lazy";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleTab = (_, v) => setTab(v);
  console.log(tab);
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Notifications />
      <Banner
        sx={{
          p: 0,
          backgroundImage: `url(https://ik.imagekit.io/1cfogorcfir/home-guess_woTiAsOzG.png?updatedAt=1635851168116)`
        }}
      />
      <Container maxWidth="md" sx={{ my: 10, textAlign: "center" }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          Own the world’s first sustainable travel co-op
        </Typography>
        <Typography sx={{ my: 2 }} variant="h5">
          Become a co-owner today to earn money for future trips while saving our home planet
        </Typography>
        <Button variant="primary" onClick={handleOpenModal}>
          Create travel plan to earn $ICP
        </Button>
        <Modal open={isOpen} onClose={handleCloseModal}>
          <div>
            <HomeForm handleIsOpenParent={setIsOpen} />
          </div>
        </Modal>
      </Container>
      <Banner
        sx={{
          display: "grid",
          placeItems: "center",
          p: 0,
          backgroundImage: `url(https://ik.imagekit.io/1cfogorcfir/home_login_gcY1vzK7V_.png?updatedAt=1635851167552)`
        }}>
        <ReactPlayer width="70%" height="85%" url="https://youtu.be/78hvrYFh26w" />
      </Banner>
      <Container maxWidth="lg" sx={{ textAlign: "center", my: 10 }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          Our strategic partners
        </Typography>
        <Grid sx={{ my: 3 }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Images.home.partners.map(item => (
            <Grid key={item.alt} item xs={3} sx={{ display: "grid", placeItems: "center" }}>
              <img
                style={{ width: "100%", height: "80px", objectFit: "contain" }}
                src={item.url}
                alt={item.alt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ p: 10, textAlign: "center", backgroundColor: "#f3f3f3" }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          The fastest-growing blockchain travel co-op
        </Typography>

        <Box sx={{ display: "flex", mt: 5 }}>
          <Box sx={{ flex: 1 }}>
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
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${Images.home.app})`,
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
              // height: 750
            }}></Box>
          <Box sx={{ flex: 1 }}>
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
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ textAlign: "center", my: 10 }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          The fastest-growing blockchain travel co-op
        </Typography>
        <Box sx={{ display: "flex" }}>
          <StepItem
            title="1. Create your account"
            subtitle="Signing up for your own Triip account is easy and free"
            image={Images.home.step[0]}
          />
          <StepItem title="2. Confirm your email address" image={Images.home.step[1]} />
          <StepItem
            title="3. Earn TIIM everyday"
            subtitle="Many activities with excited prizes are waiting you everyday"
            image={Images.home.step[2]}
          />
        </Box>
      </Container>
      <Box sx={{ p: 10, backgroundColor: "#f3f3f3" }}>
        <Typography sx={{ my: 2, fontWeight: "500", textAlign: "center" }} variant="h4">
          Utilities and services
        </Typography>
        <Tabs value={tab} onChange={handleTab} variant="fullWidth">
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
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  );
};
const StepItem = ({ image, title, subtitle }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <StepItemImage src={image} alt="" />
      <Typography sx={{ fontWeight: "500" }} variant="h5">
        {title}
      </Typography>
      <Typography variant="h5">{subtitle} </Typography>
    </Box>
  );
};

const TabPanel = ({ value, index, children, data, title }) => {
  return (
    <Box hidden={value !== index}>
      <Grid container>
        <Grid item xs={6} sx={{ justifyContent: "start" }}>
          {data.map(item => (
            <Box
              key={item}
              sx={{ display: "flex", alignItems: "center", justifyContent: "start", my: 5 }}>
              <img src={Images.icon.check} alt={item} style={{ height: 50, marginRight: 20 }} />
              <Typography variant="h5" sx={{ flex: 1 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ pl: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={Images.home.tab[index]}
            alt=""
            style={{
              marginTop: 50,
              width: index === 0 ? "100%" : "auto",
              height: index === 0 ? 400 : "100%",
              objectFit: index === 0 ? "contain" : "cover"
            }}
          />
          <TabPanelButton sx={{ width: "60%", mt: 5 }}>{title}</TabPanelButton>
        </Grid>
      </Grid>
    </Box>
  );
};

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    <div
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      style={{
        position: "fixed",
        zIndex: 999,
        top: 10,
        right: 20
      }}>
      {toasts
        .filter(toast => toast.visible)
        .map(toast => (
          <div
            key={toast.id}
            {...toast.ariaProps}
            style={{ backgroundColor: "white", padding: "10px 20px", borderRadius: 100 }}>
            {toast.message}
          </div>
        ))}
    </div>
  );
};
export default Home;
