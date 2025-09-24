// ================================
// FILE: src/app/calories-bmr-tdee/page.tsx
// ================================
"use client";

import Script from "next/script";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Calculator } from "lucide-react";

// ======================================
// Local wrapper for <dotlottie-wc> (custom element)
// ======================================
const DotLottieWC: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    loop?: boolean;
    autoplay?: boolean;
    autoPlay?: boolean;
    style?: React.CSSProperties;
  }
> = (props) => React.createElement("dotlottie-wc", props);

// ======================================
// Types & constants
// ======================================
type Sex = "male" | "female";
type ActivityKey = "sedentary" | "light" | "moderate" | "very" | "extra";
type MacroTarget = "cut" | "maintain" | "bulk";

const ACTIVITY_LABELS: Record<ActivityKey, string> = {
  sedentary: "Sedentary (little/no exercise)",
  light: "Light (1–3 days/week)",
  moderate: "Moderate (3–5 days/week)",
  very: "Very Active (6–7 days/week)",
  extra: "Extra Active (physical job / 2x day)",
};

const ACTIVITY_MULTIPLIER: Record<ActivityKey, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

// Chart colors
const COLOR_MAP: Record<string, string> = {
  BMR: "#6366f1", // indigo
  TDEE: "#10b981", // emerald
  Cut: "#ef4444", // red
  Maintain: "#f59e0b", // amber
  Bulk: "#14b8a6", // teal
};
const COLORS = ["#4f46e5", "#f59e0b", "#10b981"]; // protein, fat, carbs

const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

// ======================================
// Helpers
// ======================================
function mifflinStJeor({
  sex,
  weightKg,
  heightCm,
  age,
}: {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
}) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

function macrosForCalories(weightKg: number, calories: number) {
  const proteinG = Math.max(0, Math.round(weightKg * 1.8));
  const fatKcal = Math.max(0, Math.round(calories * 0.25));
  const fatG = Math.max(0, Math.round(fatKcal / 9));
  const carbsKcal = Math.max(0, calories - (proteinG * 4 + fatKcal));
  const carbsG = Math.max(0, Math.round(carbsKcal / 4));
  return { proteinG, fatG, carbsG };
}

// ======================================
// Calculator Component
// ======================================
export function BmrTdeeCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState<ActivityKey>("moderate");

  const { bmr, tdee, targets } = useMemo(() => {
    if (age <= 0 || height <= 0 || weight <= 0) {
      return { bmr: 0, tdee: 0, targets: { cut: 0, maintain: 0, bulk: 0 } };
    }
    const bmrVal = Math.round(
      mifflinStJeor({ sex, weightKg: weight, heightCm: height, age })
    );
    const tdeeVal = Math.round(bmrVal * ACTIVITY_MULTIPLIER[activity]);
    const cut = Math.round(tdeeVal * 0.8);
    const bulk = Math.round(tdeeVal * 1.15);
    const maintain = tdeeVal;
    return { bmr: bmrVal, tdee: tdeeVal, targets: { cut, maintain, bulk } };
  }, [sex, age, height, weight, activity]);

  const [macroTarget, setMacroTarget] = useState<MacroTarget>("maintain");
  const macrosSelected = useMemo(() => {
    const calories =
      macroTarget === "cut"
        ? targets.cut
        : macroTarget === "bulk"
        ? targets.bulk
        : targets.maintain;
    return macrosForCalories(weight, calories);
  }, [macroTarget, targets, weight]);

  const barData = [
    { name: "BMR", kcal: bmr },
    { name: "TDEE", kcal: tdee },
    { name: "Cut", kcal: targets.cut },
    { name: "Maintain", kcal: targets.maintain },
    { name: "Bulk", kcal: targets.bulk },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Calculator className="h-7 w-7" />
        <h3 className="text-3xl font-bold">BMR &amp; TDEE Calculator</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Inputs */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="block mb-2">Sex</Label>
              <RadioGroup
                value={sex}
                onValueChange={(v) => setSex(v as Sex)}
                className="flex gap-4"
              >
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="male" id="male" />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="female" id="female" />
                  <span>Female</span>
                </label>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="age" className="block mb-2">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="height" className="block mb-2">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="weight" className="block mb-2">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div>
              <Label className="block mb-2">Activity level</Label>
              <Select value={activity} onValueChange={(v) => setActivity(v as ActivityKey)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ACTIVITY_LABELS).map(([k, label]) => (
                    <SelectItem key={k} value={k}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="rounded-xl p-5 text-white text-center"
                style={{ background: COLOR_MAP.BMR }}
              >
                <div className="text-xs uppercase opacity-90">BMR</div>
                <div className="text-2xl font-semibold">{nf0.format(bmr)}</div>
                <div className="text-xs opacity-90">kcal/day</div>
              </div>
              <div
                className="rounded-xl p-5 text-white text-center"
                style={{ background: COLOR_MAP.TDEE }}
              >
                <div className="text-xs uppercase opacity-90">TDEE</div>
                <div className="text-2xl font-semibold">{nf0.format(tdee)}</div>
                <div className="text-xs opacity-90">kcal/day</div>
              </div>
            </div>

            {/* Targets */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div
                className="rounded-xl p-4 text-white text-center"
                style={{ background: COLOR_MAP.Cut }}
              >
                <div className="text-xs uppercase opacity-90">Cut (20% less)</div>
                <div className="text-xl font-semibold">{nf0.format(targets.cut)}</div>
              </div>
              <div
                className="rounded-xl p-4 text-white text-center"
                style={{ background: COLOR_MAP.Maintain }}
              >
                <div className="text-xs uppercase opacity-90">Maintain</div>
                <div className="text-xl font-semibold">{nf0.format(targets.maintain)}</div>
              </div>
              <div
                className="rounded-xl p-4 text-white text-center"
                style={{ background: COLOR_MAP.Bulk }}
              >
                <div className="text-xs uppercase opacity-90">Bulk (15% more)</div>
                <div className="text-xl font-semibold">{nf0.format(targets.bulk)}</div>
              </div>
            </div>

            {/* Macro Split */}
            <div>
              <h4 className="font-semibold mb-2">Macro split</h4>
              <p className="mb-3 text-xs text-slate-500">
                A macro split is how you divide daily calories between protein, carbs, and fats to
                match goals like cutting, maintaining, or bulking.
              </p>

              <RadioGroup
                value={macroTarget}
                onValueChange={(v) => setMacroTarget(v as MacroTarget)}
                className="flex flex-wrap gap-3"
              >
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="cut" id="macro-cut" />
                  <span>Cut</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="maintain" id="macro-maintain" />
                  <span>Maintain</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="bulk" id="macro-bulk" />
                  <span>Bulk</span>
                </label>
              </RadioGroup>

              {/* Donut */}
              <div style={{ width: "100%", height: 220 }} className="mt-3">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Protein (g)", value: macrosSelected.proteinG },
                        { name: "Fat (g)", value: macrosSelected.fatG },
                        { name: "Carbs (g)", value: macrosSelected.carbsG },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                      cornerRadius={6}
                    >
                      <Cell fill={COLORS[0]} />
                      <Cell fill={COLORS[1]} />
                      <Cell fill={COLORS[2]} />
                    </Pie>
                    <ReTooltip formatter={(v: number) => `${nf0.format(v)} g`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: COLORS[0] }} />
                  <span>Protein: {macrosSelected.proteinG} g</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: COLORS[1] }} />
                  <span>Fat: {macrosSelected.fatG} g</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: COLORS[2] }} />
                  <span>Carbs: {macrosSelected.carbsG} g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calorie Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Calorie Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip formatter={(v: number) => `${nf0.format(v as number)} kcal`} />
                <Bar dataKey="kcal" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, idx) => (
                    <Cell key={idx} fill={COLOR_MAP[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ======================================
// Page Layout (mobile-friendly hero + Lottie)
// ======================================
export default function CaloriesBmrTdeePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Smooth scrolling + make custom element block-level for centering */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        dotlottie-wc { display: block; }
      `}</style>

      {/* Load the Lottie web component */}
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.1/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />

      {/* HERO (mobile-centered, desktop split) */}
      <section className="px-6 max-w-7xl mx-auto pt-10 pb-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text first on mobile, left on desktop */}
          <div className="order-1 md:order-1 text-center md:text-left">
            
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 break-words">
              Calories, BMR and TDEE explained
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-prose mx-auto md:mx-0">
              Calories are the fuel your body gets from food, and every day you burn this energy to stay alive and move. Your Basal Metabolic Rate (BMR) is the energy your body uses at rest, while your Total Daily Energy Expenditure (TDEE) represents your full daily burn, including movement, exercise, and digestion. This page simplifies it all with clear visuals and an interactive calculator, helping you understand exactly how your body uses energy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#calculator"
                className="rounded-2xl px-5 py-3 bg-black text-white font-semibold shadow"
              >
                Open the calculator
              </a>
              <a
                href="#cta"
                className="rounded-2xl px-5 py-3 bg-white border border-slate-200 shadow-sm font-semibold"
              >
                Talk to Luqman
              </a>
            </div>
          </div>

          {/* Lottie centered on all breakpoints, responsive size */}
          <div className="order-2 md:order-2 flex justify-center">
            <DotLottieWC
              src="https://lottie.host/289483ab-fcb5-401b-b60f-5576210f1981/0pBXSPkPJG.lottie"
              className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px]"
              autoPlay
              loop
            />
          </div>
        </div>
      </section>

      {/* QUICK GUIDE */}
      <section className="px-6 max-w-7xl mx-auto pb-10">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Every thing you need to know</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-5 bg-orange-50 border border-orange-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-1">🍔 Calories</h3>
              <p className="text-slate-700">
                A calorie is a unit of energy. Eating adds energy to your body. Moving, thinking,
                and living spend energy. If you eat more than you spend, you gain. If you eat a bit
                less than you spend, you lose.
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-sky-50 border border-sky-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-1">🧠 BMR</h3>
              <p className="text-slate-700">
                Basal Metabolic Rate is your resting burn to keep you alive. Even if you stayed in
                bed, you would still burn energy breathing, pumping blood, and repairing cells.
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-emerald-50 border border-emerald-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-1">🏃 TDEE</h3>
              <p className="text-slate-700">
                Total Daily Energy Expenditure is your BMR plus all other activity: walking,
                workouts, posture, fidgeting, and the energy used to digest food.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-md">
              <h3 className="font-semibold text-lg mb-1">How they connect</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>BMR is the base. Everyone has one.</li>
                <li>TDEE is the base plus movement and daily activity.</li>
                <li>
                  Goals: eat a little under TDEE to lose, around TDEE to maintain, or a little over
                  TDEE to gain.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="px-6 max-w-7xl mx-auto py-10">
        <BmrTdeeCalculator />
      </section>

      {/* CTA */}
      <section id="cta" className="px-6 max-w-7xl mx-auto py-10">
        <div className="rounded-3xl bg-black text-white p-8 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
            Need a custom explainer or an interactive app for your site
          </h2>
          <p className="mb-4 text-white/90">
           I design and build interactive content that not only educates but also drives conversions. Let’s bring your idea to life.
          </p>
          <a href="https://luqman.design/contact/" className="px-5 py-3 bg-white text-black rounded-2xl font-semibold">
            Book a 15 min call
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          This page is for education. It is not medical advice.
        </p>
      </section>
    </main>
  );
}
