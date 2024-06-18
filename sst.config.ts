import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "carbon-api",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, "carbon-footprint-test", {
        environment: {
          GTAG_ID: process.env.GTAG_ID,
          TAG_MANAGER_ID: process.env.TAG_MANAGER_ID,
          CONTACT_FORM_ENDPOINT: process.env.CONTACT_FORM_ENDPOINT,
          CARBON_API_ENDPOINT: process.env.CARBON_API_ENDPOINT,
          PUBLIC_BYTES_THRESHOLD: process.env.PUBLIC_BYTES_THRESHOLD,
          PUBLIC_GRAMS_THRESHOLD: process.env.PUBLIC_GRAMS_THRESHOLD,
          PUBLIC_ENERGY_THRESHOLD: process.env.PUBLIC_ENERGY_THRESHOLD,
          PUBLIC_ANIMATION_SPEED: process.env.PUBLIC_ANIMATION_SPEED,
        },
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
