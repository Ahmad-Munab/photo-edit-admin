import { getData, saveData } from "@/utils/dataUtils";
import { defaultContactData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { section } = req.query;
      let data = await getData("contact");
      if (!data || Object.keys(data).length === 0) {
        await saveData("contact", defaultContactData);
        data = { ...defaultContactData };
      } else {
        data = deepMerge(defaultContactData, data);
      }
      if (section) {
        if (!data[section] && defaultContactData[section]) {
          data[section] = defaultContactData[section];
          await saveData("contact", data);
          return res.status(200).json(defaultContactData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching contact page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("contact")) || {};
      data = deepMerge(defaultContactData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultContactData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultContactData, updatedData);
      }
      const success = await saveData("contact", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save contact page data" });
      }
      return res.status(200).json({
        message: "Contact page data updated successfully",
        data: section ? data[section] : data,
      });
    } catch (error) {
      console.error("Error updating contact page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
