<script>
const OVOT_ENABLED = true;

// Utility: Get Cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Utility: Set Cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Campaign Execution Logic
function runCampaign(campaignId, variationText) {
  const existingCampaign = getCookie("ovot_combi");

  if (OVOT_ENABLED) {
    if (!existingCampaign) {
      // First eligible campaign
      setCookie("ovot_combi", campaignId, 100);
      applyVariation(variationText);
      console.log("Campaign locked:", campaignId);
    } else if (existingCampaign === campaignId) {
      applyVariation(variationText);
      console.log("Returning visitor for:", campaignId);
    } else {
      console.log("Blocked by OVOT. Active campaign:", existingCampaign);
    }
  } else {
    applyVariation(variationText);
  }
}

function applyVariation(text) {
  const banner = document.createElement("div");
  banner.style.background = "#4CAF50";
  banner.style.color = "white";
  banner.style.padding = "15px";
  banner.style.margin = "10px 0";
  banner.innerText = text;
  document.body.prepend(banner);
}
</script>
