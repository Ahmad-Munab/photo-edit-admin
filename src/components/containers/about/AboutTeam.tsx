import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { getData, saveData } from "@/utils/dataUtils";
import { defaultAboutData } from "@/utils/defaultData";
import { uploadToCloudinary } from "@/utils/cloudinaryUtils";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;  // Cloudinary URL
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface TeamData {
  subtitle: string;
  title: string;
  description: string;
  members: TeamMember[];
  cloudinary_folder: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

interface AboutTeamProps {
  data?: TeamData;
}

const PLACEHOLDER_IMAGE = "/images/placeholder.png";
const DEFAULT_MEMBERS = [
  {
    id: 1,
    name: "Achim Thiemer mann",
    position: "Social Media Marketing",
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Lead Designer",
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Senior Editor",
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    position: "Project Manager",
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 5,
    name: "David Kim",
    position: "Customer Support",
    image: PLACEHOLDER_IMAGE,
  },
];

const AboutTeam = ({ data }: AboutTeamProps) => {
  const [teamData, setTeamData] = React.useState<TeamData>({
    subtitle: "expert team",
    title: "Meet the awesome team",
    description: "Our team of skilled professionals is dedicated to delivering exceptional results for every project.",
    members: [],
    cloudinary_folder: "team-images"
  });

  // Helper function to safely access team data properties
  const getTeamProperty = (obj: any, prop: string, defaultValue: any) => {
    return obj && typeof obj === 'object' ? obj[prop] || defaultValue : defaultValue;
  };

  // Handle default data with proper typing
  const defaultTeamData: TeamData = {
    ...defaultAboutData.team,
    cloudinary_folder: "team-images"
  };

  // Function to upload team member image to Cloudinary
  const uploadTeamImage = async (file: File, member: TeamMember) => {
    try {
      // Convert File to Buffer
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const data = reader.result;
          if (data instanceof ArrayBuffer) {
            resolve(Buffer.from(data));
          } else {
            reject(new Error('Failed to convert file to buffer'));
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });

      // Upload to Cloudinary with folder option
      const result = await uploadToCloudinary(buffer, {
        folder: teamData.cloudinary_folder,
        public_id: `team-${member.id}-${Date.now()}`
      });

      return (result as CloudinaryUploadResult).secure_url;
    } catch (error) {
      console.error(`Error uploading image for ${member.name}:`, error);
      return "/images/placeholder.png";
    }
  };

  // Function to update team member image
  const updateTeamMemberImage = async (memberId: number, file: File) => {
    try {
      const member = teamData.members.find(m => m.id === memberId);
      if (!member) return;

      const newImageUrl = await uploadTeamImage(file, member);
      
      const updatedData = {
        ...teamData,
        members: teamData.members.map(m => 
          m.id === memberId ? { ...m, image: newImageUrl } : m
        )
      };

      // Save to database
      await getData("team");
      await saveData("team", updatedData);
      setTeamData(updatedData);
    } catch (error) {
      console.error("Error updating team member image:", error);
    }
  };

  React.useEffect(() => {
    const loadTeamData = async (): Promise<void> => {
      try {
        const teamConfig = await getData("team");
        if (teamConfig && typeof teamConfig === 'object') {
          const typedData: TeamData = {
            subtitle: getTeamProperty(teamConfig, "subtitle", "expert team"),
            title: getTeamProperty(teamConfig, "title", "Meet the awesome team"),
            description: getTeamProperty(teamConfig, "description", "Our team of skilled professionals is dedicated to delivering exceptional results for every project."),
            members: getTeamProperty(teamConfig, "members", []).map((member: any): TeamMember => ({
              id: member.id || 0,
              name: member.name || "Team Member",
              position: member.position || "Position",
              image: member.image || "/images/placeholder.png",
              socialLinks: member.socialLinks || {}
            })),
            cloudinary_folder: getTeamProperty(teamConfig, "cloudinary_folder", "team-images")
          };
          setTeamData(typedData);
        } else {
          setTeamData(defaultTeamData);
        }
      } catch (error) {
        console.error("Error loading team data:", error);
        setTeamData(defaultTeamData);
      }
    };
    loadTeamData();
  }, []);

  return (
    <section className="section team-two pb-0">
      <div className="container">
        <div className="row align-items-center section__header--alt">
          <div className="col-12 col-lg-7">
            <div className="section__header">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {teamData.subtitle}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {teamData.title}
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div
              className="paragraph "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <p>{teamData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="team-two__slider-wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          speed={1200}
          loop={true}
          roundLengths={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1440: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 2,
            },
          }}
          className="team-two__slider"
        >
          {teamData.members.map((member, index) => (
            <SwiperSlide key={member.id || index}>
              <div className="team-two__slider-item">
                <Image
                  src={member.image || PLACEHOLDER_IMAGE}
                  alt={member.name || "Team Member"}
                  width={300}
                  height={300}
                />
                <div className="content">
                  <h4 className="h4">
                    <Link href="teams">{member.name || "Team Member"}</Link>
                  </h4>
                  <p>{member.position || "Team Member"}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div className="team-images-container">
          {teamData.members.map((member, idx) => (
            <div key={member.id || idx} className="team-member-image">
              <Image
                src={member.image || "/images/placeholder.png"}
                alt={member.name || `Team member ${idx + 1}`}
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
