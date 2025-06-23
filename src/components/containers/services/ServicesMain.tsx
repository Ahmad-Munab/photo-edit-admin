import React from "react";
import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/images/placeholder.png";
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Clipping Path",
    image: PLACEHOLDER_IMAGE,
    price: "$0.39 Only",
    description:
      "Our clipping path service precisely outlines and isolates objects in your images, allowing for clean background removal and replacement.",
    link: "service-details",
    className: "on",
  },
  {
    id: 2,
    title: "Background Removal",
    image: PLACEHOLDER_IMAGE,
    price: "$0.39 Only",
    description:
      "We can remove any background from your product images, replacing it with white, transparent, or any color of your choice.",
    link: "service-details",
    className: "fi",
  },
  {
    id: 3,
    title: "Image Masking",
    image: PLACEHOLDER_IMAGE,
    price: "$0.39 Only",
    description:
      "Perfect for complex edges like hair or fur, our image masking service preserves fine details while removing backgrounds.",
    link: "service-details",
    className: "tw",
  },
];

interface ServiceItem {
  id?: number;
  title?: string;
  image?: string;
  price?: string;
  description?: string;
  link?: string;
  className?: string;
}

interface ServicesMainData {
  subtitle?: string;
  title?: string;
  description?: string;
}

interface ServicesMainProps {
  data?: ServicesMainData;
  services?: ServiceItem[];
  servicesImageUrls?: string[];
}

const ServicesMain = ({
  data,
  services = [],
  servicesImageUrls,
}: ServicesMainProps) => {
  const mainData = {
    subtitle: data?.subtitle || "our services",
    title: data?.title || "We're Good at Best Clipping Path Service",
    description:
      data?.description ||
      "We provide high-quality photo editing services tailored to your specific needs. Our team of expert editors ensures that every image is processed with precision and care.",
  };

  const serviceItems = (
    services && services.length > 0 ? services : DEFAULT_SERVICES
  ).map((service, i) => ({
    id: service.id || i,
    title: service.title || `Service ${i + 1}`,
    image: service.image || PLACEHOLDER_IMAGE,
    price: service.price || "$0.39 Only",
    description: service.description || "No description available.",
    link: service.link || "service-details",
    className: service.className || "on",
  }));

  return (
    <section className="section services-main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div
              className="section__header text-center"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <p className="h6 sub-title">{mainData.subtitle}</p>
              <h2 className="h2 title">{mainData.title}</h2>
              <p className="description">{mainData.description}</p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-3">
          {serviceItems.map((service) => (
            <div
              key={service.id}
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={100 + (service.id || 0) * 50}
            >
              <div
                id={service.link?.replace("#", "") || ""}
                className={`service-card ${service.className || "on"}`}
              >
                <div className="service-card__img">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="img-fluid"
                  />
                </div>
                <div className="service-card__content">
                  <h3 className="h4 service-card__title">{service.title}</h3>
                  <p className="service-card__description">
                    {service.description}
                  </p>
                  <div className="service-card__price">
                    <p>
                      Starting at <span>{service.price}</span>
                    </p>
                  </div>
                  <Link href={service.link} className="service-card__link">
                    Learn More <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-3">
          {(servicesImageUrls || []).map((url, idx) => (
            <div
              key={idx}
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={100 + (idx + 1) * 50}
            >
              <img src={url} alt={`Service ${idx + 1}`} className="img-fluid" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-main {
          padding: 100px 0;
        }

        .service-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          height: 100%;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .service-card__content {
          padding: 24px;
        }

        .service-card__title {
          margin-bottom: 12px;
          color: #1e293b;
        }

        .service-card__description {
          color: #64748b;
          margin-bottom: 16px;
        }

        .service-card__price {
          font-weight: 500;
          margin-bottom: 16px;
        }

        .service-card__price span {
          color: #4569e7;
          font-weight: 700;
        }

        .service-card__link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #4569e7;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .service-card__link:hover {
          gap: 12px;
        }

        .on .service-card__link {
          color: #4569e7;
        }

        .fi .service-card__link {
          color: #10b981;
        }

        .tw .service-card__link {
          color: #f59e0b;
        }

        .th .service-card__link {
          color: #ef4444;
        }

        .fo .service-card__link {
          color: #8b5cf6;
        }
      `}</style>
    </section>
  );
};

export default ServicesMain;
