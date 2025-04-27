"use client";

import { RedocStandalone, type ResolvedThemeInterface } from "redoc";
import type { AdvancedThemeObject } from "redoc/typings/theme";

const theme = { colors: { primary: { main: "#000000" } } } satisfies AdvancedThemeObject<ResolvedThemeInterface>;

const Home = () => (
  <RedocStandalone
    specUrl={`${process.env.NEXT_PUBLIC_API_URL}/docs/swagger.json`}
    options={{
      theme,
      hideLoading: true,
      disableSearch: true,
      nativeScrollbars: true,
    }}
  />
);

export default Home;
