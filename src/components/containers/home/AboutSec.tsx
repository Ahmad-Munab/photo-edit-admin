import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AboutSecProps {
  data: {
    subtitle?: string;
    title?: string;
    description?: string;
    additionalText?: string;
    priceTag?: string;
    image?: string;
    buttons?: { text: string; link: string; type: string }[];
  };
  aboutImageUrl?: string;
}

const PLACEHOLDER_IMAGE = "/images/placeholder.png";
const DEFAULT_BUTTONS = [
  {
    text: "Know More",
    link: "/about-us",
    type: "primary",
  },
  {
    text: "Contact Us",
    link: "/contact-us",
    type: "secondary",
  },
];

const AboutSec = ({ aboutImageUrl, data }: AboutSecProps) => {
  const aboutData = {
    subtitle: data?.subtitle || "about us",
    title: data?.title || "Edit your photo in seconds with photodit",
    description:
      data?.description ||
      "Image editing services for ecommerce businesses and pros, from product photographers to Amazon sellers to global brands.",
    additionalText:
      data?.additionalText ||
      "Because a quick product shoot can easily turn into a week or more of editing and formatting your images. Let us look after the edits, so you can get back to the work that needs you.",
    priceTag: data?.priceTag || "Starting at 25¢ / per image",
    image: data?.image || PLACEHOLDER_IMAGE,
    buttons:
      data?.buttons && data.buttons.length > 0 ? data.buttons : DEFAULT_BUTTONS,
  };
  return (
    <section className="section bg-white about-section">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-5 col-xl-6">
            <div
              className="about-section__thumb "
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <Image
                src={aboutImageUrl || aboutData.image || PLACEHOLDER_IMAGE}
                alt="About Image"
                width={600}
                height={600}
              />
              <div className="about-section__thumb-content">
                <p className="h5">{aboutData.priceTag}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-6">
            <div className="about-section__content section__content">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {aboutData.subtitle}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {aboutData.title}
              </h2>
              <div
                className="paragraph "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <p className="fw-5 ">{aboutData.description}</p>
                <p>{aboutData.additionalText}</p>
              </div>
              <div
                className="cta__group justify-content-start "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {aboutData.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.link || "/about-us"}
                    className={`btn btn--${button.type || "primary"}`}
                  >
                    {button.text || "Learn More"}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;
