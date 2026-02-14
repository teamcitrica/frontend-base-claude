"use client";
import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Text } from "citrica-ui-toolkit";
import { siteConfig } from "@/config/site";

function Content() {
  const searchParams = useSearchParams();
  const typeApp = searchParams.get(siteConfig.subItemSearchParam);

  return (
    <div>
      <Text isAdmin={true} textColor="color-admin-primary" variant="headline">{`Config App ${typeApp}`}</Text>
    </div>
  );
}

const TitleConfigApp = () => {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
};

export default TitleConfigApp;
