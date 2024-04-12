"use client";

import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { Diagram } from "@prisma/client";
import { shortener } from "base/lib/utils";
import { DiagramWithWorkspaceWithCreator } from "base/types/dbTypes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Crumb = {
  name: string;
  path: string;
};

export function DiagramBreadCrumb({
  diagram,
}: {
  diagram: DiagramWithWorkspaceWithCreator;
}) {
  const currentPath = usePathname();
  const [breadCrumbs, setBreadCrumbs] = useState<Crumb[]>([]);
  console.log();

  useEffect(() => {
    const pathNames = currentPath.split("/").filter((path) => path);
    const crumbs = pathNames.map((_, index) => ({
      path: `/${pathNames.slice(0, index + 1).join("/")}`,
      name: pathNames[index],
    }));
    setBreadCrumbs(crumbs);
  }, [currentPath]);

  if (!diagram) return <BreadcrumbFallback />;

  return (
    diagram && (
      <Breadcrumbs className="flex items-center justify-center ">
        <a href="/dashboard" className="opacity-60 flex item-senter">
          <svg
            xmlns="http://www.w3.org/4000/svg"
            className="h-10 w-10"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        <a href={`/u/${diagram.creator.id}`} className=" flex gap-2 justify-center items-center">
          <div className="relative h-[2rem] w-[2rem]">
            <Image
              src={diagram.creator.image as string}
              alt={diagram.creator.name as string}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover border-2 border-brown-100 "
            />
          </div>

          <Typography variant="small" className="font-normal opacity-80">
            {shortener(diagram.creator.name as string, 7)}
          </Typography>
        </a>

        <a href={`/workspace/${diagram.workspace.slug}`} className="flex gap-2 justify-center items-center">
          <div className="relative h-[2rem] w-[2rem]">
            <Image
              src={diagram.workspace.cover as string}
              alt={diagram.workspace.title as string}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover border-2 border-brown-100 "
            />
          </div>
          <Typography variant="small" className="font-normal opacity-80">
            {shortener(diagram.workspace.title as string, 7)}
          </Typography>
        </a>

        <a href="" className="flex gap-2 justify-center items-center">
          <div className="relative h-[2rem] w-[2rem]">
            <Image
              src={diagram.coverImage as string}
              alt={diagram.title as string}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover border-2 border-brown-100 "
            />
          </div>
          <Typography variant="small" className="font-normal opacity-80">
            {shortener(diagram.title as string, 7)}
          </Typography>
        </a>
      </Breadcrumbs>
    )
  );
}

export function BreadcrumbFallback() {
  return (
    <Breadcrumbs>
      <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/4000/svg"
          className="h-4 w-4"
          viewBox="0 0 40 40"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>

      {[1, 2, 3, 4].map((crumb, index) => (
        <span
          key={index}
          className="w-14 h-4 animate-pulse rounded-md bg-[#9d9a9aad]"
        />
      ))}
    </Breadcrumbs>
  );
}
