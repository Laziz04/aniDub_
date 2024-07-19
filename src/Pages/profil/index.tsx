import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-bootstrap/Modal";
import Component from "./components";
import "./profil.css";
import { Button } from "react-bootstrap";
import { GoPlus } from "react-icons/go";

const Profil: React.FC = () => {
  const [value, setValue] = useState<string>("1");
  const [selectedImage, setSelectedImage] = useState<string>(
    localStorage.getItem("selectedImage") ||
      "https://i.pinimg.com/736x/b8/76/2a/b8762aadbcfe53e83057c8eed9bc8ea2.jpg"
  );
  const [selectedProfilImage, setSelectedProfilImage] = useState<string>(
    localStorage.getItem("selectedProfilImage") ||
      "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
  );

  const Profilimg = {
    images: [
      {
        id: 1,
        src:
          "https://i.pinimg.com/736x/27/b9/46/27b9464ddd198da1f76bdbd45d4d5078.jpg",
      },
      {
        id: 2,
        src: "https://cdn.pfps.gg/pfps/6001-anime.png",
      },
      {
        id: 3,
        src: "https://cdn.imgchest.com/files/3yrgck3ovg4.png",
      },
      {
        id: 4,
        src:
          "https://img.freepik.com/premium-photo/cute-handsome-anime-boy-blue-light_675932-435.jpg?w=360",
      },
      {
        id: 5,
        src:
          "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg",
      },
    ],
  };

  const Bacgrounimg = {
    images: [
      {
        id: 1,
        src: "https://wallpapersmug.com/large/058c6f/a-world-full-of-red.jpg",
      },
      {
        id: 2,
        src:
          "https://i.pinimg.com/originals/b4/e6/2e/b4e62eb8bc6c48830d5b6b87c60a84c1.jpg",
      },
      {
        id: 3,
        src: "https://images.alphacoders.com/736/736461.png",
      },
      {
        id: 4,
        src:
          "https://img.freepik.com/premium-photo/scenic-cherry-blossom-garden-with-pagoda-by-sea-with-mountains-silhouet-generative-ai_272168-10218.jpg",
      },
      {
        id: 5,
        src:
          "https://img.freepik.com/premium-photo/painting-tree-middle-lake-generative-ai_900370-31.jpg",
      },
    ],
  };

  const name = localStorage.getItem("name") || "User";
  const storedPhone = localStorage.getItem("phone");
  const [openModal, setOpenModal] = useState(false);
  const balans = "0 So'm";

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleProfilImageSelect = (imageprofilSrc: string) => {
    setSelectedProfilImage(imageprofilSrc);
    localStorage.setItem("selectedProfilImage", imageprofilSrc);
    handleCloseModal();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setSelectedProfilImage(imageUrl);
        localStorage.setItem("selectedProfilImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedImage", selectedImage);
  }, [selectedImage]);

  return (
    <Box className="p-5">
      <Box
        sx={{
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px 20px 0 0",
              height: "300px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                color: "white",
              }}
            >
              <img
                onClick={handleOpenModal}
                className="shadow-lg profil_logo hover:transform hover:scale-110 transition-transform duration-300"
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  cursor: "pointer",
                }}
                src={selectedProfilImage}
                alt="User"
              />
              <div>
                <h3>
                  <strong>{name}</strong>
                </h3>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0 0 20px 20px",
              position: "relative",
              zIndex: 1,
              padding: "20px",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  <Tab label="Profil" value="1" />
                  <Tab label="Sevimlilar" value="2" />
                  <Tab label="Galeriya" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box className=" flex gap-2 items-center">
                  <Box
                    className="boxShadow"
                    sx={{
                      width: "200px",
                      height: "240px",
                      backgroundImage: `url(${selectedProfilImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                        right: "15px",
                        position: "absolute",
                        bottom: "15px",
                      }}
                    >
                      <button
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                      >
                        <GoPlus
                          style={{
                            color: "white",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                        />
                      </button>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </Box>
                  <div
                    style={{
                      flexDirection: "column",
                    }}
                    className=" mt-2  w-12  flex gap-2"
                  >
                    <button className=" button_text">
                      Ism : <span>{name}</span>
                    </button>
                    <button className=" button_text">
                      Tel : {storedPhone}
                    </button>

                    <button className=" button_text">Balans : {balans}</button>
                    <button className=" button_text">Hisobni To'ldirish</button>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="2">Sevimlilar sahifasi</TabPanel>
              <TabPanel value="3">
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "40px",
                    marginBottom: "10px",
                  }}
                >
                  {Bacgrounimg.images.map((image) => (
                    <Component
                      key={image.id}
                      src={image.src}
                      onSelect={handleImageSelect}
                    />
                  ))}
                </Box>
              </TabPanel>
            </TabContext>
          </div>
        </Box>
      </Box>

      <Modal show={openModal} onHide={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
          className="text-teal-500 bg-gray-100 rounded-lg shadow-md p-7"
        >
          {Profilimg.images.map((image) => (
            <Box key={image.id}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "transform 0.5s, box-shadow 0.5s",
                  transform: "rotateY(0deg) rotateX(0deg)",
                  boxShadow:
                    "10px 10px 15px rgba(0, 0, 0, 0.3), -10px -10px 15px rgba(255, 255, 255, 0.1)",
                }}
                src={image.src}
                alt=""
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotateX(-10deg)";
                  e.currentTarget.style.boxShadow =
                    "10px 10px 20px rgba(0, 0, 0, 0.6), -10px -10px 20px rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotateX(0deg)";
                  e.currentTarget.style.boxShadow =
                    "10px 10px 15px rgba(0, 0, 0, 0.3), -10px -10px 15px rgba(255, 255, 255, 0.1)";
                }}
                onClick={() => handleProfilImageSelect(image.src)}
              />
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default Profil;
