import { FC, useEffect } from "react";

import { Overview } from '@components/Overview';

import { useStoreActions } from "@state/hooks";

const HomePage: FC = () => {
  const loadDevices = useStoreActions((action) => action.projects.load);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

    return <Overview />
};

export default HomePage;
