import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.37/deno-dom-wasm.ts";
import { HandlerContext } from "$fresh/server.ts";

interface Bin {
  color: string;
  name: string;
  icon?: string;
}
interface CollectionDate {
  date: string;
  bins: Bin[];
}

const organicWaste: Bin = {
  color: "Brown",
  name: "Food and garden waste",
  icon:
    "https://webforms.rochdale.gov.uk/images/bin%20icons/Brown%20bin%20icon.png",
};
const generalWaste: Bin = {
  color: "Dark green",
  name: "General Waste",
  icon:
    "https://webforms.rochdale.gov.uk/images/bin%20icons/Green%20bin%20icon.png",
};
const paperRecycling: Bin = {
  color: "Blue",
  name: "Paper and cardboard",
  icon:
    "https://webforms.rochdale.gov.uk/images/bin%20icons/Blue%20bin%20icon.png",
};
const mixedRecycling: Bin = {
  color: "Light green with blue lid",
  name: "Mixed recycling",
  icon:
    "https://webforms.rochdale.gov.uk/images/bin%20icons/Green%20blue%20bin%20icon.png",
};

async function fetchPage(
  postcode: string,
  uprn: string,
): Promise<CollectionDate[]> {
  const formData = new FormData();
  formData.append("Step", "2");
  formData.append("Postcode", "---");
  formData.append("SelectedUprn", uprn);

  const req = await fetch("https://webforms.rochdale.gov.uk/BinCalendar", {
    method: "POST",
    body: formData,
  });
  const html = await req.text();
  const document = new DOMParser().parseFromString(html, "text/html")!;
  if (!document) {
    throw new Error("Could not parse HTML");
  }

  const collections: CollectionDate[] = [];
  const rows = document.querySelectorAll(
    "#tblCollectionDetails tbody tr",
  ) as unknown as Element[];
  for (const row of rows) {
    const date = row.querySelector("th")!.textContent.trim();
    const dateParsed = Date.parse(date + " GMT");
    const binIcons = row.querySelectorAll("td img") as unknown as Element[];
    const bins: Bin[] = [];

    for (const binIcon of binIcons) {
      const icon = binIcon.getAttribute("src") as unknown as string;
      bins.push(binFromIcon(icon));
    }
    collections.push(
      {
        date: new Date(dateParsed).toJSON(),
        bins: bins,
      },
    );
  }

  return collections;
}

function binFromIcon(icon: string): Bin {
  if (icon.endsWith("Brown bin icon.png")) {
    return organicWaste;
  }
  if (icon.endsWith("Green bin icon.png")) {
    return generalWaste;
  }
  if (icon.endsWith("Blue bin icon.png")) {
    return paperRecycling;
  }
  if (icon.endsWith("Green blue bin icon.png")) {
    return mixedRecycling;
  }
  throw new Error(`Unknown bin icon '${icon}'`);
}
export const handler = async (req: Request, ctx: HandlerContext) => {
  const url = new URL(req.url);
  const postCode = url.searchParams.get("postcode") || "";
  const uprn = url.searchParams.get("uprn") || "";

  const collection = await fetchPage(postCode, uprn);

  const body = JSON.stringify(collection);
  return new Response(body);
};
