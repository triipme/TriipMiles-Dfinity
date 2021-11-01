import React, { useState } from "react";
import { Typography, Modal, Container, Button, Box, Grid } from "@mui/material/index";
import { Banner, ContentModalStyled } from "./Home.style";
import HomeForm from "./Home.form";

const Home = () => {
  const partners = [
    { url: "../../../assets/images/partners-01.png", alt: "Agoda" },
    { url: "../../../assets/images/partners-02.png", alt: "Booking.com" },
    { url: "../../../assets/images/partners-03.png", alt: "PATA" },
    { url: "../../../assets/images/partners-04.png", alt: "amadeus" },
    { url: "../../../assets/images/partners-05.png", alt: "Visa" },
    { url: "../../../assets/images/partners-06.png", alt: "NTTCommunication" },
    { url: "../../../assets/images/partners-07.png", alt: "UNWTO" },
    { url: "../../../assets/images/partners-08.png", alt: "GLOBALTX" }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Banner sx={{ p: 0, backgroundImage: "url(../../../assets/images/home_guess.png)" }} />
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
        <Modal open={isOpen} onClose={handleCloseModal} keepMounted>
          <ContentModalStyled>
            <HomeForm handleIsOpen={setIsOpen} />
          </ContentModalStyled>
        </Modal>
      </Container>
      <Banner sx={{ p: 0, backgroundImage: "url(../../../assets/images/home_login.png)" }} />
      <Container maxWidth="lg" sx={{ textAlign: "center", my: 10 }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          Our strategic partners
        </Typography>
        <Grid sx={{ my: 3 }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {partners.map(item => (
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
      <Box sx={{ px: 10, py: 10, textAlign: "center", backgroundColor: "#f3f3f3" }}>
        <Typography sx={{ my: 2, fontWeight: "500" }} variant="h4">
          The fastest-growing blockchain travel co-op
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
            />
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
            />
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundImage: "url(../../../assets/images/app-img.png)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
              // height: 750
            }}></Box>
          <Box sx={{ flex: 1 }}>
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
              type="end"
            />
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
              type="end"
            />
            <FeatureItem
              icon="../../../assets/images/ai-icon.png"
              title="+430,000"
              subtitle="trust users"
              type="end"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const FeatureItem = ({ icon, title, subtitle, type = "start" }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: type, my: 10 }}>
      <img src={icon} alt="" style={{ height: 70, margin: 0 }} />
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  );
};

export default Home;
