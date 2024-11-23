import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="w-full flex flex-col md:text-sm text-xs md:text-center absolute bottom-0 left-0 py-4 px-4 shadow-shadow-3 bg-white">
      <p>
        <b>{t("address")} :</b> 281/135 คอนโดลุมพินีชลบุรี ต.บ้านสวน อ.เมือง
        จ.ชลบุรี 20000
      </p>
      <div className="w-full flex md:flex-row flex-col md:gap-4 md:justify-center">
        <p>
          <b>{t("tel")} :</b>
          <a
            className="cursor-pointer hover:text-blue-600 hover:underline"
            href="tel:0914788764"
          >
            0914788764
          </a>
        </p>
        <p>
          <b>{t("email")} :</b>
          <a
            className="cursor-pointer hover:text-blue-600 hover:underline"
            href="mailto:suttidafonsut@gmail.com"
          >
            suttidafonsut@gmail.com
          </a>
        </p>
        <p>
          <b>{t("line")} :</b>
          <a
            className="cursor-pointer hover:text-blue-600 hover:underline"
            href="https://line.me/ti/p/HSe2fY62fH"
            target="_blank"
          >
            fonsut
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
