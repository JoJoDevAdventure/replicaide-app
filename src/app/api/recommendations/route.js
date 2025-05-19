export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const bedrooms = searchParams.get("bedrooms") || "";
  const bathrooms = searchParams.get("bathrooms") || "";
  const keywords = searchParams.get("keywords") || "";

  const url = `https://property-recommendation-microservice.onrender.com/recommendation_by_keywords?is_currentlyListed=Y&city=VENTURA&state=CA&zip_code=93004&bedrooms=${bedrooms}&bathrooms=${bathrooms}&surface=896&keywords=${encodeURIComponent(keywords)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": "sk_prod_XYZ789abcdefGHI456jklmnoPQR123stuvwxyD0E4F8A2C6B9E1D3",
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch recommendations" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}