"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Sparkles, Palette, Check } from "lucide-react";

export type ThemeId = "light" | "dark" | "rose" | "lavender" | "peach";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  icon: string;
  colorSwatch: string;
  accentSwatch: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    name: "Classic Light",
    tagline: "Warm & Minimalist",
    icon: "☀️",
    colorSwatch: "#faf9f6",
    accentSwatch: "#b45309",
  },
  {
    id: "dark",
    name: "Midnight Dark",
    tagline: "Sleek & Deep OLED",
    icon: "🌙",
    colorSwatch: "#0f1115",
    accentSwatch: "#fbbf24",
  },
  {
    id: "rose",
    name: "Blush Rose",
    tagline: "Romantic & Feminine",
    icon: "🌸",
    colorSwatch: "#fff0f3",
    accentSwatch: "#e11d48",
  },
  {
    id: "lavender",
    name: "Lavender Dream",
    tagline: "Soft & Poetic Lilac",
    icon: "💜",
    colorSwatch: "#f7f2fe",
    accentSwatch: "#7c3aed",
  },
  {
    id: "peach",
    name: "Peach Blossom",
    tagline: "Gentle Coral Warmth",
    icon: "🍑",
    colorSwatch: "#fff5eb",
    accentSwatch: "#ea580c",
  },
];

export function ThemeSwitcher({ inline = false }: { inline?: boolean }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("light");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or system on mount
  useEffect(() => {
    const saved = localStorage.getItem("personalm_theme") as ThemeId;
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTheme = (id: ThemeId) => {
    setCurrentTheme(id);
    localStorage.setItem("personalm_theme", id);
    document.documentElement.setAttribute("data-theme", id);
    setIsOpen(false);
  };

  const activeOption = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  // Inline mode for Navbar
  if (inline) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-normal border shadow-xs transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-main)",
            color: "var(--text-main)",
          }}
          title={`Theme: ${activeOption.name} (Click to change)`}
          aria-label="Change theme"
        >
          <span className="text-xs">{activeOption.icon}</span>
          <span className="hidden sm:inline text-[11px] font-sans font-medium" style={{ color: "var(--text-main)" }}>
            {activeOption.name}
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: activeOption.accentSwatch }}
          />
        </button>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-main)",
              color: "var(--text-main)",
            }}
          >
            <div
              className="px-2.5 py-1.5 border-b flex items-center justify-between"
              style={{ borderColor: "var(--border-light)" }}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
                Choose Color Theme
              </span>
              <Sparkles className="w-3 h-3" style={{ color: "var(--accent-main)" }} />
            </div>

            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? "var(--accent-subtle)" : "transparent",
                    color: isSelected ? "var(--accent-badge)" : "var(--text-main)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs border"
                      style={{
                        backgroundColor: theme.colorSwatch,
                        borderColor: "var(--border-main)",
                      }}
                    >
                      {theme.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium leading-tight">{theme.name}</div>
                      <div className="text-[10px] opacity-70 leading-tight">
                        {theme.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: theme.accentSwatch }}
                    />
                    {isSelected && (
                      <Check className="w-3.5 h-3.5" style={{ color: "var(--accent-main)" }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Floating Quick Theme Pill (bottom-right)
  return (
    <div className="fixed bottom-6 right-6 z-40" ref={dropdownRef}>
      {isOpen && (
        <div
          className="mb-3 w-60 rounded-2xl shadow-2xl border p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-main)",
            color: "var(--text-main)",
          }}
        >
          <div
            className="px-3 py-1.5 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border-light)" }}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
              PersonalM Themes
            </span>
            <Palette className="w-3.5 h-3.5" style={{ color: "var(--accent-main)" }} />
          </div>

          {THEME_OPTIONS.map((theme) => {
            const isSelected = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected ? "var(--accent-subtle)" : "transparent",
                  color: isSelected ? "var(--accent-badge)" : "var(--text-main)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-xs border"
                    style={{
                      backgroundColor: theme.colorSwatch,
                      borderColor: "var(--border-main)",
                    }}
                  >
                    {theme.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{theme.name}</div>
                    <div className="text-[10px] opacity-70">{theme.tagline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.accentSwatch }}
                  />
                  {isSelected && (
                    <Check className="w-4 h-4" style={{ color: "var(--accent-main)" }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-main)",
          color: "var(--text-main)",
        }}
        title="Change Website Theme"
      >
        <span className="text-base">{activeOption.icon}</span>
        <span className="text-xs font-medium font-sans hidden sm:inline" style={{ color: "var(--text-main)" }}>
          {activeOption.name}
        </span>
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/10"
          style={{ backgroundColor: activeOption.accentSwatch }}
        />
      </button>
    </div>
  );
}
