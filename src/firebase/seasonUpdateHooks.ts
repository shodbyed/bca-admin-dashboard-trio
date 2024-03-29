// ------------------------------
// TABLE OF CONTENTS
// ------------------------------
// 1. Hooks
//    - useAddOrUpdateSeason
// 2. FireBaseFunctions
//    - addOrUpdateSeasonRQ

//------------------------
// IMPORTS
//------------------------
import { useMutation } from 'react-query';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
} from '@firebase/firestore';
import { fetchSeasonRQ } from '.';
import { ConfirmContext } from '../context/ConfirmContext';
import { useContext } from 'react';
import { HookProps, mutationConfig } from './utilities';
import { toast } from 'react-toastify';
import { Season } from '../assets/typesFolder/seasonTypes';
import { SeasonName } from '../assets/typesFolder/sharedTypes';

// ------------------------------
// 1. HOOKS
// ------------------------------

export const useAddSeason = (props: HookProps = {}) => {
  const { confirmMe } = useContext(ConfirmContext);
  const mutation = useMutation(addSeasonRQ, mutationConfig(props));

  const addSeason = async (seasonName: string, seasonData: Season) => {
    const existingSeason = await checkSeasonExists(seasonName);

    let confirm = true;
    if (existingSeason) {
      confirm = await confirmMe(
        `Season already exists!  \n Are you sure you want to overwrite ${seasonName}`,
      );
    }
    if (!confirm) {
      toast.info('Action Cancelled');
      return;
    }
    if (confirm) {
      mutation.mutate({ seasonName, seasonData });
    }
  };

  return { addSeason, ...mutation };
};

export const useUpdateSeason = (props: HookProps = {}) => {
  return useMutation(updateSeasonRQ, mutationConfig(props));
};

// ------------------------------
// 2. FIREBASE FUNCTIONS
// ------------------------------

/**
 * Adds a new season document to Firestore.
 *
 * @param seasonName - The name of the season to add.
 * @param seasonData - The season data object to add.
 */
export const addSeasonRQ = async ({
  seasonName,
  seasonData,
}: {
  seasonName: SeasonName;
  seasonData: Season;
}) => {
  const seasonRef = doc(db, 'seasons', seasonName);
  await setDoc(seasonRef, { ...seasonData, seasonCompleted: false });
};

/**
 * Updates an existing season document in Firestore.
 *
 * @param seasonName - The name of the season to update.
 * @param seasonData - The partial season data to update.
 */
export const updateSeasonRQ = async ({
  seasonName,
  seasonData,
}: {
  seasonName: SeasonName;
  seasonData: Partial<Season>;
}) => {
  const seasonRef = doc(db, 'seasons', seasonName);
  await updateDoc(seasonRef, seasonData);
};

const checkSeasonExists = async (seasonName: SeasonName): Promise<boolean> => {
  try {
    const season = await fetchSeasonRQ(seasonName);
    return Boolean(season);
  } catch (error) {
    return false;
  }
};
