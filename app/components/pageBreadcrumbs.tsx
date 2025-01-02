import { useLocation } from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export default function PageBreadcrumbs() {
  const location = useLocation();
  const paths: String = location.pathname;
  const pathNames: String[] = paths.split("/").filter((path) => path);

  // const breadcrumbsItems: { name: string; to: string } = [
  //   {
  //     name: "Home",
  //     to: "/",
  //   },
  // ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {pathNames.map((path, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem key={index}>
              {path === "adventure" ? (
                path
              ) : index === pathNames.length - 1 ? (
                <BreadcrumbPage>{path} </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < pathNames.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
