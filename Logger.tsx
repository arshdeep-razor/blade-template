import { Box, Button, IconButton, SlashIcon } from '@razorpay/blade/components';
import React from 'react';

const overrideConsoleLog = () => {
const actualConsoleLog = console.log;
const customConsole = {
  log: function (message: any) {
    const logMessage = document.createElement('p');
    logMessage.style.fontSize = '14px';
    logMessage.textContent = '> ' + JSON.stringify(message, null, 4);

    const newConsole = document.querySelector('#log-console');
    if (!newConsole) {
      return;
    }

    newConsole.appendChild(logMessage);
    newConsole.scrollTop = newConsole.scrollHeight;
  },
};

// Override the global console.log with the custom implementation
window.console.log = (...args) => {
  customConsole.log(...args);
  actualConsoleLog(...args);
};
};

overrideConsoleLog();

export const Logger = () => {
const [showLogger, setShowLogger] = React.useState(true);
const consoleRef = React.useRef();

return (
  <>
    <Box
      position="fixed"
      bottom="spacing.0"
      left="spacing.0"
      width="100%"
      textAlign="right"
    >
      <Button
        variant="tertiary"
        size="small"
        onClick={() => {
          setShowLogger(!showLogger);
        }}
      >
        Toggle Console
      </Button>
      <Box
        position="absolute"
        bottom="spacing.0"
        right="spacing.0"
        padding="spacing.3"
        margin="spacing.4"
        elevation="midRaised"
        borderRadius="round"
        backgroundColor="surface.background.level3.lowContrast"
        borderColor="surface.border.normal.lowContrast"
        display={showLogger ? 'inline-block' : 'none'}
      >
        <IconButton
          onClick={() => {
            if (consoleRef.current) {
              consoleRef.current.innerHTML = '';
            }
          }}
          icon={SlashIcon}
          size="medium"
          accessibilityLabel="Clear Console"
        />
      </Box>
      <Box
        padding={['spacing.4', 'spacing.7']}
        overflow="auto"
        height="30vh"
        elevation="highRaised"
        backgroundColor="surface.background.level2.lowContrast"
        id="log-console"
        ref={consoleRef}
        display={showLogger ? 'block' : 'none'}
        textAlign="left"
        borderTopWidth="thin"
        borderTopColor="surface.border.normal.lowContrast"
      />
    </Box>
  </>
);
};