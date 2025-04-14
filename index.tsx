import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import { BladeProvider, Box } from "@razorpay/blade/components";
import { bladeTheme, createTheme } from "@razorpay/blade/tokens";

import App from "./App";

import '@razorpay/blade/fonts.css';


const GlobalStyles = createGlobalStyle`
* { 
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
}
`;

const rootElement = document.getElementById("root");

if (!rootElement) {
throw new Error("root is null");
}
const root = createRoot(rootElement);

const getTheme = () => {
if(false){
  return createTheme({
    brandColor: "undefined",
  });
}
return bladeTheme;
}

root.render(
<StrictMode>
  <BladeProvider themeTokens={getTheme()} colorScheme="light">
    <GlobalStyles />
    <Box 
      backgroundColor="surface.background.level1.lowContrast"
      minHeight="100vh"
      padding={['spacing.4', 'spacing.7']}
      display="flex"
      flexDirection="column"
    >
      <App />
      
    </Box>
  </BladeProvider>
</StrictMode>
);

console.clear(); // There could be some codesandbox warnings, clearing them here on init