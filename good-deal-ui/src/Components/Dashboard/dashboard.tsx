import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from 'next-themes'; // Import useTheme hook

export default function Dashboard() {
  const { theme, setTheme } = useTheme(); // Get current theme and setTheme function

  const toggleTheme = () => {
    // Toggle between light and dark themes
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      {/* Button to toggle theme */}
      <Button onClick={toggleTheme}>
        {/* Show Moon icon for dark mode and Sun icon for light mode */}
        {theme === 'dark' ? <Sun /> : <Moon />}
        Toggle Theme
      </Button>

      {/* Your dashboard content goes here */}
    </div>
  );
}
