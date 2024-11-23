"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HeadBar from "./HeadBar";
import Footer from "./Footer";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const t = useTranslations("SideBar");

  const handleMenuClick = (menu: string) => {
    if (menu === "contact") {
      setOpenSubMenu((prev) => !prev);
    }
  };

  const getRedirectPath = (path: string): string => {
    const segments = path.split("/");
    return segments.length > 2 ? segments.slice(2).join("/") : "";
  };

  const currentPath = getRedirectPath(pathname);

  useEffect(() => {
    setLoading(true);
  }, []);

  const DrawerList = (
    <div className="w-[250px] border-r border-gray-200 border-solid">
      <Box sx={{ ml: 2, cursor: "pointer" }}>
        <img
          src="/images/Facebook-Logo.png"
          width="120px"
          onClick={() => router.replace(`/${localActive}/home`)}
        />
      </Box>

      <List component="nav">
        {/* Home Menu */}
        <ListItemButton
          selected={currentPath === "home"}
          onClick={() => {
            handleMenuClick("home"), router.replace(`/${localActive}/home`);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t("Home")} />
        </ListItemButton>

        {/* Contact Menu */}
        <ListItemButton onClick={() => handleMenuClick("contact")}>
          <ListItemIcon>
            <PermContactCalendarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("Contact")} />
          {openSubMenu ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItemButton>
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={currentPath === "contact-list"}
              onClick={() => {
                handleMenuClick("contact-list"),
                  router.replace(`/${localActive}/contact-list`);
              }}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={t("ContactList")} />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={currentPath === "contact-form"}
              onClick={() => {
                handleMenuClick("contact-form"),
                  router.replace(`/${localActive}/contact-form`);
              }}
            >
              <ListItemIcon>
                <FormatAlignCenterIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("ContacForm")} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Location Menu */}
        <ListItemButton
          onClick={() => {
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${13.355264688246281},${100.98696565386258}`,
              "_blank"
            );
          }}
        >
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={t("CurrentLocation")} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <div
      className="flex w-full bg-white"
      style={{
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>{DrawerList}</Box>
      <div className="w-full flex flex-col relative">
        <HeadBar setOpen={setOpen} />
        <div className="bg-white p-6">
          {!loading ? <p> Loading...</p> : children}
        </div>
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {DrawerList}
        </Drawer>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
