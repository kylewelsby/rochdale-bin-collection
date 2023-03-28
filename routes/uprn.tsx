import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.37/deno-dom-wasm.ts";
import { HandlerContext } from "$fresh/server.ts";

async function fetchPage(postcode: string) {
  const formData = new FormData();
  formData.append("Step", "1");
  formData.append("Postcode", postcode);

  const req = await fetch("https://webforms.rochdale.gov.uk/BinCalendar", {
    method: "POST",
    body: formData,
  });

  const html = await req.text();
  const document = new DOMParser().parseFromString(html, "text/html")!;
  if (!document) {
    throw new Error("Could not parse HTML");
  }
  const options = document.querySelectorAll(
    "#SelectedUprn option",
  ) as unknown as Element[];

  const uprns = [];
  for (const option of options) {
    const uprn = Number(option.getAttribute("value"));
    if (Number.isNaN(uprn)) continue;
    uprns.push({
      uprn: option.getAttribute("value"),
      address: option.textContent.trim().replace(/\s{2,}/g, " "),
    });
  }
  return uprns;
}

export const handler = async (req: Request, ctx: HandlerContext) => {
  const url = new URL(req.url);
  const postCode = url.searchParams.get("postcode") || "";
  const uprn = url.searchParams.get("uprn") || "";

  const uprns = await fetchPage(postCode);

  const body = JSON.stringify(uprns);
  return new Response(body);
};
