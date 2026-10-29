# How to add a News & Events post (for staff)

No coding needed. Each news post is one simple text file.

## Add a post

1. Go to the `content/news` folder.
2. Create a new file ending in `.md`, e.g. `sports-day-2025.md`.
   The part before `.md` becomes the web address:
   `/news/sports-day-2025`.
3. Paste this template and fill it in:

   ```
   ---
   title: "Sports Day 2025"
   date: "2025-03-14"
   description: "One short sentence shown on the news card."
   image: "/images/news/sports-day.png"
   ---

   Write the full story here. You can use normal paragraphs.

   **Bold text** with two stars. A list:

   - First point
   - Second point
   ```

4. `image` is optional. To use one, drop the picture into
   `public/images/news/` and reference it as shown above. Leave the
   `image` line out entirely if there is no photo — the card will show
   a friendly "Photo Coming Soon" panel.
5. Save the file and publish. The post appears automatically, newest first,
   on the Home page and the News page.

## Edit or remove a post

- Edit: open the `.md` file, change the text, save.
- Remove: delete the `.md` file.

## Update contact details, phone numbers, or the tagline

Open `lib/site.ts` and edit the values at the top. They update everywhere
across the site.

## Update staff

Open `lib/staff.ts` and edit the names and roles.
