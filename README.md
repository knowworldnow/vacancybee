1. First, create a new directory and initialize the Next.js project:

```bash
mkdir vacancybee-blog
cd vacancybee-blog
npx create-next-app@latest . --typescript --tailwind --eslint
```

2. When prompted, choose:
- Would you like to use TypeScript? Yes
- Would you like to use ESLint? Yes
- Would you like to use Tailwind CSS? Yes
- Would you like to use `src/` directory? Yes
- Would you like to use App Router? Yes
- Would you like to customize the default import alias (@/*)? Yes

3. Install additional required dependencies:

```bash
npm install @sanity/client @sanity/image-url @portabletext/react date-fns
```

4. Create a `.env` file with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-21
```

5. Start the development server:

```bash
npm run dev
```