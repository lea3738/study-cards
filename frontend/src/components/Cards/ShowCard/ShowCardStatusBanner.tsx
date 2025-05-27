'use client';

import { CardStatus } from "shared-types";

type CardDeckDismissButtonProps = {
  status: CardStatus;
};

function ShowCardStatusBanner({ status }: CardDeckDismissButtonProps) {

  if(status === CardStatus.DISMISSED)
  return (
      <div className="rounded bg-green-300 w-full h-12 flex items-center justify-center mt-2">
        <p>🤓 You know it !</p>
      </div>  
  );

}

export default ShowCardStatusBanner;
