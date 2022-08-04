import { errListType } from "../types";

export default function ErrList({ errortype }: errListType) {
  return <div>this is {errortype}</div>;
}
