import { getData, saveData } from "@/utils/dataUtils";
import { defaultAboutData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  // GET request to retrieve about page data
  if (req.method === "GET") {
    try {
      const { section } = req.query;
      let data = await getData("about");
      if (!data || Object.keys(data).length === 0) {
        await saveData("about", defaultAboutData);
        data = { ...defaultAboutData };
      } else {
        data = deepMerge(defaultAboutData, data);
      }
      if (section) {
        if (!data[section] && defaultAboutData[section]) {
          data[section] = defaultAboutData[section];
          await saveData("about", data);
          return res.status(200).json(defaultAboutData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching about page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // PUT request to update about page data
  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("about")) || {};
      data = deepMerge(defaultAboutData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultAboutData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultAboutData, updatedData);
      }
      const success = await saveData("about", data);
      if (!success) {
        console.error("Failed to save about page data");
        return res
          .status(500)
          .json({ message: "Failed to save about page data" });
      }
      return res.status(200).json({
        message: "About page data updated successfully",
        data: section ? data[section] : data,
      });
    } catch (error) {
      console.error("Error updating about page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  // Method not allowed
  return res.status(405).json({ message: "Method not allowed" });
}
