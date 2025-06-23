import { getData, saveData } from "@/utils/dataUtils";
import { defaultServicesData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let data = await getData("services");
      if (!data || Object.keys(data).length === 0) {
        await saveData("services", defaultServicesData);
        data = { ...defaultServicesData };
      } else {
        data = deepMerge(defaultServicesData, data);
      }
      const { section } = req.query;
      if (section) {
        if (!data[section] && defaultServicesData[section]) {
          data[section] = defaultServicesData[section];
          await saveData("services", data);
          return res.status(200).json(defaultServicesData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching services data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("services")) || {};
      data = deepMerge(defaultServicesData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultServicesData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultServicesData, updatedData);
      }
      const success = await saveData("services", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save services data" });
      }
      return res.status(200).json({
        message: "Services data updated successfully",
        data: section ? data[section] : data,
      });
    } catch (error) {
      console.error("Error updating services data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
