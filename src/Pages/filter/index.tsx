import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Card, Container } from "react-bootstrap";
import Chat from "../admen_page/chat";
import Cards from "../cards";

const Filter = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", border: "none" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <TabList onChange={handleChange}>
                <Tab
                  style={{
                    border: "none",
                  }}
                  label="Barcha animelar"
                  value="1"
                />
                <Tab label="Mangalar" value="2" />
                <Tab label="Chat" value="3" />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1">
            <Cards />
          </TabPanel>
          <TabPanel value="2">Mangalar</TabPanel>
          <TabPanel value="3">
            <Chat name="" profileImage="" />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Filter;
