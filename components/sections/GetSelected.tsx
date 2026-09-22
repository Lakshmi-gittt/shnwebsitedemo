"use client";

import { Github, Users, Code2, Trophy } from "lucide-react";
import ProcessCards from "@/components/ui/ProcessCards";

const steps = [
  {
    icon: Github,
    step: "01",
    title: "Register & Attend",
    description: "Show up on Saturday at 6 PM IST — online, no travel needed. Free and open to all builders.",
    bg: "bg-[#ff3ec8]",
    rotation: "transform -rotate-1",
  },
  {
    icon: Users,
    step: "02",
    title: "Build Solo or in Pair",
    description: "Max 2 per team. Any language, framework, hardware, or API. Stack suggestions are starting points.",
    bg: "bg-[#70d6ff]",
    rotation: "transform rotate-1",
  },
  {
    icon: Code2,
    step: "03",
    title: "Ship & Push Code",
    description: "Build something real, push code to GitHub before midnight, and submit your project proof.",
    bg: "bg-[#39ff8c]",
    rotation: "transform -rotate-0.5",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Get Invited to Finale",
    description: "Top teams from the 5 online build sprints get direct invitations to the 24-hour in-person hackathon at TinkerSpace Kochi.",
    bg: "bg-[#ffd166]",
    rotation: "transform rotate-1.5",
  },
];

export default function GetSelected() {
  return (
    <section id="get-selected" className="relative">
      <ProcessCards
        steps={steps}
        badge="Your Path to the Finale"
        heading={
          <>
            Build. Ship.{" "}
            <span className="text-[#ff3ec8]">Get Invited.</span>
          </>
        }
        subtext="There is no jury during the hack night. Just build something real, push it to GitHub, and let your project speak for itself."
      />
    </section>
  );
}
