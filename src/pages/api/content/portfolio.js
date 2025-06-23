import { getData, saveData } from "@/utils/dataUtils";
import { defaultPortfolioData, deepMerge } from "@/utils/defaultData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let data = await getData("portfolio");
      if (!data || Object.keys(data).length === 0) {
        await saveData("portfolio", defaultPortfolioData);
        data = { ...defaultPortfolioData };
      } else {
        data = deepMerge(defaultPortfolioData, data);
      }
      const { section } = req.query;
      if (section) {
        if (!data[section] && defaultPortfolioData[section]) {
          data[section] = defaultPortfolioData[section];
          await saveData("portfolio", data);
          return res.status(200).json(defaultPortfolioData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("portfolio")) || {};
      data = deepMerge(defaultPortfolioData, data);
      if (section) {
        data = {
          ...data,
          [section]: deepMerge(defaultPortfolioData[section] || {}, updatedData),
        };
      } else {
        data = deepMerge(defaultPortfolioData, updatedData);
      }
      const success = await saveData("portfolio", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save portfolio data" });
      }
      return res.status(200).json({ message: "Portfolio data updated successfully", data: section ? data[section] : data });
    } catch (error) {
      console.error("Error updating portfolio data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
