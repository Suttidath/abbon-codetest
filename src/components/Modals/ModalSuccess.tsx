import { Button, Typography } from "@mui/material";
import Modal from "./Modal";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModalSuccess = ({ open, onClose }: Props) => {
  const t = useTranslations("ContactForm");
  const router = useRouter();
  const localActive = useLocale();

  return (
    <Modal isShow={open} setIsShow={() => onClose()}>
      <div className="flex flex-col px-2 p-4 items-center">
        <Typography variant="h5">{t("success")}</Typography>
        <img
          src="/images/success.png"
          alt="success icon"
          className="w-[150px] py-8"
        />
        <div className="flex gap-4">
          <Button
            onClick={() => router.replace(`/${localActive}/contact-list`)}
            variant="contained"
          >
            {t("back")}
          </Button>
          <Button onClick={() => onClose()} variant="outlined">
            {t("close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
