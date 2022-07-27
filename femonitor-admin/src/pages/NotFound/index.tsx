import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "not found";
  });
  return <>这是404页面</>;
}
