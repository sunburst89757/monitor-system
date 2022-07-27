import { Spin } from "antd";
import { lazy, Suspense } from "react";
// path是文件夹的路径
export function LazyLoad({ path }: { path: string }) {
  const Component = lazy(() => import(`../pages${path}`));
  return (
    <Suspense
      fallback={<Spin style={{ height: "100vh", width: "100vw" }}></Spin>}
    >
      <Component></Component>
    </Suspense>
  );
}
