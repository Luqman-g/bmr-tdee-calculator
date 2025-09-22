"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

type Sex = "male" | "female";

type ActivityKey =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

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

const COLORS = ["#4f46e5", "#f59e0b", "#10b981"];

const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

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
  const proteinG = Math.round(weightKg * 1.8);
  const fatKcal = calories * 0.25;
  const fatG = Math.round(fatKcal / 9);
  const carbsKcal = Math.max(0, calories - (proteinG * 4 + fatKcal));
  const carbsG = Math.round(carbsKcal / 4);
  return { proteinG, fatG, carbsG };
}

export default function BmrTdeeCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(176);
  const [weight, setWeight] = useState(80);
  const [activity, setActivity] = useState<ActivityKey>("moderate");

  const { bmr, tdee, targets, macros } = useMemo(() => {
    const bmrVal = Math.round(
      mifflinStJeor({ sex, weightKg: weight, heightCm: height, age })
    );
    const tdeeVal = Math.round(bmrVal * ACTIVITY_MULTIPLIER[activity]);
    const cut = Math.round(tdeeVal * 0.8);
    const bulk = Math.round(tdeeVal * 1.15);
    const maintain = tdeeVal;
    return {
      bmr: bmrVal,
      tdee: tdeeVal,
      targets: { cut, maintain, bulk },
      macros: macrosForCalories(weight, maintain),
    };
  }, [sex, age, height, weight, activity]);

  const barData = [
    { name: "BMR", kcal: bmr },
    { name: "TDEE", kcal: tdee },
    { name: "Cut", kcal: targets.cut },
    { name: "Maintain", kcal: targets.maintain },
    { name: "Bulk", kcal: targets.bulk },
  ];

  const pieData = [
    { name: "Protein (g)", value: macros.proteinG },
    { name: "Fat (g)", value: macros.fatG },
    { name: "Carbs (g)", value: macros.carbsG },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6" />
        <h1 className="text-2xl font-bold">BMR & TDEE Calculator</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Sex</Label>
              <RadioGroup
                value={sex}
                onValueChange={(v) => setSex(v as Sex)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Activity level</Label>
              <Select
                value={activity}
                onValueChange={(v) => setActivity(v as ActivityKey)}
              >
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
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs">BMR</div>
                <div className="text-xl font-bold">{nf0.format(bmr)}</div>
                <div className="text-xs">kcal/day</div>
              </div>
              <div>
                <div className="text-xs">TDEE</div>
                <div className="text-xl font-bold">{nf0.format(tdee)}</div>
                <div className="text-xs">kcal/day</div>
              </div>
              <div>
                <div className="text-xs">Maintain</div>
                <div className="text-xl font-bold">
                  {nf0.format(targets.maintain)}
                </div>
                <div className="text-xs">kcal/day</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs">Cut (−20%)</div>
                <div className="text-xl font-bold">
                  {nf0.format(targets.cut)}
                </div>
              </div>
              <div>
                <div className="text-xs">Bulk (+15%)</div>
                <div className="text-xl font-bold">
                  {nf0.format(targets.bulk)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">
                Macro split (Maintain)
              </h4>
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip formatter={(v) => `${v} g`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calorie Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip formatter={(v: number) => `${nf0.format(v)} kcal`} />
                <Bar dataKey="kcal" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
