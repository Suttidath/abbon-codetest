import { Breakpoint, Dialog, SxProps, Theme, Typography } from "@mui/material";

interface Props {
  children?: JSX.Element;
  title?: string;
  subTitle?: string;
  text?: string;
  hideClose?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  isShow: boolean;
  setIsShow: (res: boolean) => void;
  fullScreen?: boolean;
  maxWidth?: Breakpoint | false;
  sx?: SxProps<Theme> | undefined;
}

const Modal = ({
  title,
  subTitle,
  text,
  children,
  isShow,
  setIsShow,
  fullScreen,
  sx,
}: Props) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      id="dialog"
      maxWidth="xs"
      onClose={() => setIsShow(false)}
      open={isShow}
      scroll="body"
      sx={sx}
    >
      <div className="p-3">
        <div className="relative flex justify-end">
          <button
            onClick={() => setIsShow(false)}
            className=" flex items-center justify-center hover:opacity-60 hover:bg-gray-200 rounded-full"
          ></button>
        </div>
        {title && (
          <Typography variant="h3" className="text-center pt-2">
            {title}
          </Typography>
        )}
        {children}
        {(text || subTitle) && (
          <div className="p-4 text-center">
            <p>
              <small>{text}</small>
            </p>
            <p>{subTitle}</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};
export default Modal;
