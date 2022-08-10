import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function BehaviorDetail() {
  const location = useLocation();
  const locationRef = useRef(location);
  console.log(locationRef.current.state);

  return <div>hhhh</div>;
}
