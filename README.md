![pnpm=>18](https://img.shields.io/badge/pnpm-black?style=flat&logo=pnpm)
![Astro=>4.0](https://img.shields.io/badge/Astro-black?style=flat&logo=astro)
![Tailwind=>3](https://img.shields.io/badge/Tailwind-black?style=flat&logo=tailwindcss)
![Svelte=>4](https://img.shields.io/badge/Svelte-black?style=flat&logo=svelte)
![SST=>2](https://img.shields.io/badge/SST-black?style=flat&logo=sst)
![Vitest=>2](https://img.shields.io/badge/vitest-black?style=flat&logo=vitest)

# README

### Running Locally

+ [install pnpm](https://pnpm.io/installation) if you don't have already 
+ Run `pnpm install` to install dependencies.
+ start the development server by running:

   ```sh
   pnpm dev
   ````

### Testing

This project uses the vitest test runner that comes with Astro. In order to run both Astro and Svelte component tests, two separate config files are maintained and therefore two separate commands are needed to run both suites:

+ Astro component tests 
    - to run astro tests in watch mode:

    ```sh
    pnpm test:astro:watch
    ```
+ Svelte component tests 
    - to run svelte tests in watch mode:

    ```sh
    pnpm test:astro:watch
    ```

### Deploying

This project uses [sst](https://sst.dev/) for running deployments. It can be ran from your local machine ( and for the current scope of the project, this is the recommended solution ). This will spin up multiple resources on the AWS account you have linked to your AWS cli.

run the deployment by running*:

```sh
pnpm sst:deploy
```

this will:
+ run both test suites 
+ build the website
+ launch the deployment on your AWS account

*make sure you have logged into your aws cli

## General

This website is built following the standard [astro SSG](https://docs.astro.build/en/guides/markdown-content/) flow, with a collection of .mdx files to populate the content, and standard [astro i18n](https://docs.astro.build/en/recipes/i18n/) to handle internationalization.
It also features two [astro endpoints](https://docs.astro.build/en/guides/endpoints/) to forward the API calls to their third-party endpoints to avoid CORS blocking.
This means that all the pages are statically generated and distributed.

## (Relevant) Types

### ClassList

The (copied) argument type of the [astro class:list](https://docs.astro.build/en/reference/directives-reference/#classlist), which is used to replicate the feature on svelte components via the `use:classList` directive, to enable array of classes to be set on elements within svelte components


### MenuList

Defines the list of menu items for navigation

| Property     | Type                           | Description                                |
|--------------|--------------------------------|--------------------------------------------|
| displayText  | `string`                       | The link's display text (innerHTML).  |
| title        | `string`                       | The link's `title` attribute.   |
| href        | `string`                        | The link's `href` attribute |
| target        | `string \| undefined`         | The link's `target` attribute |

### CarbonObject

This is the type of the objects that are used in rendered components as stored into session instead of the full API response.

| Property     | Type                           | Description                                |
|--------------|--------------------------------|--------------------------------------------|
| cleanerThan  | `number \| undefined`          | Copied from the original API response.   |
| green        | `boolean \| undefined`          | Cast to boolean from the original API response. |
| bytes        | `number \| undefined`          | Copied from the original API response. |
| grams        | `number \| undefined`          | Grams from the original response, rounded to the second decimal. |
| energy       | `number \| undefined`          | Energy from the original response, rounded to first meaningful decimal. |
| timestamp  | `number \| undefined`          | Timestamp of when the result was received.   |

## Components

### CarbonResult ( svelte )

This component displays the result of an API calculation. It shows the relevant data specified in the design in the form of a circle progress indicating the percentage of websites that got worse results and four sub-cards that display detailed data, in a "success" or "warning" theme depending on whether the result is below a threshold specified in the [.env](#env-variables)

props:
+ `locale` (string) - the language key for localization of ui strings
+ `animated` (boolean) - whether or not to animate the result card components ( circle, secondary cards... )
+ `website` (string) - the website that is being tested 
+ `state` ('loading' | 'success') - the state in which the component will render ('loading' will prompt the component to show a pulsating skeleton for each of its sub-components) 
+ `carbonResult` ( [CarbonObject](#carbonobject) )

### Calculator ( svelte )

The calculator component performs the API call that returns the result. If it detects a `site` query parameter in the url, calls the API defined in the [.env](#env-variables) and displays a [CarbonResult](#carbonresult--svelte) with the processed data.
If no `site` parameter is provided or if the API returns an error, displays an [ErrorPage]().
The request is sent to an [astro endpoint](https://docs.astro.build/en/guides/endpoints/) that sends the data tot the final endpoint.

props:
+ `locale` (string) - the language key for localization of ui strings
+ `newTestUrl` (string) - the url to link to to run a new test
+ `resultUrl` (string) - the url the form on the error page should have as its `action` to run a new test

### ContactForm ( svelte )

A form to send messages to the contact endpoint defined in the [.env](#env-variables). It features basic validation for the presence of name, email and the message, and the email to be valid. The request is sent to an [astro endpoint](https://docs.astro.build/en/guides/endpoints/) that sends the data tot the final endpoint.

props:
+ `locale` (string) - the language key for localization of ui strings

### Menu ( astro )

prints out a menu in the form of a `nav > ul > li > a` structure which is used both in the header and footer of the website

props:
+ `class` ([ClassList](#classlist)) - the class of the top-level `ul` list
+ `itemClass` ([ClassList](#classlist)) - the class of the `li` elements
+ `menuItems` ([MenuList](#menulist)) - the list of menu items to display

## SEO

This site features meta tags implemented with [Astro SEO](https://github.com/jonasmerlin/astro-seo)


## .ENV variables

+ GTAG_ID - the Google tag (gtag.js) id . Populate to activate the script
+ TAG_MANAGER_ID - the Google Tag Manager id . Populate to activate the script
+ CONTACT_FORM_ENDPOINT - the endpoint to which the data from the contact form will be sent
+ CARBON_API_ENDPOINT - the endpoint of the carbon API
+ PUBLIC_BYTES_THRESHOLD - the threshold above which the "bytes" result card will be shown in red for carbon results
+ PUBLIC_GRAMS_THRESHOLD - the threshold above which the "grams" result card will be shown in red for carbon results
+ PUBLIC_ENERGY_THRESHOLD - the threshold above which the "energy" result card will be shown in red for carbon results