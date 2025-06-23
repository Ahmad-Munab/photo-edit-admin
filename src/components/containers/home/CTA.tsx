import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CTAData {
  title?: string;
  description?: string;
  image?: string;
}

interface CTAProps {
  ctaImageUrl?: string;
  data: CTAData;
}

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

const CTA = ({ ctaImageUrl, data }: CTAProps) => {
  // Defensive fallback for missing data or image
  const ctaData = {
    title: data?.title || "Ready to Get Started?",
    description: data?.description || "Transform your images today!",
    image: data?.image || PLACEHOLDER_IMAGE,
  };

  return (
    <section className="try-cta bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <div className="try-cta__inner">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-6">
                  <div className="try-cta__thumb ">
                    <Image
                      src={ctaImageUrl || ctaData.image}
                      alt="CTA Image"
                      width={600}
                      height={400}
                      unoptimized={ctaImageUrl?.startsWith("/images/")}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="try-cta__content section__content">
                    <h2 className="h2 title ">{ctaData.title}</h2>
                    <div className="paragraph ">
                      <p>{ctaData.description}</p>
                    </div>
                    <div className="cta__group ">
                      <Link href="/get-quote" className="btn btn--secondary">
                        Get Proposal <i className="fa-solid fa-paper-plane"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
