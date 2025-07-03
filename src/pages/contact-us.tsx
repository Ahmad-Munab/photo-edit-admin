import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import ContactSec from "@/components/containers/ContactSec";
import { GetServerSideProps } from "next";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    // Fetch contact page data from API
    const contactResponse = await fetch(
      `${baseUrl}/api/content/contact`
    );
    const contactData = await contactResponse.json();

    // Fetch contact info data from API
    const contactInfoResponse = await fetch(
      `${baseUrl}/api/content/contact-info`
    );
    const contactInfo = await contactInfoResponse.json();

    // Fetch settings data
    const settingsResponse = await fetch(
      `${baseUrl}/api/content/settings`
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error in getServerSideProps:", errorMessage);

    // Return error message as a prop
    return {
      props: {
        contactData: {},
        contactInfo: {},
        settings: {},
        error: `Failed to fetch data: ${errorMessage}`,
      },
    };
  }
};

interface ContactUsProps {
  contactData?: any;
  contactInfo?: any;
  settings?: any;
  error?: string;
}

const ContactUs = ({
  contactData = {},
  contactInfo = {},
  settings = {},
  error,
}: ContactUsProps) => {
  if (error) {
    return (
      <Layout settings={settings}>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h1>An Error Occurred</h1>
          <p>Could not load page data. Please check the server configuration.</p>
          <pre style={{ color: "red", textAlign: "left", background: "#fdd", padding: "1rem", whiteSpace: "pre-wrap" }}>
            {error}
          </pre>
        </div>
      </Layout>
    );
  }
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
