"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { SignupFormDemo } from "./form";

export function WavyBackgroundDemo() {
  return (
    (<WavyBackground className="max-w-4xl mx-auto">
      <SignupFormDemo/>
    </WavyBackground>)
  );
}
