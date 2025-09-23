// =======================================
// FILE: src/app/calories-bmr-tdee/page.tsx
// Description: Educational page that explains Calories, BMR and TDEE
// with fun visuals and an embedded calculator demo. Ends with a simple CTA.
// Brand: black / white / grays with orange accent (UI outside calculator),
// calculator keeps its original vibrant colors.
// =======================================
"use client";

export default function CaloriesBmrTdeePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* =======================================
          1) HERO – Friendly intro
         ======================================= */}
      <section className="px-6 md:px-10 lg:px-12 max-w-7xl mx-auto py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm tracking-wide uppercase text-slate-500 mb-2">Learn by doing</p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Calories, BMR and TDEE explained with simple visuals
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-prose">
              This page is an easy guide. You will see what calories are, how BMR and TDEE work, and you can try a live calculator. Clear cards and charts make the ideas stick.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#calculator" className="rounded-2xl px-5 py-3 bg-black text-white font-semibold shadow">Open the calculator</a>
              <a href="#cta" className="rounded-2xl px-5 py-3 bg-white border border-slate-200 shadow-sm font-semibold">Talk to Luqman</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">🍔 Calories</p>
              <p className="text-2xl font-bold mt-1">Energy in</p>
              <p className="text-sm mt-2 text-slate-600">Food and drinks are your fuel.</p>
            </div>
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">🧠 BMR</p>
              <p className="text-2xl font-bold mt-1">Resting burn</p>
              <p className="text-sm mt-2 text-slate-600">Energy your body uses at rest.</p>
            </div>
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">🏃 TDEE</p>
              <p className="text-2xl font-bold mt-1">Daily burn</p>
              <p className="text-sm mt-2 text-slate-600">BMR plus movement and everything else.</p>
            </div>
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">⚖️ Goals</p>
              <p className="text-2xl font-bold mt-1">Up or down</p>
              <p className="text-sm mt-2 text-slate-600">Eat a little under or over your TDEE.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================
          2) QUICK GUIDE – Plain words
         ======================================= */}
      <section className="px-6 md:px-10 lg:px-12 max-w-7xl mx-auto pb-6 md:pb-10">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">The quick guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-5 bg-slate-50">
              <h3 className="font-semibold text-lg mb-1">Calories</h3>
              <p className="text-slate-600">A calorie is a unit of energy. Eat calories and you add energy. Move and live and you spend energy.</p>
            </div>
            <div className="rounded-2xl p-5 bg-slate-50">
              <h3 className="font-semibold text-lg mb-1">BMR</h3>
              <p className="text-slate-600">Basal Metabolic Rate is your energy burn at rest to keep you alive.</p>
            </div>
            <div className="rounded-2xl p-5 bg-slate-50">
              <h3 className="font-semibold text-lg mb-1">TDEE</h3>
              <p className="text-slate-600">Total Daily Energy Expenditure equals your BMR plus activity, digestion and daily movement.</p>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-5 bg-slate-50">
              <h3 className="font-semibold text-lg mb-1">Rules of thumb</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>To lose fat eat about 250 to 500 kcal below your TDEE.</li>
                <li>To gain muscle eat about 150 to 300 kcal above your TDEE and lift.</li>
                <li>Protein helps with fullness and muscle. Steps help raise TDEE.</li>
              </ul>
            </div>
            <div className="rounded-2xl p-5 bg-slate-50">
              <h3 className="font-semibold text-lg mb-1">Visual cues</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl p-3 bg-white border">🍕 <strong>Calories in</strong></div>
                <div className="rounded-xl p-3 bg-white border">🔥 <strong>BMR</strong></div>
                <div className="rounded-xl p-3 bg-white border">🏃 <strong>Activity</strong></div>
                <div className="rounded-xl p-3 bg-white border">⚖️ <strong>Adjust to goal</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================
          3) INTERACTIVE DEMO – Calculator
         ======================================= */}
      <section id="calculator" className="px-6 md:px-10 lg:px-12 max-w-7xl mx-auto py-10 md:py-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">BMR & TDEE Calculator</h2>
          <span className="text-sm text-slate-500">Educational demo</span>
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
          {/* Import this component from src/components/BmrTdeeCalculator.tsx */}
          <BmrTdeeCalculator />
        </div>
        <p className="text-sm text-slate-500 mt-3">Try different inputs and see how the numbers change. It is a quick way to understand your energy needs.</p>
      </section>

      {/* =======================================
          4) CTA – Light promo for your services
         ======================================= */}
      <section id="cta" className="px-6 md:px-10 lg:px-12 max-w-7xl mx-auto pb-20">
        <div className="rounded-3xl bg-black text-white p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2">Need a custom explainer or calculator for your site</h2>
            <p className="text-white/90">I design and build interactive content that teaches and converts. Let us talk about your idea.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-2xl px-5 py-3 bg-white text-black font-semibold">Book a 15 min call</a>
              <a href="/portfolio" className="rounded-2xl px-5 py-3 bg-orange-600 text-white font-semibold">See portfolio</a>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">This page is for education. It is not medical advice.</p>
      </section>

      {/* =======================================
          5) JSON-LD – FAQ for SEO (optional)
         ======================================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is TDEE',
                acceptedAnswer: { '@type': 'Answer', text: 'Total Daily Energy Expenditure equals your BMR plus activity and daily movement.' },
              },
              {
                '@type': 'Question',
                name: 'What is BMR',
                acceptedAnswer: { '@type': 'Answer', text: 'Basal Metabolic Rate is the energy your body burns at rest to keep you alive.' },
              },
              {
                '@type': 'Question',
                name: 'Can you build an interactive calculator for my website',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. I can design and build a custom tool and embed it on your site.' },
              },
            ],
          }),
        }}
      />
    </main>
  );
}

// =======================================
// FILE: src/components/BmrTdeeCalculator.tsx
// Put this in its own file. The first line must be the directive below.
// =======================================



// Imports
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Calculator } from "lucide-react";

// Types and constants
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
  sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extra: 1.9,
};

// Calculator original vibrant colors (as requested)
const COLOR_MAP: Record<string, string> = {
  BMR: "#6366f1",      // indigo-500
  TDEE: "#10b981",     // emerald-500
  Cut: "#ef4444",      // red-500
  Maintain: "#f59e0b", // amber-500
  Bulk: "#14b8a6",     // teal-500
};
const COLORS = ["#4f46e5", "#f59e0b", "#10b981"]; // protein, fat, carbs

const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

// Helpers
function mifflinStJeor({ sex, weightKg, heightCm, age }: { sex: Sex; weightKg: number; heightCm: number; age: number }) {
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

// Component
export function BmrTdeeCalculator() {
  // Inputs
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState<ActivityKey>("moderate");

  // Calculations
  const { bmr, tdee, targets } = useMemo(() => {
    if (age <= 0 || height <= 0 || weight <= 0) {
      return { bmr: 0, tdee: 0, targets: { cut: 0, maintain: 0, bulk: 0 } };
    }
    const bmrVal = Math.round(mifflinStJeor({ sex, weightKg: weight, heightCm: height, age }));
    const tdeeVal = Math.round(bmrVal * ACTIVITY_MULTIPLIER[activity]);
    const cut = Math.round(tdeeVal * 0.8);
    const bulk = Math.round(tdeeVal * 1.15);
    const maintain = tdeeVal;
    return { bmr: bmrVal, tdee: tdeeVal, targets: { cut, maintain, bulk } };
  }, [sex, age, height, weight, activity]);

  // Macro target selector
  const [macroTarget, setMacroTarget] = useState<MacroTarget>("maintain");

  // Macros for selected target
  const macrosSelected = useMemo(() => {
    const calories = macroTarget === "cut" ? targets.cut : macroTarget === "bulk" ? targets.bulk : targets.maintain;
    return macrosForCalories(weight, calories);
  }, [macroTarget, targets, weight]);

  // Data for bar chart
  const barData = [
    { name: "BMR", kcal: bmr },
    { name: "TDEE", kcal: tdee },
    { name: "Cut", kcal: targets.cut },
    { name: "Maintain", kcal: targets.maintain },
    { name: "Bulk", kcal: targets.bulk },
  ];

  // Render
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Header */}
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
            {/* Sex */}
            <div>
              <Label className="block text-sm md:text-base">Sex</Label>
              <RadioGroup value={sex} onValueChange={(v) => setSex(v as Sex)} className="mt-3 flex gap-4">
                <label className="flex items-center gap-3 text-base">
                  <RadioGroupItem value="male" id="male" />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-3 text-base">
                  <RadioGroupItem value="female" id="female" />
                  <span>Female</span>
                </label>
              </RadioGroup>
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age" className="block text-sm md:text-base">Age</Label>
              <Input id="age" type="number" inputMode="numeric" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mt-3 h-12 px-4 text-base" placeholder="0" min={0} />
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height" className="block text-sm md:text-base">Height (cm)</Label>
              <Input id="height" type="number" inputMode="numeric" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-3 h-12 px-4 text-base" placeholder="0" min={0} />
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight" className="block text-sm md:text-base">Weight (kg)</Label>
              <Input id="weight" type="number" inputMode="numeric" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-3 h-12 px-4 text-base" placeholder="0" min={0} />
            </div>

            {/* Activity */}
            <div>
              <Label className="block text-sm md:text-base">Activity level</Label>
              <Select value={activity} onValueChange={(v) => setActivity(v as ActivityKey)}>
                <SelectTrigger className="mt-3 h-12 px-4 text-base">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ACTIVITY_LABELS).map(([k, label]) => (
                    <SelectItem key={k} value={k} className="text-base">{label}</SelectItem>
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
            {/* BMR + TDEE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-5 text-white text-center shadow-md" style={{ background: COLOR_MAP.BMR }}>
                <div className="text-xs uppercase tracking-wide opacity-90">BMR</div>
                <div className="mt-1 text-3xl font-semibold">{nf0.format(bmr)}</div>
                <div className="text-xs opacity-90">kcal/day</div>
              </div>
              <div className="rounded-xl p-5 text-white text-center shadow-md" style={{ background: COLOR_MAP.TDEE }}>
                <div className="text-xs uppercase tracking-wide opacity-90">TDEE</div>
                <div className="mt-1 text-3xl font-semibold">{nf0.format(tdee)}</div>
                <div className="text-xs opacity-90">kcal/day</div>
              </div>
            </div>

            {/* Cut + Maintain + Bulk */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl p-4 text-white text-center shadow" style={{ background: COLOR_MAP.Cut }}>
                <div className="text-xs uppercase tracking-wide opacity-90">Cut (20% less)</div>
                <div className="mt-1 text-2xl font-semibold">{nf0.format(targets.cut)}</div>
              </div>
              <div className="rounded-xl p-4 text-white text-center shadow" style={{ background: COLOR_MAP.Maintain }}>
                <div className="text-xs uppercase tracking-wide opacity-90">Maintain</div>
                <div className="mt-1 text-2xl font-semibold">{nf0.format(targets.maintain)}</div>
              </div>
              <div className="rounded-xl p-4 text-white text-center shadow" style={{ background: COLOR_MAP.Bulk }}>
                <div className="text-xs uppercase tracking-wide opacity-90">Bulk (15% more)</div>
                <div className="mt-1 text-2xl font-semibold">{nf0.format(targets.bulk)}</div>
              </div>
            </div>

            {/* Macro Split with selector */}
            <div>
              <h4 className="mb-1 text-base md:text-lg font-semibold">Macro split</h4>
              <p className="mb-3 text-xs text-slate-500">A macro split is how you divide daily calories between protein, carbs and fats.</p>

              {/* Target selector */}
              <div className="mb-3">
                <RadioGroup value={macroTarget} onValueChange={(v) => setMacroTarget(v as MacroTarget)} className="flex flex-wrap gap-3">
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
                <p className="mt-1 text-xs text-slate-500">Using {nf0.format(macroTarget === "cut" ? targets.cut : macroTarget === "bulk" ? targets.bulk : targets.maintain)} kcal per day</p>
              </div>

              {/* Donut pie */}
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={[{ name: "Protein (g)", value: macrosSelected.proteinG }, { name: "Fat (g)", value: macrosSelected.fatG }, { name: "Carbs (g)", value: macrosSelected.carbsG }]} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={4} cornerRadius={6}>
                      <Cell fill={COLORS[0]} />
                      <Cell fill={COLORS[1]} />
                      <Cell fill={COLORS[2]} />
                    </Pie>
                    <ReTooltip formatter={(v: number) => `${nf0.format(v)} g`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-3 flex justify-center gap-6 text-sm">
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
          <CardTitle className="text-2xl md:text-3xl">Calorie Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip formatter={(v: number) => `${nf0.format(v)} kcal`} />
                <Bar dataKey="kcal" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={COLOR_MAP[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              Download PDF: BMR & TDEE Calculator
            </Button>
          </div>

          {/* Small CTA */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Want a calculator like this for your brand? <a href="/contact" className="font-semibold text-indigo-600">Get a quote</a>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
