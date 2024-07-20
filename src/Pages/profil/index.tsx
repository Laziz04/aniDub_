import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-bootstrap/Modal";
import Component from "./components";
import "./profil.css";
import { GoPlus } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import { click } from "@testing-library/user-event/dist/click";
import clik from "./clik.png";
import payme from "./payme.png";
import uzum from "./uzum.png";
import hr from "./hr.png";
import Chat from "../admen_page/chat";

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
  const [openModalsend, setOpenModalsend] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editablePhone, setEditablePhone] = useState(storedPhone || "");
  const [balans, setBalans] = useState("0 So'm");
  const [balance, setBalance] = useState(0);
  const [openModalmoney, setOpenModalmoney] = useState(false);

  const handleCloseModalmoney = () => {
    setOpenModalmoney(false);
  };

  const handleOpenModalmoney = () => {
    setOpenModalmoney(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModalset = () => {
    setOpenModalsend(true);
  };

  const handleCloseModalset = () => {
    setOpenModalsend(false);
  };

  const handleSubscription = () => {
    if (balance <= 0) {
      toast.error("Obuna bo'lish uchun balansda mablag' yetarli emas");
    } else {
      toast.success("Obuna muvaffaqiyatli bo'ldi!");
    }
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

  const handleSave = () => {
    localStorage.setItem("name", editableName);
    localStorage.setItem("phone", editablePhone);
    setIsEditingName(false);
    setIsEditingPhone(false);
  };

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
                  <Tab label="Chat" value="2" />
                  <Tab label="Tariflar" value="3" />
                  <Tab label="Sevimlilar" value="4" />
                  <Tab label="Galeriya" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box className="flex gap-2 items-center">
                  <Box
                    className="boxShadow"
                    sx={{
                      width: "200px",
                      height: "210px",
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
                    className="w-12 flex gap-2"
                  >
                    {isEditingName ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={editableName}
                          onChange={(e) => setEditableName(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                          placeholder="Enter your name"
                        />
                        <button
                          onClick={handleSave}
                          className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 transition-colors duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditingName(false)}
                          className="bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="button_text flex items-center gap-1 text-teal-500 hover:underline"
                        onClick={() => setIsEditingName(true)}
                      >
                        Ism : <span>{editableName}</span>
                      </button>
                    )}

                    {isEditingPhone ? (
                      <div className="flex gap-2 items-center mt-2">
                        <input
                          type="text"
                          value={editablePhone}
                          onChange={(e) => setEditablePhone(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                          placeholder="Enter your phone number"
                        />
                        <button
                          onClick={handleSave}
                          className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 transition-colors duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditingPhone(false)}
                          className="bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="button_text flex items-center gap-1 text-teal-500 hover:underline mt-2"
                        onClick={() => setIsEditingPhone(true)}
                      >
                        Tel : {editablePhone}
                      </button>
                    )}

                    <button className="button_text">Balans : {balans}</button>
                    <button
                      onClick={handleOpenModalmoney}
                      className="button_text"
                    >
                      Hisobni To'ldirish
                    </button>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box className=" mt-10">
                  <Chat name={name} profileImage={selectedProfilImage} />
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box className=" flex gap-10 flex-wrap mt-10">
                  <div className="tariflar_box">
                    <span>1 Oylik</span>
                    <div className=" flex gap-3 items-center mt-1">
                      <h4>200 so'm</h4>
                      <button
                        onClick={handleOpenModalset}
                        className=" text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200  tariflar_button"
                      >
                        Obuna
                      </button>
                    </div>
                  </div>
                  <div className="tariflar_box">
                    <span>2 Oylik</span>
                    <div className=" flex gap-3 items-center mt-1">
                      <h4>300 so'm</h4>
                      <button
                        onClick={handleOpenModalset}
                        className=" text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200  tariflar_button"
                      >
                        Obuna
                      </button>
                    </div>
                  </div>
                  <div className="tariflar_box">
                    <span>3 Oylik</span>
                    <div className=" flex gap-3 items-center mt-1">
                      <h4>400 so'm</h4>
                      <button
                        onClick={handleOpenModalset}
                        className=" text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200  tariflar_button"
                      >
                        Obuna
                      </button>
                    </div>
                  </div>
                  <div className="tariflar_box">
                    <span>4 Oylik</span>
                    <div className=" flex gap-3 items-center mt-1">
                      <h4>500 so'm</h4>
                      <button
                        onClick={handleOpenModalset}
                        className=" text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200  tariflar_button"
                      >
                        Obuna
                      </button>
                    </div>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="4">Sevimlilar sahifasi</TabPanel>
              <TabPanel value="5">
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

      {/* balansni toldirish */}
      <Modal
        style={{
          marginTop: "220px",
          borderRadius: "12px",
          boxShadow:
            "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        show={openModalmoney}
        onHide={handleCloseModalmoney}
      >
        <div
          style={{
            width: "400px",
          }}
          className="p-6 bg-white rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">
              <span>Ba</span>lansni to’ldirish
            </h4>
            <button
              style={{
                marginTop: "-8px",
              }}
              onClick={handleCloseModalmoney}
              className="text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <HiMiniXMark />
            </button>
          </div>
          <input
            type="text"
            placeholder=" summani kiriting"
            className="w-full p-2 border rounded-lg shadow-sm mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
          <img src={hr} alt="" className="w-full h-1 mb-3 mt-3" />
          <div className="flex items-cente  justify-between">
            <img src={clik} alt="" className=" w-28 cursor-pointer" />
            <img src={payme} alt="" className="w-28 cursor-pointer" />
            <img src={uzum} alt="" className="w-28 cursor-pointer" />
          </div>
        </div>
      </Modal>

      {/* obuna bolsih modal */}

      <Modal
        style={{
          marginTop: "220px",
        }}
        show={openModalsend}
        onHide={handleCloseModalset}
      >
        <div
          style={{
            width: "390px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="flex justify-between items-center w-full">
            <h5 className="text-start">Obuna Bo'lishni tasdiqlang</h5>
            <button
              onClick={handleCloseModalset}
              className="text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
            >
              <HiMiniXMark
                style={{
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-4 justify-center">
            <button className="button-3d w-full" onClick={handleCloseModalset}>
              Bekor qilish
            </button>
            <button onClick={handleSubscription} className="button-3d w-full">
              Obuna Bo'lish
            </button>
          </div>
        </div>
      </Modal>

      {/* profil img modal */}

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
      <ToastContainer />
    </Box>
  );
};

export default Profil;
