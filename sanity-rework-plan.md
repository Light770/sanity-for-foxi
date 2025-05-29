# Sanity Configuration Rework Plan

This plan outlines the steps to reorganize the Sanity Studio content types into logical groups for improved usability.

**Objective:** Rework the Sanity configuration through grouping for better usability for the end user, based on the following structure:

*   **Home** (Top Level)
*   **Pages**
    *   Changelog
    *   FAQ
    *   Pricing
    *   Terms (New Schema)
    *   Contact (New Schema)
*   **Content Creation**
    *   Blog Post
*   **Composants**
    *   Hero
    *   Features
    *   Testimonial
    *   HighlightBlocks (New Schema)
    *   CTA
    *   Social Proof
*   **Configuration**
    *   Site Configuration

**Plan Steps:**

1.  **Create New Schema Files:** Create new schema definition files for the content types that are not currently in your `schemaTypes` directory but are required for the new structure:
    *   `studio-foxi-sanity/schemaTypes/home.ts`
    *   `studio-foxi-sanity/schemaTypes/terms.ts`
    *   `studio-foxi-sanity/schemaTypes/contact.ts`
    *   `studio-foxi-sanity/schemaTypes/highlightBlock.ts`
    *(Note: The content of these schema files will need to be defined based on the specific fields required for each content type. This will be part of the implementation phase.)*

2.  **Update Schema Index:** Modify `studio-foxi-sanity/schemaTypes/index.ts` to import and include the newly created schema types (`home`, `terms`, `contact`, `highlightBlock`) in the `schemaTypes` array.

3.  **Implement Structure Builder:** Modify the `structureTool` configuration within `studio-foxi-sanity/sanity.config.ts` to define the custom navigation structure. This will involve using Sanity's Structure Builder API to create the desired groups and list the relevant document types under each group.

**Planned Sanity Studio Navigation Structure:**

```mermaid
graph TD
    A[Sanity Studio] --> B(Home)
    A --> C(Pages)
    A --> D(Content Creation)
    A --> E(Composants)
    A --> F(Configuration)

    C --> C1(Changelog)
    C --> C2(FAQ)
    C --> C3(Pricing)
    C --> C4(Terms)
    C --> C5(Contact)

    D --> D1(Blog Post)

    E --> E1(Hero)
    E --> E2(Features)
    E --> E3(Testimonial)
    E --> E4(HighlightBlocks)
    E --> E5(CTA)
    E --> E6(Social Proof)

    F --> F1(Site Configuration)