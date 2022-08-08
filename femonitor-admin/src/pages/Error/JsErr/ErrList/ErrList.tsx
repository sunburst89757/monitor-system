import { errListType } from "../../components/types";

export default function ErrList({ errortype }: errListType) {
  return <div>this is {errortype}</div>;
}
