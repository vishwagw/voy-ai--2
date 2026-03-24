const QUICK_SYSTEM = `You are VoyAI, an expert global travel planner. Return ONLY valid JSON — no markdown, no prose, no backticks.

{
  "destination":"City, Country","country":"Country","duration":"X days / Y nights","travelers":2,"nights":6,"best_time":"Month","currency":"USD",
  "center_lat":35.68,"center_lng":139.65,"overview":"2-3 evocative sentences.",
  "flights":[
    {"from":"City","from_code":"XXX","from_city":"City","to":"City","to_code":"YYY","to_city":"City","airline":"Name","departure":"09:00","arrival":"14:30","duration":"14h 30m","price_per_person":800,"class":"Economy"},
    {"from":"City","from_code":"YYY","from_city":"City","to":"City","to_code":"XXX","to_city":"City","airline":"Name","departure":"11:00","arrival":"16:00","duration":"14h 0m","price_per_person":820,"class":"Economy"}
  ],
  "hotels":[
    {"name":"Budget Hotel","stars":3,"location":"Area","price_per_night":60,"total_cost":360,"highlights":"Desc.","lat":35.67,"lng":139.65},
    {"name":"Hotel 2","stars":3,"location":"Area","price_per_night":85,"total_cost":510,"highlights":"Desc.","lat":35.72,"lng":139.68},
    {"name":"Hotel 3","stars":4,"location":"Area","price_per_night":120,"total_cost":720,"highlights":"Desc.","lat":35.68,"lng":139.66},
    {"name":"Hotel 4","stars":4,"location":"Area","price_per_night":160,"total_cost":960,"highlights":"Desc.","lat":35.69,"lng":139.64},
    {"name":"Hotel 5","stars":4,"location":"Area","price_per_night":190,"total_cost":1140,"highlights":"Desc.","lat":35.65,"lng":139.72},
    {"name":"Hotel 6","stars":4,"location":"Area","price_per_night":210,"total_cost":1260,"highlights":"Desc.","lat":35.64,"lng":139.66},
    {"name":"Hotel 7","stars":5,"location":"Area","price_per_night":260,"total_cost":1560,"highlights":"Desc.","lat":35.66,"lng":139.67},
    {"name":"Hotel 8","stars":5,"location":"Area","price_per_night":350,"total_cost":2100,"highlights":"Desc.","lat":35.71,"lng":139.63},
    {"name":"Hotel 9","stars":5,"location":"Area","price_per_night":450,"total_cost":2700,"highlights":"Desc.","lat":35.70,"lng":139.70},
    {"name":"Ultra-Luxury Hotel","stars":5,"location":"Area","price_per_night":500,"total_cost":3000,"highlights":"Desc.","lat":35.67,"lng":139.74}
  ],
  "attractions":[
    {"name":"Name","description":"Why visit.","duration":"2-3 hrs","cost":15,"category":"Temple","lat":35.71,"lng":139.80},
    {"name":"Name","description":"Why.","duration":"1-2 hrs","cost":0,"category":"Market","lat":35.70,"lng":139.77},
    {"name":"Name","description":"Why.","duration":"3-4 hrs","cost":25,"category":"Museum","lat":35.69,"lng":139.75},
    {"name":"Name","description":"Why.","duration":"Half day","cost":40,"category":"Nature","lat":35.66,"lng":139.70},
    {"name":"Name","description":"Why.","duration":"2 hrs","cost":0,"category":"Landmark","lat":35.66,"lng":139.75},
    {"name":"Name","description":"Why.","duration":"Evening","cost":30,"category":"Food","lat":35.69,"lng":139.70},
    {"name":"Name","description":"Why.","duration":"2 hrs","cost":10,"category":"Park","lat":35.68,"lng":139.76},
    {"name":"Name","description":"Why.","duration":"3 hrs","cost":20,"category":"District","lat":35.73,"lng":139.71}
  ],
  "transportation":[
    {"type":"Metro/Subway","description":"Usage.","estimated_cost":30},
    {"type":"Train Pass","description":"Usage.","estimated_cost":80},
    {"type":"Taxi/Rideshare","description":"Usage.","estimated_cost":60},
    {"type":"Walking","description":"Usage.","estimated_cost":0}
  ],
  "cost_breakdown":{"flights":1600,"hotels":720,"attractions":110,"transportation":170,"food":400,"total":3000},
  "tips":["Tip 1","Tip 2","Tip 3","Tip 4","Tip 5"]
}

Rules: real GPS coords for all hotels/attractions, 10 hotels from budget to ultra-luxury, 8 attractions, all costs numeric. Return ONLY the JSON.`;

function buildAgencySystem(cp) {
  return `You are VoyAI, an expert luxury travel planner creating a PERSONALIZED trip proposal for a travel agency's client.

CLIENT PROFILE:
- Name: ${cp.name}
- Group: ${cp.group} (${cp.pax} travellers, ages: ${cp.ages || 'not specified'})
- Special occasion: ${cp.occasion}
- Travel style preferences: ${(cp.styles || []).join(', ') || 'general'}
- Dietary requirements: ${(cp.diet || []).join(', ') || 'none'}
- Accessibility needs: ${(cp.access || []).join(', ') || 'none'}
- Must-have experiences: ${cp.musthave || 'not specified'}
- Things to avoid: ${cp.avoid || 'none'}
- Experience level: ${cp.experience || 'not specified'}
- Special notes: ${cp.notes || 'none'}

TRIP DETAILS:
- Destination: ${cp.destination}
- Departure city: ${cp.from || 'not specified'}
- Dates: ${cp.dates || 'flexible'}
- Duration: ${cp.duration || 'not specified'}
- Total budget: ${cp.budget || 'not specified'}
- Accommodation style: ${cp.accom}

INSTRUCTIONS:
- Tailor ALL recommendations to this specific client profile
- If honeymoon/anniversary: emphasize romantic experiences, private dining, couples spa
- If family with kids: include kid-friendly activities, avoid adult-only venues
- Respect dietary/accessibility requirements in every recommendation
- Must-have experiences should be included in the itinerary
- The overview should reference their occasion and style personally
- Generate a detailed day-by-day itinerary for the FULL trip duration

Return ONLY a valid JSON object with this exact structure (no markdown, no prose):

{
  "destination":"City, Country","country":"Country","duration":"X days / Y nights","travelers":${cp.pax || 2},"nights":6,"best_time":"Season","currency":"USD",
  "center_lat":0.0,"center_lng":0.0,
  "overview":"Personal, evocative 3-sentence description addressing this specific client trip and occasion.",
  "itinerary":[
    {
      "day":1,
      "title":"Arrival & First Impressions",
      "theme":"Settling in and unwinding",
      "activities":[
        {"time":"14:00","name":"Hotel Check-In","description":"Settle into your room with a welcome amenity.","duration":"1 hour","cost":0,"category":"Accommodation","tip":"Request a high-floor room for the best views."},
        {"time":"19:00","name":"Welcome Dinner","description":"Romantic rooftop dinner to begin the trip.","duration":"2 hours","cost":120,"category":"Dining","tip":"Book in advance — this venue fills up fast."}
      ],
      "meals":{"breakfast":"At the hotel","lunch":"Light cafe stop on arrival","dinner":"Rooftop Restaurant Name"},
      "estimated_daily_cost":250,
      "notes":"Keep day 1 relaxed — long-haul travel is tiring."
    }
  ],
  "flights":[
    {"from":"City","from_code":"XXX","from_city":"City","to":"City","to_code":"YYY","to_city":"City","airline":"Name","departure":"09:00","arrival":"14:30","duration":"14h","price_per_person":800,"class":"Economy"},
    {"from":"City","from_code":"YYY","from_city":"City","to":"City","to_code":"XXX","to_city":"City","airline":"Name","departure":"11:00","arrival":"16:00","duration":"14h","price_per_person":820,"class":"Economy"}
  ],
  "hotels":[
    {"name":"Budget option","stars":3,"location":"Area","price_per_night":80,"total_cost":480,"highlights":"Tailored desc.","lat":0.0,"lng":0.0},
    {"name":"Mid-range option","stars":4,"location":"Area","price_per_night":180,"total_cost":1080,"highlights":"Tailored desc.","lat":0.0,"lng":0.0},
    {"name":"Luxury option","stars":5,"location":"Area","price_per_night":350,"total_cost":2100,"highlights":"Tailored desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 4","stars":3,"location":"Area","price_per_night":95,"total_cost":570,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 5","stars":4,"location":"Area","price_per_night":160,"total_cost":960,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 6","stars":4,"location":"Area","price_per_night":220,"total_cost":1320,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 7","stars":5,"location":"Area","price_per_night":420,"total_cost":2520,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 8","stars":5,"location":"Area","price_per_night":500,"total_cost":3000,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Hotel 9","stars":4,"location":"Area","price_per_night":140,"total_cost":840,"highlights":"Desc.","lat":0.0,"lng":0.0},
    {"name":"Ultra-Luxury","stars":5,"location":"Area","price_per_night":700,"total_cost":4200,"highlights":"Tailored to client.","lat":0.0,"lng":0.0}
  ],
  "attractions":[
    {"name":"Name","description":"Why this client specifically will love it.","duration":"2-3 hrs","cost":15,"category":"Temple","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"1-2 hrs","cost":0,"category":"Market","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"3-4 hrs","cost":25,"category":"Museum","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"Half day","cost":40,"category":"Nature","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"2 hrs","cost":0,"category":"Landmark","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"Evening","cost":60,"category":"Dining Experience","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"2 hrs","cost":50,"category":"Experience","lat":0.0,"lng":0.0},
    {"name":"Name","description":"Tailored reason.","duration":"3 hrs","cost":30,"category":"Activity","lat":0.0,"lng":0.0}
  ],
  "transportation":[
    {"type":"Type 1","description":"Usage info.","estimated_cost":50},
    {"type":"Type 2","description":"Usage info.","estimated_cost":30},
    {"type":"Type 3","description":"Usage info.","estimated_cost":80},
    {"type":"Walking","description":"Usage info.","estimated_cost":0}
  ],
  "cost_breakdown":{"flights":1640,"hotels":2100,"attractions":220,"transportation":160,"food":600,"total":4720},
  "tips":["Personalised tip 1","Personalised tip 2","Personalised tip 3","Personalised tip 4","Personalised tip 5"]
}

CRITICAL: itinerary must have one entry per day for the FULL trip. All lat/lng must be real accurate coordinates. All costs numeric. Return ONLY the JSON.`;
}

export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable not set on the server.' });

  const { mode, query, clientProfile } = req.body || {};
  if (!mode) return res.status(400).json({ error: 'Missing "mode" field (quick or agency).' });

  let systemPrompt, userMessage;

  if (mode === 'quick') {
    if (!query) return res.status(400).json({ error: 'Missing "query" for quick mode.' });
    systemPrompt = QUICK_SYSTEM;
    userMessage = query;
  } else if (mode === 'agency') {
    if (!clientProfile) return res.status(400).json({ error: 'Missing "clientProfile" for agency mode.' });
    systemPrompt = buildAgencySystem(clientProfile);
    userMessage = `Create a personalised trip to ${clientProfile.destination} for ${clientProfile.name}. Duration: ${clientProfile.duration || 'as appropriate'}. Budget: ${clientProfile.budget || 'mid-range'}. Special occasion: ${clientProfile.occasion || 'none'}.`;
  } else {
    return res.status(400).json({ error: 'Invalid mode. Use "quick" or "agency".' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: mode === 'agency' ? 6000 : 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return res.status(response.status).json({ error: `Anthropic API error ${response.status}: ${errText.slice(0, 300)}` });
    }

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });

    const rawText = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .trim();

    if (!rawText) return res.status(500).json({ error: 'Empty response from Anthropic API.' });

    let plan;
    try {
      plan = JSON.parse(rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim());
    } catch {
      return res.status(500).json({ error: 'Failed to parse AI response as JSON.', preview: rawText.slice(0, 400) });
    }

    return res.status(200).json(plan);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
