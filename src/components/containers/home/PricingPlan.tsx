import React from "react";
import Link from "next/link";

const DEFAULT_PLANS = [
  {
    id: 1,
    name: "Basic",
    price: "$0.39",
    unit: "per image",
    description: "Perfect for small businesses",
    features: [
      "Clipping Path",
      "24-hour turnaround",
      "Unlimited revisions",
      "Money-back guarantee",
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "$0.79",
    unit: "per image",
    description: "Ideal for growing businesses",
    features: [
      "Clipping Path",
      "Image Masking",
      "Shadow Creation",
      "12-hour turnaround",
      "Unlimited revisions",
      "Money-back guarantee",
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$1.29",
    unit: "per image",
    description: "For high-volume needs",
    features: [
      "All Pro features",
      "Photo Retouching",
      "Color Correction",
      "6-hour turnaround",
      "Dedicated account manager",
      "API integration",
    ],
    recommended: false,
  },
];

interface PricingPlanProps {
  data?: {
    subtitle?: string;
    title?: string;
    plans?: {
      id?: number;
      name?: string;
      price?: string;
      unit?: string;
      description?: string;
      features?: string[];
      recommended?: boolean;
    }[];
  };
  pricingImageUrls?: string[];
}

const PricingPlan = ({ pricingImageUrls, data }: PricingPlanProps) => {
  const pricingData = {
    subtitle: data?.subtitle || "Pricing Plans",
    title: data?.title || "Choose the Right Plan for You",
    plans: data?.plans && data.plans.length > 0 ? data.plans : DEFAULT_PLANS,
  };
  return (
    <section className="section pricing-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="section__header text-center">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {pricingData.subtitle}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {pricingData.title}
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <div className="pricing-section__inner">
              {pricingData.plans.map((plan, index) => {
                return (
                  <div
                    key={plan.id || index}
                    className="pricing-section__inner-item "
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                  >
                    <div className="pricing__meta">
                      <div className="content">
                        <h4 className="h4">
                          {plan.name || `Plan ${index + 1}`}
                        </h4>
                        <p>{plan.description || "No description available."}</p>
                      </div>
                    </div>
                    {(plan.features && plan.features.length > 0
                      ? plan.features
                      : ["No features listed."]
                    ).map((feature, featureIndex) => (
                      <div key={featureIndex} className="price-frame">
                        <p className="h6">
                          {feature.split(" ")[0]} {feature.split(" ")[1] || ""}
                        </p>
                        <p>{feature.split(" ").slice(2).join(" ")}</p>
                      </div>
                    ))}
                    <div className="price-plan">
                      <p className="h6">
                        <span>starting at</span> {plan.price || "$0.00"} Only
                      </p>
                      <p>{plan.unit || "per image"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="section__cta "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <Link
                href="/sign-in"
                aria-label="create account"
                className="btn btn--primary"
              >
                Get Started Now <i className="fa-solid fa-paper-plane"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pricing-images">
        {(Array.isArray(pricingImageUrls) ? pricingImageUrls : []).map(
          (url, idx) => (
            <img key={idx} src={url} alt={`Pricing ${idx + 1}`} />
          )
        )}
      </div>
    </section>
  );
};

export default PricingPlan;
