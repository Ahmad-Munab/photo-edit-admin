import { getData, saveData } from "@/utils/dataUtils";
import { defaultHomeData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let data = await getData("home");
      if (!data || Object.keys(data).length === 0) {
        await saveData("home", defaultHomeData);
        data = { ...defaultHomeData };
      } else {
        data = deepMerge(defaultHomeData, data);
      }
      const { section } = req.query;
      if (section) {
        if (section === "sponsors") {
          const aboutData = await getData("about");
          if (aboutData && aboutData.sponsors) {
            return res.status(200).json(aboutData.sponsors);
          }
        }
        if (section === "whySpecial") {
          if (!data[section]) {
            data[section] = defaultHomeData[section];
          } else if (!data[section].videoUrl) {
            data[section].videoUrl = defaultHomeData.whySpecial.videoUrl;
          }
          await saveData("home", data);
          return res.status(200).json(data[section]);
        }
        if (!data[section] && defaultHomeData[section]) {
          data[section] = defaultHomeData[section];
          await saveData("home", data);
          return res.status(200).json(defaultHomeData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      if (data.whySpecial && !data.whySpecial.videoUrl) {
        data.whySpecial.videoUrl = defaultHomeData.whySpecial.videoUrl;
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching home data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("home")) || {};
      data = deepMerge(defaultHomeData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultHomeData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultHomeData, updatedData);
      }
      const success = await saveData("home", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save home data" });
      }
      return res.status(200).json({
        message: "Home data updated successfully",
        data: section ? data[section] : data,
      });
    } catch (error) {
      console.error("Error updating home data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
