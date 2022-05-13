import { useState } from "react";
export default () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  return { isLoading, setIsLoading };
};
