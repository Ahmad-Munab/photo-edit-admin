import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import ContactSec from "@/components/containers/ContactSec";
import { GetServerSideProps } from "next";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch contact page data from API
    const contactResponse = await fetch(
      `/api/content/contact`
    );
    const contactData = await contactResponse.json();

    // Fetch contact info data from API
    const contactInfoResponse = await fetch(
      `/api/content/contact-info`
    );
    const contactInfo = await contactInfoResponse.json();

    // Fetch settings data
    const settingsResponse = await fetch(
      `/api/content/settings`
    );
    const settings = await settingsResponse.json();

    return {
      props: {
        contactData,
        contactInfo,
        settings,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return default empty data to prevent rendering errors
    return {
      props: {
        contactData: {},
        contactInfo: {},
        settings: {},
      },
    };
  }
};

interface ContactUsProps {
  contactData?: any;
  contactInfo?: any;
  settings?: any;
}

const ContactUs = ({
  contactData = {},
  contactInfo = {},
  settings = {},
}: ContactUsProps) => {
  // Extract map data from contactData
  const mapData = contactData?.map || { embedUrl: "" };

  return (
    <Layout settings={settings}>
      <CmnBanner title={contactData?.banner?.title || "Contact Us"} />
      <ContactSec contactInfo={contactInfo} mapData={mapData} />
    </Layout>
  );
};

export default ContactUs;
