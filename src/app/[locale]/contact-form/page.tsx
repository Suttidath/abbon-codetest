"use client";

import { Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import useModalState from "@/hooks/useModalState";
import ModalSuccess from "@/components/Modals/ModalSuccess";
import { UserStore } from "../home/page";

export interface ICreateContactForm {
  id?: number;
  name: string;
  age: string;
}

const ContactFormPage = () => {
  const t = useTranslations("ContactForm");
  const contacts = useSelector(
    (state: UserStore) => state.contacts.contact_list
  );
  const dispatch = useDispatch();
  const { isOpen, close, open } = useModalState();

  const schema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required(t("validateName")),
    age: yup.string().required(t("validateAge")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: contacts.length + 1,
      name: "",
      age: "",
    },
  });

  const onCreateContact = async (data: ICreateContactForm) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: { id: data.id, name: data.name, age: data.age },
    });
    open();
    reset();
  };

  return (
    <div className="w-full flex justify-center pb-24">
      <form
        onSubmit={handleSubmit(onCreateContact)}
        className="lg:w-[75%] w-full flex flex-col items-center gap-4 p-4"
      >
        <Typography variant="h6">{t("title")}</Typography>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="w-full space-y-1">
              <p className="text-sm">{t("name")} :</p>
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                placeholder={t("name")}
                size="medium"
              />
            </div>
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <div className="w-full space-y-1">
              <p className="text-sm">{t("age")} :</p>
              <TextField
                {...field}
                error={!!errors.age}
                helperText={errors.age?.message}
                fullWidth
                placeholder={t("age")}
                size="medium"
                type="number"
              />
            </div>
          )}
        />

        <div className="w-full flex flex-col md:flex-row justify-end gap-4 mt-6">
          <Button variant="contained" color="primary" type="submit">
            {t("submit")}
          </Button>
        </div>
      </form>
      <ModalSuccess open={isOpen} onClose={close} />
    </div>
  );
};

export default ContactFormPage;
