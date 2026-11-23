import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { PriceRange } from "../types";

interface PriceFilterProps {
  priceRange: PriceRange;
  setPriceRange: (priceRange: PriceRange) => void;
}

interface PriceErrors {
  min?: string;
  max?: string;
}

function validate(form: PriceRange): PriceErrors {

  const errors: PriceErrors = {};

  const min = form.min.trim();
  const max = form.max.trim();

  if (min !== "") {
    if (Number.isNaN(Number(min))) {
      errors.min = "Min price must be a number";
    } else if (Number(min) < 0) {
      errors.min = "Min price can't be negative";
    }
  }

  if (max !== "") {
    if (Number.isNaN(Number(max))) {
      errors.max = "Max price must be a number";
    } else if (Number(max) < 0) {
      errors.max = "Max price can't be negative";
    }
  }

  if (!errors.min && !errors.max && min !== "" && max !== "") {
    if (Number(min) > Number(max)) {
      errors.min = "Min can't be more than max";
    }
  }

  return errors;
}

function PriceFilter({ priceRange, setPriceRange }: PriceFilterProps) {

  const [form, setForm] = useState({
    min: priceRange.min,
    max: priceRange.max
  });

  const [errors, setErrors] = useState<PriceErrors>({});

  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);

    if (hasErrors) {
      setErrors(validate(newForm));
    }
  };

  const handleBlur = () => {
    setErrors(validate(form));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setPriceRange({ min: form.min.trim(), max: form.max.trim() });
    setErrors({});
  };

  const handleClear = () => {
    setForm({ min: "", max: "" });
    setErrors({});
    setPriceRange({ min: "", max: "" });
  };

  const inputClass = (name: "min" | "max") =>
    "p-3 border rounded-md w-40 bg-white " +
    (errors[name] ? "border-red-500" : "border-gray-300");

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-start gap-4 my-5"
    >

      <div>
        <input
          type="text"
          name="min"
          placeholder="Min price"
          value={form.min}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass("min")}
        />
        {errors.min && (
          <p className="text-sm text-red-500 mt-1">{errors.min}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="max"
          placeholder="Max price"
          value={form.max}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass("max")}
        />
        {errors.max && (
          <p className="text-sm text-red-500 mt-1">{errors.max}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={hasErrors}
        className="px-5 py-3 bg-[#1b2b4b] text-white rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Apply
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="px-5 py-3 bg-white border border-gray-300 rounded-md cursor-pointer"
      >
        Clear
      </button>

    </form>
  );
}

export default PriceFilter;