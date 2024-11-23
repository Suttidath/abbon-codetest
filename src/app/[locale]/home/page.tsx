"use client";

import {
  Alert,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ICreateContactForm } from "../contact-form/page";

export interface IUserForm {
  name: string;
  image?: string;
}

export type UserStore = {
  user: IUserForm;
  contacts: {
    contact_list: ICreateContactForm[];
  };
};

const schema = yup.object().shape({
  name: yup.string().required("ชื่อ - นามสกุลเป็นข้อมูลที่จำเป็น"),
  image: yup.string(),
});

const HomePage = () => {
  const t = useTranslations("HomePage");
  const user = useSelector((state: UserStore) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
      image: user?.image,
    },
  });

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setValue("image", e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onUpdateUser = async (data: IUserForm) => {
    dispatch({
      type: "UPDATE",
      payload: { name: data.name, image: data.image },
    });
    handleOpen();
  };

  return (
    <div className="w-full flex justify-center pb-16">
      <form
        onSubmit={handleSubmit(onUpdateUser)}
        className="max-w-[400px] flex flex-col items-center gap-4 p-4"
      >
        <Typography variant="h6">{t("title")}</Typography>

        {watch("image") ? (
          <img
            src={watch("image")}
            alt="Uploaded preview"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        ) : (
          <img src={user?.image} alt="image profile" />
        )}

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="w-full space-y-1">
              <Typography className="text-sm">{t("name")} </Typography>
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message || ""}
                fullWidth
                placeholder="ชื่อ-นามสกุล"
                size="medium"
                suppressHydrationWarning
              />
            </div>
          )}
        />
        <div className="w-full space-y-1">
          <p className="text-sm">{t("updateImage")} </p>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="w-full flex gap-4">
          <Button variant="contained" fullWidth color="primary" type="submit">
            {t("submit")}
          </Button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t("snackbar")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
