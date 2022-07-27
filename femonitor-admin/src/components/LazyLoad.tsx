import { lazy, Suspense } from "react";
// path是文件夹的路径
export function LazyLoad({ path }: { path: string }) {
  const Component = lazy(() => import(`../pages/${path}`));
  return (
    <Suspense fallback={<>加载中……</>}>
      <Component></Component>
    </Suspense>
  );
}
