import React from 'react';
import { CurrentUser, PastPlayer } from '../assets/types';

type PastPlayerTitleProps = {
  pastPlayer: PastPlayer;
  currentUser: CurrentUser | null;
  setChosenPastPlayer: React.Dispatch<React.SetStateAction<PastPlayer | null>>;
  setChosenCurrentUser: React.Dispatch<
    React.SetStateAction<CurrentUser | null>
  >;
};

export const PastPlayerTitle = ({
  pastPlayer,
  currentUser,
  setChosenCurrentUser,
  setChosenPastPlayer,
}: PastPlayerTitleProps) => {
  const buttonText = pastPlayer.currentUserId ? 'Get' : 'Attach';
  let tipText;
  switch (buttonText) {
    case 'Get':
      tipText = 'Get Current user for this player';
      break;
    case 'Attach':
      tipText = 'Attach this past Player to this Current User';
      break;
    default:
      tipText = '';
      break;
  }
  return (
    <>
      <div className='title'>
        PastPlayerTitle{' '}
        <button className='small-button tooltip'>
          {buttonText}
          <span className='tooltip-text'>{tipText}</span>
        </button>
      </div>
    </>
  );
};
