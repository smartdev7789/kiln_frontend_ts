import { useContext, useEffect, useState } from 'react';
import { DispatchContext } from '../App';
import { ActionType } from '../state/types';

export const useLoaderOverlay = (isLoading: boolean) => {
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    dispatch({
      type: ActionType.SetLoading,
      payload: {
        isLoading,
      },
    }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // return {
  //   showLoaderOverlay: () => setIsShowLoaderOverlay(true),
  //   hideLoaderOverlay: () => setIsShowLoaderOverlay(false),
  // };
};
