import { useEffect } from "react";

const useHttpEffect = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json"
      );
      const responseData = await response.json();
      console.log(responseData);
    };
    fetchData();
  }, []);

  //   return {
  //     isLoading: isLoading,
  //     error: error,
  //     sendRequest: sendRequest,
  //   };
};

export default useHttpEffect;
