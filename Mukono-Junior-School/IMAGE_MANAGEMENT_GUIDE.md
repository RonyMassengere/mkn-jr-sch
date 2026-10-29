# How to Change Images by Page

This is the direct guide for changing images without searching through the whole project.

## 1) Staff page
Open:
- `lib/staff.ts`

What to edit:
- `leadership` -> head teacher, director, deputy head teacher
- `prefectorialBody` -> prefect group image
- `maleTeachers` -> male teacher group image
- `femaleTeachers` -> female teacher group image

Example:
```ts
{
  name: 'Head Teacher',
  role: 'Head Teacher',
  image: 'https://example.com/head-teacher.jpg'
}
```

To use a local school photo instead:
```ts
image: '/images/staff/head-teacher.jpg'
```

Important:
- keep the image path starting with `/images/...`
- add the file to `public/images/staff/`

---

## 2) Gallery page
Open:
- `lib/gallery.ts`

What to edit:
- every `src` value in each gallery item
- each item has a title and alt text that can also be updated

Example:
```ts
{ src: 'https://example.com/gallery1.jpg', title: 'School Event', alt: 'Pupils at school event' }
```

Local version:
```ts
{ src: '/images/gallery/gallery1.jpg', title: 'School Event', alt: 'Pupils at school event' }
```

Add real gallery files here:
- `public/images/gallery/`

---

## 3) Home page
Open:
- `components/home/news-snippet.tsx`

What to edit:
- each featured card image in the homepage data array

Example:
```ts
image: 'https://example.com/home-card.jpg'
```

Local version:
```ts
image: '/images/news/home-card.jpg'
```

Store the file in:
- `public/images/news/`

---

## 4) News landing page
Open:
- `app/news/page.tsx`

What to edit:
- hero image backgrounds or cards in the update section

These are usually written as inline CSS URLs:
```ts
backgroundImage: "url('https://example.com/news-banner.jpg')"
```

Use local image:
```ts
backgroundImage: "url('/images/news/news-banner.jpg')"
```

---

## 5) Events page
Open:
- `app/news/events/page.tsx`

What to edit:
- background images for event cards
- featured event images in the event list

Example:
```ts
"url('https://example.com/event-photo.jpg')"
```

Local version:
```ts
"url('/images/news/event-photo.jpg')"
```

---

## 6) Facilities page
Open:
- `app/news/facilities/page.tsx`

What to edit:
- facility hero background image
- each card image used to represent the facilities

Example:
```ts
backgroundImage: "url('https://example.com/facility.jpg')"
```

Local version:
```ts
backgroundImage: "url('/images/news/facility.jpg')"
```

---

## 7) About page
Open:
- `app/about/page.tsx`

What to edit:
- image blocks or banner images used on the About page

Example:
```tsx
<Image src="/images/about/school-building.jpg" ... />
```

Store files in:
- `public/images/about/`

---

## 8) Recommended way to add school photos
Use this structure:

```bash
public/images/
public/images/staff/
public/images/gallery/
public/images/news/
public/images/about/
```

Then reference them like:
```ts
'/images/staff/head-teacher.jpg'
```

This is the cleanest and most reliable method for the live website.

---

## 9) Quick example of a correct local image
Correct:
```ts
image: '/images/staff/head-teacher.jpg'
```

Wrong:
```ts
image: 'images/staff/head-teacher.jpg'
```

The leading `/` is important.

---

## 10) Simple rule to remember
If you want to change an image, ask:
- What page is this image on?
- Which file controls that page?
- Do I replace the URL or swap to a file in `public/images`?

Then edit directly in that file.

### Short list of page-to-file mapping
- Staff page -> `lib/staff.ts`
- Gallery page -> `lib/gallery.ts`
- Home page -> `components/home/news-snippet.tsx`
- News landing -> `app/news/page.tsx`
- Events -> `app/news/events/page.tsx`
- Facilities -> `app/news/facilities/page.tsx`
- About -> `app/about/page.tsx`

This is the fastest way to change images without confusion.
