// Pricing.js
"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import { twMerge } from "tailwind-merge";

const pricingTiers = [
  {
    title: "Basic Website",
    monthlyPrice: 0,
    description: "Ideal for small businesses or personal projects.",
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Single-page design",
      "Essential features",
      "Responsive layout",
    ],
  },
  {
    title: "Custom Website",
    monthlyPrice: 5000,
    description: "Full-featured websites with custom design.",
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Custom design",
      "Interactive elements",
      "Tailored user experience",
      "Scalable solutions",
    ],
  },
  {
    title: "Enterprise",
    monthlyPrice: 15000,
    description: "Complete digital transformation for your business.",
    buttonText: "Contact us",
    popular: false,
    inverse: false,
    features: [
      "End-to-end transformation",
      "Software integrations",
      "Advanced security",
      "Dedicated support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-des mt-5">
            Transparent pricing to suit your business needs. Upgrade as you scale.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(({ title, monthlyPrice, buttonText, popular, features, inverse }) => (
            <div
              key={title}
              className={twMerge(
                "p-10 rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full",
                inverse && "border-black bg-black text-white"
              )}
            >
              <div className="flex justify-between">
                <h3 className={twMerge("text-lg font-bold text-black/50", inverse && "text-white/60")}>
                  {title}
                </h3>
                {popular && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text font-medium">
                      Popular
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-6">
                <span className="text-4xl font-bold tracking-tighter leading-none">
                  {monthlyPrice === 0 ? "Free" : `$${monthlyPrice}`}
                </span>
                {monthlyPrice !== 0 && (
                  <span className="tracking-tight font-bold text-black/50">
                    {monthlyPrice !== 0 && "/package"}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm">{monthlyPrice !== 0 ? pricingTiers[1].description : ""}</p>
              <button
                className={twMerge("btn btn-primary w-full mt-6", inverse && "bg-white text-black")}
              >
                {buttonText}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {features.map((feature) => (
                  <li key={feature} className="text-sm flex items-center gap-4">
                    <span className="h-6 w-6 inline-block bg-green-500 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
