"use client";
import Image from "next/image";
import soccerfield from "@/public/soccerfield.svg";
import IconButton from "@mui/material/IconButton";


type Props = {
  className?: string;
  onClick?: () => void;
};

const GamesIcon = (props: Props) => {
  return (
    <>
      

        <IconButton
          size="large"
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            padding: 0,
          }}
          className={`${props.className}  w-12 h-12 md:w-8 md:h-10 group  transition-all  `}
          onClick={props.onClick}
        >
          <div className="">
            <Image
              src={soccerfield}
              alt="toggle"
              width={30}
              height={24}
              className="h-10 w-auto transition  "
            />
          </div>
        </IconButton>

    </>
  );
};

export default GamesIcon;
