'use client';

export default function RadioButton({ label, value, handleChange, checked }) {
  return (
    <label className="inline-flex items-center">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={handleChange}
          className="form-radio text-blue-600"
        />
        <span className="ml-2">{label}</span>
    </label>
  );
}