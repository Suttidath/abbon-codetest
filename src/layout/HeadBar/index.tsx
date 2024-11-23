import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import { IUserForm, UserStore } from "@/app/[locale]/home/page";

const languages = [
  {
    lebel: "English",
    value: "en",
  },
  {
    lebel: "Thai",
    value: "th",
  },
];

interface props {
  setOpen: (value: boolean) => void;
}

const HeadBar: React.FC<props> = ({ setOpen }) => {
  const user = useSelector((state: UserStore) => state.user);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = () => {
    setOpen(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getRedirectPath = (path: string): string => {
    const segments = path.split("/");
    return segments.length > 2 ? segments.slice(2).join("/") : "";
  };

  const handleLanguageChange = (language: string) => {
    startTransition(() => {
      const currentPath = getRedirectPath(pathname);
      const newPath = `/${language}/${currentPath}`;

      router.replace(newPath);
    });
    handleCloseUserMenu();
  };

  return (
    <Toolbar disableGutters className="flex justify-end shadow-shadow-1">
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <div className="flex mr-4 gap-4">
        <div className="flex items-center gap-1 bg-slate-100 px-2 py-2 rounded-full">
          <IconButton
            sx={{ p: 0 }}
            className="border border-solid border-gray-400"
          >
            <Avatar alt="AvatarImg" src={user.image} />
          </IconButton>
          <Typography>{user.name}</Typography>
        </div>
        <div className="flex items-center">
          <Tooltip
            title="Translate"
            className="cursor-pointer"
            onClick={handleOpenUserMenu}
          >
            <GTranslateIcon sx={{ fontSize: 32 }} color="primary" />
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {languages.map((language) => (
              <MenuItem
                key={language.value}
                onClick={() => handleLanguageChange(language.value)}
                className="flex gap-2 justify-end"
              >
                {localActive === language.value && (
                  <CheckCircleOutlineIcon fontSize="small" color="success" />
                )}
                <Typography sx={{ textAlign: "center" }}>
                  {language.lebel}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </Toolbar>
  );
};

export default HeadBar;
