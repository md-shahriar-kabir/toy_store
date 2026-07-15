"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type NumberFieldProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};

export default function NumberField({
  value = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: NumberFieldProps) {
  const [num, setNum] = useState(value);

  const handleChange = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), max);
    setNum(clamped);
    onChange?.(clamped);
  };

  const increment = () => handleChange(num + step);
  const decrement = () => handleChange(num - step);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={decrement}
        size="sm"
        variant={"outline"}
        className="px-3 py-1 rounded-lg text-xl font-bold"
      >
        -
      </Button>

      <Input
        type="number"
        value={num}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-20 text-center rounded-lg"
        min={min}
        max={max}
        step={step}
      />

      <Button
        onClick={increment}
        size="sm"
        variant={"outline"}
        className="px-3 py-1 rounded-lg text-xl font-bold"
      >
        +
      </Button>
    </div>
  );
}
