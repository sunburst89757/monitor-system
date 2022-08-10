import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function BehaviorDetail() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return <div>hhhh</div>;
}
