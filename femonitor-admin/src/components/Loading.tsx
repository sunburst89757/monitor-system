import { Spin } from "antd";
import { SpinSize } from "antd/lib/spin";
import { ReactNode } from "react";
type Iprops = {
  tip: String;
  loading: boolean;
  size: SpinSize;
  children: ReactNode;
};
export function Loading({ tip, loading, size, children }: Iprops) {
  return (
    <Spin
      tip={tip}
      size={size}
      delay={500}
      style={{ height: "100vh", width: "100vw" }}
      spinning={loading}
    >
      {children}
    </Spin>
  );
}
