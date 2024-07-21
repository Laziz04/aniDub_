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
import clik from "./clik.png";
import payme from "./payme.png";
import uzum from "./uzum.png";
import hr from "./hr.png";
import Chat from "../admen_page/chat";
import gal from "./gal.png";
import lov from "./lov.png";
import tar from "./tar.png";
import chat from "../admen_page/mes.png";
import progil from "./progil.png";

const Profil: React.FC = () => {
  // profil img animatsiya

  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`,
      boxShadow: `0px 20px 30px rgba(0, 0, 0, 0.3)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    });
  };

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
        src:
          "https://e0.pxfuel.com/wallpapers/891/860/desktop-wallpaper-animal-black-hair-butterfly-flowers-forest-fox-japanese-clothes.jpg",
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
          "https://e0.pxfuel.com/wallpapers/578/527/desktop-wallpaper-blue-sky-and-clouds.jpg",
      },
      {
        id: 5,
        src:
          "https://wp-top.ru/wp-content/uploads/2023/10/wp-top.ru-9823560-.ru-anime_pejzazh-anime-pejzazhnaya_zhivopis-art-peyzash-3840x2160-1-870x400.jpg",
      },

      {
        id: 6,
        src:
          "https://i.pinimg.com/originals/16/9e/e4/169ee4b37b2544ebd87d23b695bf0a66.jpg",
      },

      {
        id: 7,
        src:
          "https://e1.pxfuel.com/desktop-wallpaper/222/208/desktop-wallpaper-old-anime-s-full-anime.jpg",
      },

      {
        id: 8,
        src: "https://images2.alphacoders.com/999/999786.jpg",
      },

      {
        id: 9,
        src:
          "https://i.pinimg.com/originals/15/81/22/158122c9dade3b025c2845396a1eb411.jpg",
      },
      {
        id: 10,
        src:
          "https://i.pinimg.com/originals/8f/97/8b/8f978bcdf5316b646d96f8c85d9147c3.jpg",
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
  localStorage.setItem("balance", balans);

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
      toast.success("Tabriklaymiz siz  1 oylik tarif sotib oldinggiz");
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
    <Box className=" pe-5 ps-5 pt-2">
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
                className="profil_logo shadow-lg rounded-full cursor-pointer transition-transform duration-300"
                style={{ ...style, width: "80px", height: "80px" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
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
                  <Tab
                    label={
                      <div className=" flex gap-1 items-center">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transform: isEditingName
                              ? "scale(1.1)"
                              : "scale(1)",
                          }}
                          src={progil}
                          alt=""
                        />
                        Profil
                      </div>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <div className=" flex gap-1 items-center">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transform: isEditingName
                              ? "scale(1.1)"
                              : "scale(1)",
                          }}
                          src={chat}
                          alt=""
                        />
                        Chat
                      </div>
                    }
                    value="2"
                  />
                  <Tab
                    label={
                      <div className=" flex gap-1 items-center">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transform: isEditingName
                              ? "scale(1.1)"
                              : "scale(1)",
                          }}
                          src={tar}
                          alt=""
                        />
                        Tariflar
                      </div>
                    }
                    value="3"
                  />
                  <Tab
                    label={
                      <div className=" flex gap-1 items-center">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transform: isEditingName
                              ? "scale(1.1)"
                              : "scale(1)",
                          }}
                          src={lov}
                          alt=""
                        />
                        Sevimlilar
                      </div>
                    }
                    value="4"
                  />
                  <Tab
                    label={
                      <div className=" flex gap-1 items-center">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transform: isEditingName
                              ? "scale(1.1)"
                              : "scale(1)",
                          }}
                          src={gal}
                          alt=""
                        />
                        Galeriya
                      </div>
                    }
                    value="5"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box
                  sx={{
                    marginTop: "10px",
                  }}
                  className="flex gap-2 items-center"
                >
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
        show={openModalsend}
        onHide={handleCloseModalset}
        className="fixed inset-0 flex items-center justify-center z-50"
        backdropClassName="custom-backdrop"
        dialogClassName="custom-dialog"
        style={{
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: "380px",
          }}
          className=" max-w-lg bg-white rounded-2xl p-6 shadow-xl animate-modal-entry"
        >
          <div className="flex justify-between items-center w-full border-b pb-3 mb-4">
            <h5 className="text-xl font-semibold text-gray-800">
              Obuna Bo'lishni tasdiqlang
            </h5>
            <button
              onClick={handleCloseModalset}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <HiMiniXMark className="text-2xl cursor-pointer" />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={handleCloseModalset}
                className="w-full bg-gradient-to-r from-blue-500 to-white text-white py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-200 transition duration-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSubscription}
                className="w-full bg-gradient-to-r from-blue-500 to-white text-white py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-200 transition duration-300"
              >
                Obuna Bo'lish
              </button>
            </div>
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
