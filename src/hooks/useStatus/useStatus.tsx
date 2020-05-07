import { useState, FC } from 'react';

interface StatusProps {
  [key: string]: any;
  loading?: any;
  error?: any;
  empty?: any;
  success?: any;
}

/*
 * Use Status is a custom hook I created to help manage UI states
 * You can read more about useStatus here:
 * https://medium.com/p/usestatus-a-custom-react-hook-for-managing-ui-states-a5b1bc6555bf?source=email-787e23562827--writer.postDistributed&sk=6c356aaeff3242400e728380637dfe04
 */

const useStatus = (initialState: string) => {
  const [status, setStatus] = useState<string>(initialState);

  const Status: FC<StatusProps> = (props) => {
    return props[status] || null;
  };

  return { Status, setStatus };
};

export default useStatus;
