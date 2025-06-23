// Default data for the about page
export const defaultAboutData = {
  banner: {
    title: "Something About Us",
    image: "/images/about/banner-default.png", // Use a default image
    breadcrumbs: [
      { text: "Home", link: "/" },
      { text: "About Us", link: "/about-us" },
    ],
  },
  overview: {
    images: [
      "/images/about/overview-1.png",
      "/images/about/overview-2.png",
    ],
    title: "Our good work goes beyond perfect edits",
    description:
      "We're a team of passionate photo editors dedicated to delivering high-quality image editing services. Our expertise spans across various industries, helping businesses showcase their products in the best light possible.",
    mission:
      "Outsourced image editing that's good for your business — and good for the world. We believe outsourcing has the power to change the world for the better. Both for our customers and in the communities where our teams work and live.",
  },
  main: {
    subtitle: "about us",
    title: "Edit your photo in seconds with photodit",
    description:
      "Image editing services for ecommerce businesses and pros, from product photographers to Amazon sellers to global brands.",
    additionalText:
      "Because a quick product shoot can easily turn into a week or more of editing and formatting your images. Let us look after the edits, so you can get back to the work that needs you.",
    priceTag: "Starting at 25¢ / per image",
    image: "/images/about/thumb.png",
    buttons: [
      { text: "Know More", link: "about-us", type: "primary" },
      { text: "Contact Us", link: "contact-us", type: "secondary" },
    ],
  },
  sponsors: {
    title: "Serving the world's top brands",
    logos: [
      "/images/sponsor/one.png",
      "/images/sponsor/two.png",
      "/images/sponsor/three.png",
      "/images/sponsor/four.png",
      "/images/sponsor/five.png",
      "/images/sponsor/six.png",
    ],
  },
  team: {
    cloudinary_folder: "team-images", // Cloudinary folder for team images
    subtitle: "expert team",
    title: "Meet the awesome team",
    description: "Our team of skilled professionals is dedicated to delivering exceptional results for every project.",
    members: [
      { 
        id: 1, 
        name: "Achim Thiemer mann", 
        position: "Social Media Marketing", 
        image: "/images/team/one.png",
        socialLinks: {}
      },
      { 
        id: 2, 
        name: "Sarah Johnson", 
        position: "Lead Designer", 
        image: "/images/team/two.png",
        socialLinks: {}
      },
      { 
        id: 3, 
        name: "Michael Chen", 
        position: "Senior Editor", 
        image: "/images/team/three.png",
        socialLinks: {}
      },
      { 
        id: 4, 
        name: "Emily Rodriguez", 
        position: "Project Manager", 
        image: "/images/team/four.png",
        socialLinks: {}
      },
      { 
        id: 5, 
        name: "David Kim", 
        position: "Customer Support", 
        image: "/images/team/five.png",
        socialLinks: {}
      }
    ],
  },
  faq: {
    subtitle: "FAQ",
    title: "Frequently Asked Questions",
    image: "/images/faq/thumb.png",
    questions: [
      { id: 1, question: "What is clipping path service?", answer: "Clipping path is a photo editing technique that involves creating a closed vector path or shape to remove the background from an image. It's commonly used in product photography, e-commerce, and catalog production to isolate objects from their backgrounds." },
      { id: 2, question: "How long does it take to complete an order?", answer: "Our standard turnaround time is 24-48 hours, depending on the complexity and volume of images. We also offer rush services for urgent projects that can be completed in as little as 6 hours." },
      { id: 3, question: "What file formats do you accept?", answer: "We accept most common image formats including JPEG, PNG, TIFF, PSD, and RAW files. For best results, we recommend providing high-resolution images in their original format." },
      { id: 4, question: "How do I place an order?", answer: "You can place an order by filling out our quote form or contacting us directly via email. Once we understand your requirements, we'll provide a quote and timeline for completion." },
      { id: 5, question: "Do you offer bulk discounts?", answer: "Yes, we offer volume-based discounts for bulk orders. The more images you need edited, the lower the per-image price will be. Contact us for a custom quote." },
    ],
  },
  cta: {
    title: "Ready to transform your images?",
    description: "Get started with our professional photo editing services today.",
  },
};

// Default data for the home page
export const defaultHomeData = {
  banner: {
    subtitle: "Welcome to Photodit",
    title: "Professional Photo Editing Service",
    images: {
      main: "/images/banner/thumb.png",
      after: "/images/banner/after.png",
      smallImages: [
        "/images/banner/one.png",
        "/images/banner/two.png",
        "/images/banner/three.png",
        "/images/banner/four.png",
      ],
    },
  },
  services: {
    subtitle: "Our Services",
    title: "What We Offer",
    services: [
      {
        id: 1,
        title: "Clipping Path",
        description: "Remove backgrounds from images",
        icon: "icon-clipping",
        link: "/services/clipping-path",
      },
      {
        id: 2,
        title: "Image Masking",
        description: "Perfect for complex edges and hair",
        icon: "icon-masking",
        link: "/services/image-masking",
      },
      {
        id: 3,
        title: "Photo Retouching",
        description: "Enhance and perfect your images",
        icon: "icon-retouching",
        link: "/services/photo-retouching",
      },
    ],
  },
  about: {
    subtitle: "About Us",
    title: "Professional Photo Editing Service",
    description:
      "We provide high-quality photo editing services for businesses and individuals.",
    additionalText:
      "Our team of experienced editors can handle any photo editing task.",
    priceTag: "Starting at $0.39 per image",
    buttons: [
      {
        text: "Get Started",
        link: "get-quote",
        type: "primary",
      },
      {
        text: "Learn More",
        link: "about",
        type: "secondary",
      },
    ],
    image: "/images/about/thumb.png",
  },
  whySpecial: {
    subtitle: "why choose us",
    title: "why we are special",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    features: [
      {
        id: 1,
        title: "Automatic & Quick Results",
        description: "Clipping Path Could be a process by which photo editor",
        icon: "/images/choose/icon-one.png",
      },
      {
        id: 2,
        title: "Increase Resolution",
        description: "Clipping Path Could be a process by which photo editor",
        icon: "/images/choose/icon-two.png",
      },
      {
        id: 3,
        title: "Retain Details",
        description: "Clipping Path Could be a process by which photo editor",
        icon: "/images/choose/icon-three.png",
      },
    ],
  },
  trickyBackgrounds: {
    subtitle: "Stunning Quality",
    title: "We've removed these tricky backgrounds",
    categories: [
      {
        id: 1,
        name: "people",
        icon: "icon-user",
        beforeAfterImages: [
          {
            before: "/images/after/one-before.png",
            after: "/images/after/one-after.png",
          },
        ],
      },
      {
        id: 2,
        name: "products",
        icon: "icon-hexagon",
        beforeAfterImages: [
          {
            before: "/images/after/two-before.png",
            after: "/images/after/two-after.png",
          },
        ],
      },
      {
        id: 3,
        name: "animals",
        icon: "icon-animal",
        beforeAfterImages: [
          {
            before: "/images/after/three-before.png",
            after: "/images/after/three-after.png",
          },
        ],
      },
      {
        id: 4,
        name: "cars",
        icon: "icon-car",
        beforeAfterImages: [
          {
            before: "/images/after/four-before.png",
            after: "/images/after/four-after.png",
          },
        ],
      },
      {
        id: 5,
        name: "graphics",
        icon: "icon-image",
        beforeAfterImages: [
          {
            before: "/images/after/one-before.png",
            after: "/images/after/one-after.png",
          },
        ],
      },
    ],
    decorativeImages: {
      one: "/images/quality/thumb-one.png",
      two: "/images/quality/thumb-two.png",
    },
  },
  testimonials: {
    subtitle: "Testimonials",
    title: "What Our Clients Say",
    items: [
      {
        id: 1,
        name: "John Doe",
        position: "Photographer",
        image: "/images/testimonial/one.png",
        rating: 5,
        text: "Photodit has been a game-changer for my photography business. Their clipping path service is top-notch!",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "E-commerce Manager",
        image: "/images/testimonial/two.png",
        rating: 5,
        text: "We've been using Photodit for all our product photos. The quality and turnaround time are excellent.",
      },
      {
        id: 3,
        name: "Mike Johnson",
        position: "Marketing Director",
        image: "/images/testimonial/three.png",
        rating: 4,
        text: "Photodit has helped us maintain consistent image quality across all our marketing materials.",
      },
    ],
  },
  pricing: {
    subtitle: "Pricing Plans",
    title: "Choose the Right Plan for You",
    plans: [
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
    ],
  },
  news: {
    subtitle: "Latest News",
    title: "Stay Updated with Photodit",
  },
  cta: {
    subtitle: "Ready to Get Started?",
    title: "Transform Your Images Today",
    description:
      "Join thousands of satisfied customers who trust Photodit for their photo editing needs.",
    image: "/images/cta/thumb.png",
  },
  sponsors: {
    title: "Trusted by Leading Brands",
    logos: [
      "/images/sponsor/one.png",
      "/images/sponsor/two.png",
      "/images/sponsor/three.png",
      "/images/sponsor/four.png",
      "/images/sponsor/five.png",
    ],
  },
};

// Default data for the contact page
export const defaultContactData = {
  banner: {
    title: "Contact Us",
    image: "/images/placeholder.png",
  },
  main: {
    title: "Have something in mind? Let's talk.",
    description:
      "We're here to answer any questions you may have about our services. Reach out to us and we'll respond as soon as we can.",
    image: "/images/arrow.png",
    subject: ["Account", "Service", "Pricing", "Support"],
  },
  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20342.411046372905!2d-74.16638039276373!3d40.719832743885284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1649562691355!5m2!1sen!2sbd",
  },
};

// Default pricing data
export const defaultPricingData = {
  banner: {
    title: "Pricing Plan",
    image: "/images/placeholder.png",
  },
  main: {
    subtitle: "pricing plan",
    title: "Choose the perfect plan for your needs",
    description:
      "We offer competitive pricing for our high-quality image editing services.",
    plans: [
      {
        id: 1,
        name: "Basic",
        price: "$0.39",
        unit: "per image",
        description: "Perfect for small businesses and individuals",
        features: [
          "Basic Clipping Path",
          "Background Removal",
          "24/7 Support",
          "Quick Delivery",
          "100% Quality Guarantee",
        ],
        recommended: false,
      },
      {
        id: 2,
        name: "Standard",
        price: "$0.69",
        unit: "per image",
        description: "Ideal for growing businesses with regular needs",
        features: [
          "Advanced Clipping Path",
          "Background Removal",
          "Shadow Creation",
          "Color Correction",
          "24/7 Priority Support",
          "Express Delivery",
          "100% Quality Guarantee",
        ],
        recommended: true,
      },
      {
        id: 3,
        name: "Premium",
        price: "$0.99",
        unit: "per image",
        description: "Best for professional photographers and large businesses",
        features: [
          "Complex Clipping Path",
          "Advanced Background Removal",
          "Natural Shadow Creation",
          "Advanced Color Correction",
          "Image Retouching",
          "24/7 VIP Support",
          "Rush Delivery",
          "100% Quality Guarantee",
        ],
        recommended: false,
      },
    ],
  },
  project: {
    subtitle: "our projects",
    title: "Check out our latest work",
    description:
      "See the quality of our image editing services through our recent projects.",
    items: [
      {
        id: 1,
        title: "Product Photography",
        category: "E-commerce",
        image: "/images/project/one.jpg",
        link: "/portfolio",
      },
      {
        id: 2,
        title: "Fashion Photography",
        category: "Retouching",
        image: "/images/project/two.jpg",
        link: "/portfolio",
      },
      {
        id: 3,
        title: "Jewelry Photography",
        category: "Background Removal",
        image: "/images/project/three.jpg",
        link: "/portfolio",
      },
    ],
  },
  faq: {
    subtitle: "FAQ",
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our pricing and services.",
    items: [
      {
        id: 1,
        question: "How does your pricing work?",
        answer:
          "Our pricing is based on a per-image model. You can choose from our Basic, Standard, or Premium plans depending on your needs. We also offer volume discounts for larger orders.",
      },
      {
        id: 2,
        question: "Do you offer discounts for bulk orders?",
        answer:
          "Yes, we offer volume discounts for bulk orders. The more images you need edited, the lower the per-image price will be. Contact us for a custom quote.",
      },
      {
        id: 3,
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers. Payment is typically required before we begin work on your project.",
      },
      {
        id: 4,
        question: "Is there a minimum order requirement?",
        answer:
          "No, there is no minimum order requirement. You can order as few as one image or as many as you need.",
      },
      {
        id: 5,
        question: "Do you offer a money-back guarantee?",
        answer:
          "Yes, we offer a 100% satisfaction guarantee. If you are not satisfied with our work, we will revise it until you are happy or provide a full refund.",
      },
    ],
  },
};

// Default data for the services page
export const defaultServicesData = {
  banner: {
    title: "Our Services",
    image: "/images/placeholder.png",
    breadcrumbs: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Services",
        link: "/services",
      },
    ],
  },
  main: {
    subtitle: "our services",
    title: "We're Good at Best Clipping Path Service",
    description:
      "We provide high-quality photo editing services tailored to your specific needs. Our team of expert editors ensures that every image is processed with precision and care.",
  },
  services: [
    {
      id: 1,
      title: "Clipping Path",
      image: "/images/services/slide-one.png",
      price: "$0.39 Only",
      description:
        "Our clipping path service precisely outlines and isolates objects in your images, allowing for clean background removal and replacement.",
      link: "service-details",
      className: "on",
    },
    {
      id: 2,
      title: "Background Removal",
      image: "/images/services/slide-two.png",
      price: "$0.39 Only",
      description:
        "We can remove any background from your product images, replacing it with white, transparent, or any color of your choice.",
      link: "service-details",
      className: "fi",
    },
    {
      id: 3,
      title: "Image Masking",
      image: "/images/services/slide-three.png",
      price: "$0.39 Only",
      description:
        "Perfect for complex edges like hair or fur, our image masking service preserves fine details while removing backgrounds.",
      link: "service-details",
      className: "tw",
    },
    {
      id: 4,
      title: "Shadow Creation",
      image: "/images/services/slide-four.png",
      price: "$0.39 Only",
      description:
        "We can add natural-looking shadows to your product images, creating depth and realism for a professional appearance.",
      link: "service-details",
      className: "th",
    },
    {
      id: 5,
      title: "Ghost Mannequin",
      image: "/images/services/slide-five.png",
      price: "$0.39 Only",
      description:
        "Our ghost mannequin service creates a 3D hollow effect for clothing items, showing both exterior and interior details.",
      link: "service-details",
      className: "fo",
    },
  ],
  features: {
    subtitle: "our features",
    title: "Why Choose Our Services",
    items: [
      {
        id: 1,
        icon: "icon-clipping",
        title: "Precision Editing",
        description:
          "Our team of expert editors ensures pixel-perfect precision for every image.",
      },
      {
        id: 2,
        icon: "icon-masking",
        title: "Quick Turnaround",
        description:
          "We deliver high-quality edits within 24 hours for standard orders.",
      },
      {
        id: 3,
        icon: "icon-retouching",
        title: "Affordable Pricing",
        description:
          "Competitive rates starting at just $0.39 per image with volume discounts.",
      },
      {
        id: 4,
        icon: "icon-shadow",
        title: "Dedicated Support",
        description:
          "Our customer service team is available 24/7 to assist with any questions.",
      },
    ],
  },
  pricing: {
    subtitle: "pricing plans",
    title: "Choose the Right Plan for You",
    plans: [
      {
        id: 1,
        name: "Basic",
        price: "$0.39",
        unit: "per image",
        description: "Perfect for simple product images",
        features: [
          "Basic Clipping Path",
          "Simple Background Removal",
          "24-hour turnaround",
          "Email support",
          "100% quality guarantee",
        ],
        recommended: false,
      },
      {
        id: 2,
        name: "Standard",
        price: "$0.69",
        unit: "per image",
        description: "Ideal for most e-commerce products",
        features: [
          "Complex Clipping Path",
          "Background Removal",
          "Shadow Creation",
          "Basic Retouching",
          "12-hour turnaround",
          "Priority support",
          "100% quality guarantee",
        ],
        recommended: true,
      },
      {
        id: 3,
        name: "Premium",
        price: "$0.99",
        unit: "per image",
        description: "For complex images requiring detailed work",
        features: [
          "Advanced Clipping Path",
          "Image Masking",
          "Ghost Mannequin Effect",
          "Color Correction",
          "Advanced Retouching",
          "6-hour turnaround",
          "Dedicated account manager",
          "100% quality guarantee",
        ],
        recommended: false,
      },
    ],
  },
  testimonials: {
    subtitle: "testimonials",
    title: "What Our Clients Say",
    items: [
      {
        id: 1,
        name: "Kathryn Murphy",
        position: "CEO, Founder",
        image: "/images/testimonial/one.png",
        rating: 5,
        text: "Photodit is a fantastic service for anyone looking to enhance their product photography. The team is professional, responsive, and delivers high-quality results consistently.",
      },
      {
        id: 2,
        name: "Leslie Alexander",
        position: "Marketing Director",
        image: "/images/testimonial/two.png",
        rating: 5,
        text: "I've been using Photodit for all my e-commerce product images, and the results have been outstanding. Their attention to detail and quick turnaround time have helped me improve my online store significantly.",
      },
      {
        id: 3,
        name: "Jenny Wilson",
        position: "Product Manager",
        image: "/images/testimonial/three.png",
        rating: 5,
        text: "The team at Photodit has been instrumental in helping us maintain a consistent look across all our product images. Their clipping path service is precise and their customer service is excellent.",
      },
    ],
  },
  sponsors: {
    title: "Trusted by Leading Brands",
    logos: [
      "/images/sponsor/one.png",
      "/images/sponsor/two.png",
      "/images/sponsor/three.png",
      "/images/sponsor/four.png",
      "/images/sponsor/five.png",
    ],
  },
};

// Default portfolio data
export const defaultPortfolioData = {
  banner: {
    title: "Portfolio",
    image: "/images/placeholder.png",
    breadcrumbs: [
      { text: "Home", link: "/" },
      { text: "Portfolio", link: "/portfolio" },
    ],
  },
  video: {
    embedId: "fSv6UgCkuTU",
    backgroundImage: "/images/video-modal-bg.png",
  },
  categories: [
    { id: 1, name: "All", filter: "*" },
    { id: 2, name: "Photo Retouch", filter: ".retouch" },
    { id: 3, name: "Background Remove", filter: ".background" },
    { id: 4, name: "Clipping Path", filter: ".path" },
    { id: 5, name: "Color Correction", filter: ".color" },
    { id: 6, name: "Drop Shadow", filter: ".drop" },
    { id: 7, name: "E-commerce Image", filter: ".ecommerce" },
  ],
  items: [
    {
      id: 1,
      category: "retouch",
      beforeImage: "/images/after/one-before.png",
      afterImage: "/images/after/one-after.png",
      title: "Photo Retouch Example",
      description: "Professional photo retouching service",
    },
    {
      id: 2,
      category: "background",
      beforeImage: "/images/after/two-before.png",
      afterImage: "/images/after/two-after.png",
      title: "Background Removal Example",
      description: "Clean background removal service",
    },
    {
      id: 3,
      category: "path",
      beforeImage: "/images/after/three-before.png",
      afterImage: "/images/after/three-after.png",
      title: "Clipping Path Example",
      description: "Precise clipping path service",
    },
    {
      id: 4,
      category: "color",
      beforeImage: "/images/after/four-before.png",
      afterImage: "/images/after/four-after.png",
      title: "Color Correction Example",
      description: "Professional color correction service",
    },
    {
      id: 5,
      category: "drop",
      beforeImage: "/images/after/one-before.png",
      afterImage: "/images/after/one-after.png",
      title: "Drop Shadow Example",
      description: "Natural drop shadow service",
    },
    {
      id: 6,
      category: "ecommerce",
      beforeImage: "/images/after/one-before.png",
      afterImage: "/images/after/one-after.png",
      title: "E-commerce Image Example",
      description: "E-commerce ready image editing",
    },
  ],
  sponsors: {
    title: "Trusted by Leading Brands",
    logos: [
      "/images/sponsor/one.png",
      "/images/sponsor/two.png",
      "/images/sponsor/three.png",
      "/images/sponsor/four.png",
      "/images/sponsor/five.png",
    ],
  },
};

// Deep merge utility: merges source into target, filling missing fields from target
export function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;
  const result = Array.isArray(target) ? [...target] : { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        result[key] = source[key].length > 0 ? source[key] : target[key] || [];
      } else {
        result[key] = source[key] !== undefined ? source[key] : target[key];
      }
    }
  }
  for (const key in target) {
    if (target.hasOwnProperty(key) && result[key] === undefined) {
      result[key] = target[key];
    }
  }
  return result;
}

// Add more default data exports for other content types (home, news, etc.) as needed 