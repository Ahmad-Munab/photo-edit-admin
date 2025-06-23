import { getData, saveData } from "@/utils/dataUtils";
import { defaultPricingData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let data = await getData("pricing");
      if (!data || Object.keys(data).length === 0) {
        await saveData("pricing", defaultPricingData);
        data = { ...defaultPricingData };
      } else {
        data = deepMerge(defaultPricingData, data);
      }
      const { section } = req.query;
      if (section) {
        if (!data[section] && defaultPricingData[section]) {
          data[section] = defaultPricingData[section];
          await saveData("pricing", data);
          return res.status(200).json(defaultPricingData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("pricing")) || {};
      data = deepMerge(defaultPricingData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultPricingData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultPricingData, updatedData);
      }
      const success = await saveData("pricing", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save pricing data" });
      }
      return res.status(200).json({
        message: "Pricing data updated successfully",
        data: section ? data[section] : data,
      });
    } catch (error) {
      console.error("Error updating pricing data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
