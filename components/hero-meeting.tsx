"use client";

import { HeroMeeting as Day1HeroMeeting } from "@/components/hero-meeting-day1-backup";
import { HeroMeeting as Day2HeroMeeting } from "@/components/hero-meeting-day2-backup";
import { HeroMeeting as Day3HeroMeeting } from "@/components/hero-meeting-day3";

type HeroMeetingProps = {
  waterColor?: string;
};

const HERO_ROTATION_KEY = "yazh-pure-life-home-hero-day";
const HERO_COUNT = 3;

let selectedHeroIndex: number | null = null;

function getSelectedHeroIndex() {
  if (selectedHeroIndex !== null) {
    return selectedHeroIndex;
  }

  if (typeof window === "undefined") {
    selectedHeroIndex = 0;
    return selectedHeroIndex;
  }

  const storedValue = window.localStorage.getItem(HERO_ROTATION_KEY);
  const parsedValue = storedValue ? Number.parseInt(storedValue, 10) : 0;
  const currentIndex =
    Number.isInteger(parsedValue) && parsedValue >= 0
      ? parsedValue % HERO_COUNT
      : 0;

  window.localStorage.setItem(
    HERO_ROTATION_KEY,
    String((currentIndex + 1) % HERO_COUNT)
  );

  selectedHeroIndex = currentIndex;
  return selectedHeroIndex;
}

export function HeroMeeting(props: HeroMeetingProps) {
  const heroIndex = getSelectedHeroIndex();

  if (heroIndex === 0) {
    return <Day1HeroMeeting {...props} />;
  }

  if (heroIndex === 1) {
    return <Day2HeroMeeting {...props} />;
  }

  return <Day3HeroMeeting {...props} />;
}
