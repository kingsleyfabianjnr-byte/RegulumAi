import axios from "axios";
import * as cheerio from "cheerio";

export interface FdaGuidanceDocument {
  title: string;
  date: string;
  url: string;
  type: string;
}

const FDA_GUIDANCE_URL =
  "https://www.fda.gov/regulatory-information/search-fda-guidance-documents";

export async function fdaScraper(): Promise<FdaGuidanceDocument[]> {
  try {
    const response = await axios.get(FDA_GUIDANCE_URL, {
      headers: {
        "User-Agent":
          "RegulumAI Compliance Bot/1.0 (+https://www.fda.gov/regulatory-information/search-fda-guidance-documents)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);
    const results: FdaGuidanceDocument[] = [];

    // The FDA page exposes a guidance search table. We parse generic table rows
    // so that minor layout changes are less likely to break the scraper.
    $("table tbody tr").each((_i, row) => {
      const cells = $(row).find("td");
      if (cells.length === 0) return;

      const summaryCell = $(cells[0]);
      const documentCell = cells.length > 1 ? $(cells[1]) : summaryCell;
      const issueDateCell = cells.length > 2 ? $(cells[2]) : summaryCell;
      const typeCell =
        cells.length > 6 ? $(cells[6]) : cells.length > 7 ? $(cells[7]) : summaryCell;

      const title =
        summaryCell.text().trim() ||
        documentCell.text().trim() ||
        documentCell.find("a").text().trim();

      const relativeUrl = documentCell.find("a").attr("href") || "";
      const url = relativeUrl.startsWith("http")
        ? relativeUrl
        : relativeUrl
        ? `https://www.fda.gov${relativeUrl}`
        : FDA_GUIDANCE_URL;

      const date = issueDateCell.text().trim();
      const type = typeCell.text().trim();

      if (!title) return;

      results.push({
        title,
        date,
        url,
        type,
      });
    });

    return results;
  } catch (error) {
    console.error("Error scraping FDA guidance documents:", error);
    throw new Error("Failed to scrape FDA guidance documents");
  }
}

