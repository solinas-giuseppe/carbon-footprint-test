![pnpm=>8](https://img.shields.io/badge/pnpm-black?style=flat&logo=pnpm)
![Astro=>4.9](https://img.shields.io/badge/Astro-black?style=flat&logo=astro)
![Tailwind=>3](https://img.shields.io/badge/Tailwind-black?style=flat&logo=tailwindcss)
![Svelte=>4](https://img.shields.io/badge/Svelte-black?style=flat&logo=svelte)
![SST=>2.4](https://img.shields.io/badge/SST-black?style=flat&logo=sst)
![Vitest=>1.6](https://img.shields.io/badge/vitest-black?style=flat&logo=vitest)

# README

### Running Locally

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
+ E2E tests
    - to run svelte tests in watch mode:

    ```sh
    pnpm test:e2e
    ```

To run the entire suite run
```sh
pnpm test:all
```

### Deploying

This project uses [sst](https://sst.dev/) for running deployments. It can be ran from your local machine ( and for the current scope of the project, this is the recommended solution ). This will spin up multiple resources on the AWS account you have linked to your AWS cli.

run the deployment by running*:

```sh
pnpm sst:deploy
```

this will:
+ run the test suite 
+ build the website
+ launch the deployment on your AWS account

*make sure you have logged into your aws cli


## General

This website is built following the standard [astro SSG](https://docs.astro.build/en/guides/markdown-content/) flow, with a collection of .mdx files to populate the content, and standard [astro i18n](https://docs.astro.build/en/recipes/i18n/) to handle internationalization.
It also features two [astro endpoints](https://docs.astro.build/en/guides/endpoints/) to forward the API calls to their third-party endpoints to avoid CORS blocking.
This means that all the pages are statically generated and distributed.

## Styles

This project doesn't have a meaningful css codebase, instead, all the styles are defined using [Tailwind](https://tailwindcss.com/)

### Typography

The styles for typography are defined as collections of utility classes in `src/utils/typo.ts`. To implement the typography styles from the design, use such collections accompanied by a class that applies a `font-weight` ( values are defined in the `tailwind.config` ).

ex:

```astro
---
import { displayLg } from '@/utils/typo.js'

---
<span class:list={[displayLg, 'font-bolder']}>
    Display lg<br />
    Bold
</span>
```

the collection of classes for each typography definition also includes a named class to identify the typo element ( i.e. `"displayLg"` or `"textXl"`)

### Colors

All the colors are defined in `src/styles/colors.css` via css variables and configured in `tailwind.config.css`

## Icons

Icons are downloaded as a single `svg` sprite and referenced by ID, to allow both for a reduced requests count as well as being able to style them with theme colors. 
Both an astro version and a svelte version of the [Icon](#icon) component are maintained.

## View transitions

this site implements astro [view transitions](https://docs.astro.build/en/guides/view-transitions/)

## Multilingual

To achieve multilingual capabilities, this project uses [astro built-in i18n module](https://docs.astro.build/en/recipes/i18n/).

Only `en` locale is supported at the moment, although `it` is also defined in the config to ensure functionality in tests. TODO: make env dependent.

Pages are defined as static content under `src/content/locale`. For example `src/content/en/about.mdx` is loaded in the `src/pages/[locale]/about.astro` based on the `[locale]` parameter in the url.

UI strings are translated using the `useTranslations` function and are defined in `src/18n/ui.ts`. They support replacements to accommodate different sentence structures.

for example:

```typescript
import { useTranslations } from '@/i18n/utils.js'

const t = useTranslations(locale)

const website = 'www.google.com'
const localizedString = t('calculator.title', { website }) // Your website footprint <span class="text-dsm text-primary-600">:website:</span>
// => Your website footprint <span class="text-dsm text-primary-600">www.google.com</span>

```


## Components

### Accordion & AccordionItem ( svelte )

the accordion component in this project is an extension of [svelte-collapsible](https://github.com/rsdavis/svelte-collapsible/tree/main)'s accordion component and leverages the `svelte-collapsible` library to function.

All `AccordionItem` instances are linked to the parent `Accordion` and collapse whenever another item is opened.

```html
<script>
    import Accordion from '@/client/components/smaller/Accordion.svelte'
	import AccordionItem from '@/client/components/smaller/AccordionItem.svelte'
</script>

<Accordion>
    <AccordionItem key='a'>
        <h2 slot='header'>Header</h2>
        <p slot='body'>Body</p> 
    </AccordionItem>
    <AccordionItem key='b'>
        <h2 slot='header'>Header</h2>
        <p slot='body'>Body</p> 
    </AccordionItem>
</Accordion>
```

The original components have been extended to accept additional props:

- `Accordion`
  - `initialKey` (string) - the `key` of the `AccordionItem` that will be open at the start
- `AccordionItem`
  - `class` ([ClassList](#classlist)) - the class of the top-level `li` element of the item

### Icon

+ `name` (string, defined as a list of string literals) - the name of the icon, used to target a specific svg in the sprite
+ `size` ([Size](#size)) - the name of the icon, used to target a specific svg in the sprite
+ `fillColor` ([Size](#size)) - the `fill` color of the shapes of each icon.
+ `strokeColor` ([Size](#size)) - the `stroke` color of the shapes of each icon.
+ `class` ([ClassList](#classlist)) - the class of the top-level `ul` list


### CarbonResult ( svelte )

This component displays the result of an API calculation. It shows the relevant data specified in the design in the form of a circle progress indicating the percentage of websites that got worse results and four sub-cards that display detailed data, in a "success" or "warning" theme depending on whether the result is below a threshold specified in the [.env](#env-variables)

props:
+ `locale` (string) - the language key for localization of ui strings
+ `animated` (boolean) - whether or not to animate the result card components ( circle, secondary cards... )
+ `website` (string) - the website that is being tested 
+ `state` ('loading' | 'success') - the state in which the component will render ('loading' will prompt the component to show a pulsating skeleton for each of its sub-components) 
+ `carbonResult` ( [CarbonObject](#carbonobject) )

### CircleProgress

the circle progress component is included in the CarbonResult component and displays the current website's efficiency rating. The core markup consists of an `svg` containing two overlapped `circle` shapes of equal diameter with a transparent center. The bottom one serves as a background for the top one which has its stroke as long, relative to the full circumference, as the given `percentage`. The stroke of the top circle can also be `animated`.
This effect is achieved by leveraging the circle's `dash-offset` property which, in case of an animated instance, is applied a transition.

+ `locale` (string) - the language key for localization of ui strings
+ `percentage` (number) - the percentage shown in the center of the circle which also determines the length of the stroke.
+ `animated` (boolean) - whether or not to animate the circle's stroke.

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

## (Relevant) Types

### ClassList

A string, or a recursive list of strings in order to partially replicate the feature of the [astro class:list](https://docs.astro.build/en/reference/directives-reference/#classlist) in svelte components via the custom `use:classList` directive. Also used in astro components where it fits the scope of the component's features.

### Size

The supported sizes, which match the `spacing` entries in `tailwind.config`, which generate corresponding classes for sizing and spacing


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
+ PUBLIC_ANIMATION_SPEED - in milliseconds (default is 500). The constant on which the duration of each animation is calculated.